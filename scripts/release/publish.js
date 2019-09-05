#!/usr/bin/env node

'use strict';

const { join } = require('path')
const confirmVersionAndTags = require('./publish-commands/confirm-version');
// const publishToGit = require('./publish-commands/publish-to-git');
const publishToNPM = require('./publish-commands/publish-to-npm');

const run = async () => {
  const params = {
    cwd: join(__dirname, '..', '..')
  }

  await confirmVersionAndTags(params); // 确定版本号
  await publishToGit();  // 发布到github
  await publishToNPM(params); // 发布到npm
};
run();
