var express = require('express');
var router = express.Router();
var StaticFile = require('../models/StaticFile');
var StaticPro = require('../models/StaticPro');

/* GET users listing. */
router.get('/', function (req, res, next) {
    var items;
    var staticFile = new StaticFile();

    //var page = 1;
    //var size = 20;
    //
    //if(req.query.p) {
    //    page = parseInt(req.query.p);
    //}
    //
    //if(req.query.s) {
    //    size = parseInt(req.query.s)
    //}

    staticFile.allPage(function (err, result) {
        if (err) {
            console.error(err);
        }
        items = result;
        res.render('properties', {items: items, title: '', env: 'nil', properties: 'active'});
    });
});

router.post('/create', function (req, res) {
    var title = req.body['title'];
    var env = req.body['env'];
    if (title && env) {
        var staticFile = new StaticFile();

        staticFile.getByFileName(title, env, function (err, result) {
            if (result) {
                console.log("properties file name is exist!");
                res.render('properties_add', {properties: 'active', error: 'properties file name is exist!'});
            }
            else {
                staticFile.save(title, env, function (err) {
                    if (err) {
                        console.error(err);
                    }
                });
                res.redirect("/static/properties");
            }
        });
    }
});

router.get('/delete/:id', function (req, res, next) {
    var id = req.params.id;
    if (id) {
        var staticFile = new StaticFile();
        staticFile.deleteById(id, function (err) {
            if (err) {
                console.error(err);
                res.redirect("/static/properties");
            }
            else {
                var staticPro = new StaticPro();
                staticPro.deleteByFileId(id, function (err) {
                    if (err) {
                        console.error(err);
                    }
                    res.redirect("/static/properties");
                });
            }
        });
    }
});


router.get('/add', function (req, res, next) {
    res.render('properties_add', {properties: 'active'});
});


router.post('/search', function (req, res, next) {
    var items;
    var staticFile = new StaticFile();

    var title = req.body['title'];
    var env = req.body['env'];


    staticFile.getByFileNameLike(title, env, function (err, result) {
        if (err) {
            console.error(err);
        }
        items = result;
        res.render('properties', {items: items, properties: 'active', title: title, env: env});
    });

});


module.exports = router;
