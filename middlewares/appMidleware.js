module.exports.logger = (req, res, next) => {
    console.log(req.url, req.method);
    next();
}

module.exports.notFound = (req, res, next) => {
    res.status(404).send('Page Not Found!')
}

module.exports.errorHandler = (err, req, res, next) => {
    res.status(500).send('Something Went Wrong')
}