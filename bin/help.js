const chalk = require('chalk');

const help = () => {
  console.log('');
  console.log(`    only ${chalk.red('<project-directory>')} is required.`);
  console.log('');
  console.log(`    If you have any issues or requests, please file an issue at ${chalk.red('https://github.com/knowbody/crra/issues')}`);
  console.log('');
}

module.exports = help;
