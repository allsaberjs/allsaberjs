const { exec } = require('child-process-promise');
const { readJsonSync } = require('fs-extra');
const { join } = require('path');
const { confirm, execRead } = require('../utils');
const theme = require('../theme')
const version = process.env.version

const run = async ({ cwd }) => {
  const packageName = 'allsaberjs';
  const info = await execRead(`npm view allsaberjs@${version}`);

  console.warn('process.env.version:', process.env.version)
  if (info) {
    console.log(
      theme`{package ${packageName}} {version ${version}} has already been published.`
    );
    await confirm('Is this expected?');
  } else {
    // Publish the package and tag it
    await exec(`npm publish --tag=${version}`);
    // tips
    console.log(
      theme`{spinnerSuccess ✓} Publishing {package ${packageName}}`
    );
  }
}

module.exports = run;

