'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./image.controller');
var multer = require('multer');
var uploading = multer({
    dest: './public/img/',
    limits: {
        fieldNameSize: 50,
        files: 1,
        fields: 5,
        fileSize: 1024 * 1024
    },
    rename: function(fieldname, filename) {
        return filename;
    },
    onFileUploadStart: function(file) {
        console.log('Starting file upload process.');
        if(file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
            return false;
        }
    },
    inMemory: true //This is important. It's what populates the buffer.
});

router.get('/', controller.index);
router.get('/:id', controller.show);

router.post('/' , uploading.single('file'), function (req, res, next) {
	controller.create(req,res);
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
})

router.put('/:id', controller.update);

router.delete('/:id', controller.destroy);

module.exports = router;
