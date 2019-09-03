#!/usr/bin/env node

'use strict';

const { join } = require('path')

// const publishToGit = require('./publish-commands/publish-to-git');
const publishToNPM = require('./publish-commands/publish-to-npm');

const run = async () => {
  const params = {
    cwd: join(__dirname, '..', '..')
  }

  // await publishToGit();
  await publishToNPM(params);
};
run();
