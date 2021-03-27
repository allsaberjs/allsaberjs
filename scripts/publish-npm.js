#!/usr/bin/env node

const { exec } = require('child-process-promise');
const { confirm, execRead } = require('./utils');
const theme = require('./theme')

const run = async ({ cwd }) => {
  const version = process.env.version
  const packageName = 'allsaberjs';
  const info = await execRead(`npm view allsaberjs@${version}`);

  if (info) {
    console.log(theme`{package ${packageName}} {version ${version}} has already been published.`);
    await confirm('Is this expected?');
  } else {
    await exec(`npm publish`);
    // tips
    console.log(theme`{spinnerSuccess ✓} Publishing {package ${packageName}} to npm finished...`);
  }
}

module.exports = run;

