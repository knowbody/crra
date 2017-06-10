#!/usr/bin/env node

const program = require('commander');

const build = require('./build');
const pkg = require('../package.json');

program
  .version(pkg.version);

program
  .command('new [name]', { isDefault: true })
  .action(name => build(name));

program.parse(process.argv);
