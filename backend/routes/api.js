const express = require('express');
const router = express.Router();
const { getToonifiedImage, nsfwDetector } = require('../controllers/toonified');

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join('public', 'uploads'));
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post('/toonifyImage', upload.single('image'), getToonifiedImage);
router.post('/nsfwDetector', upload.single('image'), nsfwDetector);

module.exports = router;