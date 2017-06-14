const path = require('path');
const chalk = require('chalk');
const spawn = require('child_process').spawn;
const EventEmitter = require('events');

const PORT = require('./env.js').PORT;

class CompileEmitter extends EventEmitter {}

const compileEmitter = new CompileEmitter();

const bsb = spawn('npm', ['run', 'dev:bsb']);

const webpack = spawn('npm', ['run', 'dev:webpack']);

const berror = spawn('berror', ['--path-to-refmttype', 'refmttype']);

const compileStatus = {
  bsb: {
    status: 'success',
    msg: 'OK',
  },
  webpack: {
    status: 'success',
    msg: 'OK',
  },
}

function clearConsole() {
  process.stdout.write(
    process.platform === 'win32' ? '\x1Bc' : '\x1B[2J\x1B[3J\x1B[H'
  );
}

clearConsole();

process.stdout.write(chalk.cyan('Hang tight! Code is compiling...'))

bsb.stdout.on('data', (data) => {
  berror.stdin.write(data);
});

bsb.stderr.on('data', (data) => {
  berror.stdin.write(data);
});

webpack.stdout.on('data', (data) => {
  const str = data.toString();
  console.log(str);
  if (str.includes('ERROR')) {
    compileStatus.webpack = {
      status: 'error',
      msg: str,
    };
  } else if (str.includes('webpack: Compiled successfully')) {
    compileStatus.webpack = {
      status: 'success',
      msg: 'OK',
    };
  } else {
    compileStatus.webpack = {
      status: 'compiling',
      msg: 'OK',
    }
  }
  compileEmitter.emit('log');
});

webpack.stderr.on('data', (data) => {
  console.log(data.toString());
  compileStatus.webpack = {
    status: 'error',
    msg: data.toString(),
  };
  compileEmitter.emit('log');
});

berror.stdout.on('data', (data) => {
  const str = data.toString();
  if (str.includes('.re:')) {
    compileStatus.bsb = {
      status: 'error',
      msg: str,
    };
  } else if (
    (str.includes('>>>> Finish compiling') && !str.includes('ninja: build stopped: subcommand failed.'))
    || str.includes('no work to do')
  ) {
    compileStatus.bsb = {
      status: 'success',
      msg: 'OK',
    };
  } else {
    if (str.includes('watching')) {
      return;
    }
    compileStatus.bsb = {
      status: 'compiling',
      msg: 'OK',
    };
  }
  compileEmitter.emit('log');
});

compileEmitter.on('log', () => {
  clearConsole();
  const { bsb, webpack } = compileStatus;
  process.stdout.write(chalk.yellow('[BUCKLESCRIPT]'));
  process.stdout.write('\n');
  if (bsb.status === 'error') {
    process.stdout.write(chalk.red('Compilation Error'));
    process.stdout.write('\n\n');
    process.stdout.write(bsb.msg);
  } else if (bsb.status === 'compiling') {
    process.stdout.write(chalk.yellow('Compiling...'));
  } else {
    process.stdout.write(chalk.green('Compilation Success'));
  }

  process.stdout.write('\n\n');

  process.stdout.write(chalk.yellow('[WEBPACK]'));
  process.stdout.write('\n');
  if (webpack.status === 'error') {
    process.stdout.write(chalk.red('Compilation Error'));
    process.stdout.write('\n\n');
    process.stdout.write(webpack.msg);
  } else if (webpack.status === 'compiling') {
    process.stdout.write(chalk.yellow('Compiling...'));
  } else {
    process.stdout.write(chalk.green('Compilation Success'));
    process.stdout.write('\n\n')
    process.stdout.write(chalk.cyan(`Serving your content at localhost:${JSON.stringify(PORT)}`))
  }
})
