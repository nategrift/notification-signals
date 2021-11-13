const multer = require('multer');

exports.catchErrors = (error, req, res, next) => {
    // if multer error
    if (error instanceof multer.MulterError) {
        res.status(400);
    }

    // if error connecting to database
    if (error.message.includes('ECONNREFUSED')) {
        error = "Error: Unable to connect to Database, Sorry for the inconvenience. Please try again later";
    }

    if (!res.status) {
        res.status(500);
    }

    return res.json({
        ok: false,
        message: error.message,
    });
};

exports.get404 = (req, res, next) => {
    return res.json({
        ok: false,
        message: 'Unable to Find Resource',
    });
};
