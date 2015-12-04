var express = require('express');
var router = express.Router();

var Program = require('../models/Program');

router.get('/', function(req, res, next) {
    var program = new Program();
    program.allPage(function(err,result){
        if(err){
            console.error(err);
        }
        res.render('program',{program:"active", items:result});
    });
});

router.post('/create', function(req, res) {
    var title = req.body['title'];
    var env = req.body['env'];
    if(title && env) {
        var program = new Program();

        program.getByName(title, env, function(err, result){
            if(result) {
                console.log("program  name is exist!");
                res.render('program_add', {program: 'active', error: 'program  name is exist!'});
            }
            else {
                program.save(title, env, function(err){
                    if(err){
                        console.error(err);
                    }
                });
                res.redirect("/static/program");
            }
        });
    }
});

router.get('/delete/:id', function(req, res, next) {
    var id = req.params.id;
    if(id){
        var program = new Program();
        program.deleteById(id, function(err){
            if(err) {
                console.error(err);
            }

            res.redirect("/static/program");
        });
    }
});


router.get('/add', function (req, res, next) {
    res.render('program_add', {program: 'active'});
});


router.post('/search', function (req, res, next) {
    var items;
    var program = new Program();

    var title = req.body['title'];
    var env = req.body['env'];

    program.getByFileNameLike(title, env, function (err, result) {
        if (err) {
            console.error(err);
        }
        items = result;
        res.render('program', {items: items, program: 'active', title: title, env: env});
    });

});

module.exports = router;