#!/usr/bin/env node

require('shelljs/global');
const paths = require('path');
const fs = require('fs');
const figlet = require('figlet');
const chalk = require('chalk');
const execSync = require('child_process').execSync;
const spawn = require('cross-spawn');

function shouldUseYarn() {
  try {
    execSync('yarnpkg --version', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

const installPackages = () => {
  console.log(chalk.white.bold('Installing Packages'));
  return new Promise((resolve, reject) => {
    let command;
    let args = ['install'];

    if (shouldUseYarn()) {
      command = 'yarn';
    } else {
      command = 'npm';
    }

    const child = spawn(command, args, { stdio: 'inherit' });
    child.on('close', code => {
      if (code !== 0) {
        reject({
          command: `${command} ${args.join(' ')}`
        });
        return;
      }
      resolve();
    })
  })
}

const build = (appName) => {
  cp('-rp', __dirname + '/../src/', appName);
  console.log('----------------------------------------------------------');
  figlet.text('reason react', function(err, data) {
    if (err) {
      return;
    }
    console.log(data);
    console.log('----------------------------------------------------------');
    console.log(chalk.red.bold('Create Reason React App'));
    console.log('----------------------------------------------------------');
    cd(appName);
    installPackages().then(() => {
      console.log('');
      console.log('Reason React app successfully created!')
      console.log('');
      console.log(chalk.white.bold('Let\'s get started'));
      console.log('');
      ('----------------------------------------------------------');
      console.log(chalk.white('Step 1:'))
      console.log(chalk.red('cd into the newly created ' + appName + ' directory'));
      console.log('----------------------------------------------------------');
      console.log(chalk.white('Step 2'));
      console.log(chalk.red('yarn dev or npm run dev'));
      console.log('----------------------------------------------------------');
      console.log(chalk.white('Step 3'));
      console.log(chalk.red('Open browser and navigate to: http://localhost:8080/'))
    })
    .catch(error => {
      console.log(chalk.red('An unexpected error occurred'))
      console.log(chalk.red(error));
    });
  });
}

module.exports = build;
