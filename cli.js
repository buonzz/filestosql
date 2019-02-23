#!/usr/bin/env node


'use strict';

const logger = require("./src/logger");
const program = require('commander');
const walk = require("walk");
const ignored_ones = require("./src/ignored_ones");
const analyze_pathinfo = require("./src/analyze_pathinfo");
const path = require('path');
const known_file_types = require('./src/known_file_types');
const generate_sql_string = require('./src/generate_sql_string');
const fs = require('fs');


program
  .version('0.0.1')
  .option('-f, --folder <data>', 'What folder to crawl file contents?')
  .option('-o, --output <data>', 'What file to write the sql statements?')
  .parse(process.argv);


if(program.folder == undefined)
	program.folder = process.cwd();

if(program.output == undefined)
	program.output =  process.cwd() + path.sep + 'filestosql.sql';


logger.log({
  level: 'info',
  message: 'Starting to crawl the folder "' + program.folder + ""
});



const walk_options = {
    followLinks: false, 
    filters: ignored_ones
};


const walker = walk.walk(program.folder, walk_options);

walker.on("file", function (root, fileStats, next) {

    let absPath =  path.join(root, fileStats.name);
    let ext = path.extname(fileStats.name).toLowerCase();

    logger.log({
      level: 'info',
      message: 'Processing ' + absPath
    });

    let pathinfo = analyze_pathinfo(absPath);
    pathinfo.content_size = fileStats.size;

    let sql_string = generate_sql_string(pathinfo);

    fs.appendFile(program.output, sql_string, function (err) {
          if (err) 
           throw err;
            logger.log({
              level: 'info',
              message: 'Processed ' + absPath
            });
        });


      next();
});

walker.on("errors", function (root, nodeStatsArray, next) {
     logger.log({
      level: 'error',
      message: 'Error'
    });
  next();
});

walker.on("end", function () {
    logger.log({
      level: 'info',
      message: 'Done - success!'
    });
});