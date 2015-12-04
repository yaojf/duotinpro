var express = require('express');
var router = express.Router();
var StaticPro = require('../models/StaticPro');


/* GET users listing. */
router.get('/:id', function (req, res, next) {
    var id = req.params.id;
    if (id) {
        var staticPro = new StaticPro();

        staticPro.getByFileId(id, function (err, results) {
            if (err) {
                console.log(err);
            }
            res.render('pro_datil', {
                items: results,
                properties: 'active',
                fileId: id
            });
        });
    }
    else {
        res.send("not found!");
    }
});

router.post('/:id/save', function (req, res) {
    var id = req.params.id;
    if (id) {
        var key = req.body['key'];
        var value = req.body['value'];
        if (key && value) {
            var staticPro = new StaticPro();
            staticPro.getByKey(id, key, function (err, result) {
                if (err) {
                    console.log(err);
                    res.redirect("/static/properties/detail/" + id);
                }
                if (result) {
                    staticPro.updateById(result.id, value, function (err) {
                        if (err) {
                            console.log(err);
                        }
                        res.redirect("/static/properties/detail/" + id);
                    });
                }
                else {
                    staticPro.save(id, key, value, function (err) {
                        if (err) {
                            console.log(err);
                        }
                        res.redirect("/static/properties/detail/" + id);
                    });
                }
            });
        }
    }
});

router.get('/:fileId/delete/:id', function (req, res) {
    var id = req.params.id;
    var fileId = req.params.fileId;
    if (id && fileId) {
        var staticPro = new StaticPro();
        staticPro.deleteById(id, function (err) {
            if (err) {
                console.log(err);
            }
            res.redirect("/static/properties/detail/" + fileId);
        });
    }
});


router.get('/:fileId/update/:id', function (req, res) {
    var id = req.params.id;
    var fileId = req.params.fileId;
    if (id && fileId) {
        var staticPro = new StaticPro();

        staticPro.getById(id, function (err, result) {
            if (err) {
                console.error(err);
            }
            res.render('static_properties_edit', {item: result, properties: 'active', fileId: fileId, id: id});
        })
    }
});

router.post('/:fileId/update/:id', function (req, res) {
    var id = req.params.id;
    var fileId = req.params.fileId;
    if (id) {
        var key = req.body['key'];
        var value = req.body['value'];
        if (key && value) {
            var staticPro = new StaticPro();
            staticPro.updateKeyValueById(id, key, value, function (err) {
                if (err) {
                    console.log(err);
                }
                res.redirect("/static/properties/detail/" + fileId);
            });
        }
    }


});


module.exports = router;
