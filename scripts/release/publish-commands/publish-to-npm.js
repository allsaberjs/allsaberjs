const { exec } = require('child-process-promise');
const { readJsonSync } = require('fs-extra');
const { join } = require('path');
const { confirm, execRead } = require('../utils');
const theme = require('../theme')

const run = async ({ cwd }) => {
  const { version } = readJsonSync(join(cwd, 'package.json'));
  const info = await execRead(`npm view allsaberjs@${version}`);
  if (info) {
    console.log(
      theme`{package allsaberjs} {version ${version}} has already been published.`
    );
    await confirm('Is this expected?');
  }
}

module.exports = run;

