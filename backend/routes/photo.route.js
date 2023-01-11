const express = require('express');
const multer = require('multer');
const crypto = require('crypto');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + crypto.randomUUID());
  },
});

const upload = multer({ storage: storage });

const controller = require('../controllers/photo.controller');

const router = express.Router();

router.post('/photos', upload.array('files', 12), controller.upload);
router.get('/photos/:id', controller.get);

module.exports = router;
