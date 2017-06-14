#!/usr/bin/env node

const program = require('commander');

const build = require('./build');
const help = require('./help');
const pkg = require('../package.json');
const chalk = require('chalk');

let projectName;

program
  .version(pkg.version)
  .arguments('<project-directory>')
  // usage is used for the --help command
  .usage(`${chalk.red('<project-directory>')} [options]`)
  .option('-b, --basic', 'Create a basic template')
  .option('-i, --interop', 'Create an interop template')
  .action(name => {
    projectName = name;
  })

program.on('--help', function() {
  help();
});

program.parse(process.argv);

if (program.basic) {
  build(projectName);
} else if (program.interop) {
  build(projectName, 'interop')
} else if (projectName) {
  build(projectName);
}

if (typeof projectName === 'undefined') {
  console.error('Please specify the project directory:');
  console.log(
    `  ${chalk.green(program.name())} ${chalk.red('<project-directory>')}`
  );
  console.log();
  console.log('For example:');
  console.log(`  ${chalk.green(program.name())} ${chalk.red('my-reason-app')}`);
  console.log();
  console.log(
    `Run ${chalk.green(`${program.name()} --help`)} to see all options.`
  );
  process.exit(1);
}
