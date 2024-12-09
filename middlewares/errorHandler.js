function errorHandler(err, req, res, next) {
    console.log(err.stack);
    res.status(500).json({ status: 500, message: "Internal Server Error", content: err.message });
}

module.exports = { errorHandler };