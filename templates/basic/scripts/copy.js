#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const lower = name => path.basename(name).replace(/^./, l => l.toLowerCase());

const root = path.join(__dirname, '..');
const script = process.argv[2];
const output = script.replace(path.join(root, 'lib', 'js'), '');
const js = path.join(path.dirname(script), lower(script));

fs.writeFileSync(
  path.join(root, path.dirname(output), lower(output)),
  fs.readFileSync(js)
);
