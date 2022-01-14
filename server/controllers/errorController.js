const multer = require('multer');

exports.catchErrors = (error, req, res, next) => {
    // if multer error
    if (error instanceof multer.MulterError) {
        res.status(400);
    }

    // if error connecting to database
    if (error.message.includes('ECONNREFUSED')) {
        res.status(500);
        error.message = "Unable to connect to Database. Please try again later";
    }

    if (!res.status) {
        res.status(500);
    }

    return res.json({
        ok: false,
        error: error.message,
    });
};

exports.get404 = (req, res, next) => {
    return res.status(404).json({
        ok: false,
        error: 'Page Not Found',
    });
};
