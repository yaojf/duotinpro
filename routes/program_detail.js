var express = require('express');
var router = express.Router();
var ProgramFile = require('../models/ProgramFile');
var StaticFile = require('../models/StaticFile');
var Program = require('../models/Program');


/* GET users listing. */
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    if(id) {
        var program  = new Program();
        program.getById(id, function(err, pgm){
            if(pgm) {
                var programFile = new ProgramFile();
                var staticFile = new StaticFile();
                programFile.getByProgramId(id, function(err, results){
                    if(err) {
                        console.log(err);
                    }
                    if(results && results.length > 0) {
                        var ids;
                        for(var i in results){
                            if(ids) {
                                ids += ',';
                                ids += results[i].file_id;
                            }
                            else {
                                ids = results[i].file_id;
                            }
                        }
                        if(ids) {
                            staticFile.getByIds(ids, function(err, items){
                                if(items) {
                                    staticFile.getWithoutIds(ids, pgm.env, function(err, selectItems){
                                        res.render('program_detail', {
                                            items: items,
                                            selectItems:selectItems,
                                            program:'active',
                                            programId:id
                                        });
                                    });
                                }
                                else {
                                    console.log("get file failure !");
                                }

                            });
                        }
                    }
                    else {
                        staticFile.getByEnv(pgm.env, function(err, selectItems){
                            res.render('program_detail', {
                                selectItems: selectItems,
                                program:'active',
                                programId:id
                            });
                        })
                    }

                });
            }
            else {
                res.send("not found!");
            }
        });
    }
    else {
        res.send("not found!");
    }
});

router.post('/:id/save', function(req, res) {
    var id = req.params.id;
    if(id) {
        var fileId = req.body['fileId'];
        if(fileId) {
            var programFile = new ProgramFile();
            programFile.getByKey(fileId, id, function(err, result){
                if(err) {
                    console.log(err);
                    res.redirect("/static/program/detail/" + id);
                }
                if(result) {
                    res.redirect("/static/program/detail/" + id);
                }
                else {
                    programFile.save(fileId, id, function(err){
                        if(err) {
                            console.log(err);
                        }
                        res.redirect("/static/program/detail/" + id);
                    });

                }
            });
        }
    }
    else {
        res.send("not found!");
    }
});

router.get('/:programId/delete/:id', function(req, res) {
    var id = req.params.id;
    var programId = req.params.programId;
    if(id && programId) {
        var programFile = new ProgramFile();
        programFile.deleteByKey(programId, id, function(err){
            if(err){
                console.log(err);
            }
            res.redirect("/static/program/detail/" + programId);
        });
    }
});

module.exports = router;
