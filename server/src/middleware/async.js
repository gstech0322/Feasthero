const wait = fn =>
    async (req, res, next) => {
        return await fn(req, res, next).catch(next);
    };

module.exports = wait;