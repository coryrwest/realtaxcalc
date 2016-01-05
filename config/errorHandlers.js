module.exports = function(app, config) {
	app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(err.status || 500);
    var error = {};
    if (config.isDev) {
        // development error handler
        // will print stacktrace
        error = err;
    } else {
        // production error handler
        // no stacktraces leaked to user
        error = {};
    }

    res.render('error', {
        message: err.message,
        error: err
    });
});
};
