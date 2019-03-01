function errorMiddleware (err, req, res, next) {
    console.log(err);
}

module.exports = errorMiddleware