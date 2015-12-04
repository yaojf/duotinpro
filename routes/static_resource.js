var express = require('express');
var router = express.Router();
var StaticPro = require('../models/StaticPro');
var StaticFile = require('../models/StaticFile');
var ProgramFile = require('../models/ProgramFile');
var Program = require('../models/Program');

router.get('/:filename', function(req, res, next) {
    var filename = req.params.filename;
    var env = req.query.env;
    if(filename && env) {
        var staticFile = new StaticFile();
        staticFile.getByFileName(filename,env,function(err,result){
            if(result) {
                var staticPro = new StaticPro();
                staticPro.getByFileId(result.id, function(err, results){
                    var text = '';
                    console.log(results);
                    for(var item in results){
                        if(results[item]) {
                            console.log(results[item]);
                            text += results[item].name + "=" + results[item].value + "\n";
                        }
                    }
                    res.send(text);
                });
            }
            else {
                res.send("file not exist!");
            }
        });
    }
});

router.get('/program/:programname', function(req, res, next) {
    var programname = req.params.programname;
    var env = req.query.env;
    if(programname && env) {
        var program = new Program();
        program.getByName(programname, env, function(err, result){
            if(result) {
                var programFile = new ProgramFile();
                programFile.getByProgramId(result.id, function(err, results){
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
                        var staticPro = new StaticPro();
                        staticPro.getByFileIds(ids, function(err, items){
                            if(items) {
                                var text = '';
                                for(var item in items){
                                    if(items[item]) {
                                        console.log(items[item]);
                                        text += items[item].name + "=" + items[item].value + "\n";
                                    }
                                }
                                res.send(text);
                            }
                            else {
                                res.send("program not exist!");
                            }

                        });
                    }
                    else {
                        res.send("program not exist!");
                    }
                });
            }
            else {
                res.send("program not exist!");
            }
        });
    }
});

module.exports = router;
