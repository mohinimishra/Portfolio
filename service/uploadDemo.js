const fs = require('fs');
const multer = require('multer');


function upload(req, res, fn, dN, cb) {
    try {
        fs.mkdirSync(dN)
    } catch (error) {
        console.log(error)
        cb(error, null)
    }



    let storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, dN)
        },
        filename: function (req, file, cb) {
            cb(null, fn)
        }
    });

    let multerUpload = multer({
        storage: storage
    }).single('img')

    multerUpload(req, res, function (err, success) {
        if (err) {
            cb(err, null)
        } else {
            console.log(success)
            cb(null, success)
        }
    })
}


module.exports.upload = upload;