const Class = require("../schema/class");
const moment = require('moment-timezone');
const ObjectId = require('mongoose').Types.ObjectId;

const WEEK_FROM = moment
    .utc(new Date().toISOString())
    .tz('US/Eastern')
    .add(7, 'd')
    .toDate();

const WEEK_TO = moment
    .utc(new Date().toISOString())
    .tz('US/Eastern')
    .add(12, 'w')
    .toDate();


class ClassQueryBuilder {
    onlyIncludeBookableTimeSlots() {
        this.onlyIncludeBookableTimeSlotsVar = true;
        return this;
    }

    includeChef() {
        this.includeChefVar = true;
        return this;
    }

    hideImportantChefDetails() {
        this.hideImportantChefDetailsVar = true;
        return this;
    }

    filterByClassId(classId) {
        this.filterByClassIdVar = classId;
        return this;
    }

    filterByChefId(chefId) {
        this.filterByChefIdVar = chefId;
        return this;
    }

    onlyFirstIndex() {
        this.onlyFirstIndexVar = true;
        return this;
    }

    sortSchedule() {
        this.sortScheduleVar = true;
        return this;
    }

    includeSchedule() {
        this.includeScheduleVar = true;
        return this;
    }

    _emptyStage() {
        return { $match: {} };
    }

    _buildScheduleQuery() {
        if (this.includeScheduleVar && (this.onlyIncludeBookableTimeSlotsVar || this.sortScheduleVar)) {
            return {
                $lookup: {
                    from: 'schedules',
                    as: 'schedule',
                    let: { id: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$classId', '$$id'] }
                                    ]
                                },
                            },
                        },
                        this.onlyIncludeBookableTimeSlotsVar
                            ?
                            {
                                $match: {
                                    "dateTime": { "$gte": WEEK_FROM, "$lte": WEEK_TO },
                                    $expr: {
                                        $and: [
                                            { $eq: ['$available', true] },

                                        ]
                                    },
                                },
                            }
                            :
                            this._emptyStage(),
                        this.sortScheduleVar
                            ?
                            {
                                $sort: {
                                    'dateTime': 1
                                }
                            }
                            :
                            this._emptyStage(),
                    ]
                }
            }

        }

        return this._emptyStage()
    }


    _buildFilterByClassIdQuery() {
        if (this.filterByClassIdVar)
            return {
                $match: {
                    _id: ObjectId(this.filterByClassIdVar),
                }
            }
        return this._emptyStage()
    }

    _buildFilterByChefIdQuery() {
        if (this.filterByChefIdVar)
            return {
                $match: { chefId: ObjectId(this.filterByChefIdVar) },
            }

        return { $match: {} }
    }

    _buildChefQuery() {
        if (this.includeChefVar) {
            if (this.hideImportantChefDetailsVar) {
                return {
                    $lookup: {
                        from: "accounts",
                        as: "chefs",
                        let: { chefId: "$chefId" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ["$_id", "$$chefId"]
                                    }
                                },
                            },
                            {
                                '$project': {
                                    'profile.zoom': 0,
                                    'email': 0,
                                }
                            }
                        ]
                    },
                };
            }
            return {
                $lookup: {
                    from: "accounts",
                    localField: "chefId",
                    foreignField: "_id",
                    as: "chefs",
                },
            }
        }
        return this._emptyStage()
    }

    async run() {
        const result = await Class.aggregate([
            this._buildFilterByClassIdQuery(),
            this._buildFilterByChefIdQuery(),
            this._buildChefQuery(),
            this._buildScheduleQuery(),
        ]);

        return this.onlyFirstIndexVar ? result[0] : result;
    }
}

module.exports = ClassQueryBuilder;