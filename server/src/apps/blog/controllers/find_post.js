const BlogPost = require('../schema/post');
const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");
const Types = mongoose.Types;
let ObjectId = Types.ObjectId;

async function findPost(req, res) {
    const postId = req.params.id;

    return await BlogPost.find({ "_id": ObjectId(postId) }, function (err, result) {
        if (err)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'something went wrong' });
        return res.status(StatusCodes.OK).json(result);
    })
}

module.exports = findPost;