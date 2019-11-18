var express = require('express');
var router = express.Router();
var model = require('../models/index');
var uploader = require('../helper/uploader');
var fs = require('fs');

// get files
router.get('/', async function (req, res, next) {
    try {
        const files = await model.files.findAll();

        res.json({
            error: false,
            data: {
                files: files
            }
        })
    } catch (err) {
        res.json({
            error: true,
            data: {
                message: err.message
            }
        });
    }
});

// upload file
router.post('/', uploader.upload.single('name'), async function (req, res, next) {
    try {
        const body = {
            name: req.file.filename
        };

        const file = await model.files.create(body);

        res.json({
            error: false,
            data: {
                file: file
            }
        })
    } catch (err) {
        res.json({
            error: true,
            data: {
                message: err.message
            }
        });
    }
});

// delete file
router.delete('/:id', async function (req, res, next) {
    try {
        const file = await model.files.findByPk(req.params.id);
        fs.unlink('public/uploads/' + file.name, function (err) { });

        const deleteStatus = await model.files.destroy({
            where: {
                id: req.params.id
            }
        });

        res.json({
            error: false,
            data: {
                status: deleteStatus
            }
        })
    } catch (err) {
        res.json({
            error: true,
            data: {
                message: err.message
            }
        });
    }
});

module.exports = router;