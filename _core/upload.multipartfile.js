module.exports = function (app) {
    const multer = require('multer');

    var storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __basedir + '/images/')
        },
        filename: (req, file, cb) => {
            cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
        }
    });

    var upload = multer({ storage: storage });

    app.post('/images', upload.single("uploadfile"), (req, res) => {
        console.log(req.file);
        res.json({ 'msg': 'File uploaded successfully!', 'file': req.file });
    });
}