#!/usr/bin/env node

var path = require('path');

var program = require('commander');
var chalk = require('chalk');

var s3Sync = require('aws-s3-sync');
var ossSync = require('oss-sync');

program
  .description('Sync files to cloud storage services')
  .usage('<config file ...>')
  .option('-f, --force-upload', 'force upload all files')
  .option('-i, --incremental-mode', 'only upload new files')
  .version(require('../package.json').version)

program.parse(process.argv);

if (program.args.length > 1) {
  return program.help()
}

var configFile = program.args[0] || '.cloudsync.json';
try {
  var config = require(path.resolve(process.cwd(), configFile));
  if (program.forceUpload) config.forceUpload = program.forceUpload;
  if (program.incrementalMode) config.incrementalMode = program.incrementalMode;
} catch (e) {
  console.log();
  console.log(chalk.red('    Failed to load config file'));
  console.log();
  process.exit();
}

for (var cloud in config) {
  switch (cloud) {
    case 'aws-s3':
      s3Sync(config[cloud]).exec()
        .then(function() {
          console.log();
          console.log('    ' + chalk.cyan('AWS S3 Sync completed'));
          console.log();
        })
        .catch(function(err) {
          console.log();
          console.log('    ' + chalk.bgRed('AWS S3 Sync Error occurred:'));
          console.log();
          console.log('    ' + chalk.red(err));
          console.log();
        })
      break;
    case 'aliyun-oss':
      ossSync(config[cloud]).exec()
        .then(function() {
          console.log();
          console.log('    ' + chalk.cyan('Aliyun OSS Sync completed'));
          console.log();
        })
        .catch(function(err) {
          console.log();
          console.log('    ' + chalk.bgRed('Aliyun OSS Sync Error occurred:'));
          console.log();
          console.log('    ' + chalk.red(err));
          console.log();
        })
      break;
  }
}
