#!/usr/bin/env node

'use strict';

const { join } = require('path')
const confirmVersionAndTags = require('./confirm-version');
const publishToGit = require('./publish-git');
const publishToNPM = require('./publish-npm');

const run = async () => {
  const params = {
    cwd: join(__dirname, '..', '..')
  }

  await confirmVersionAndTags(params); // 确定版本号
  await publishToGit();  // 发布到github
  await publishToNPM(params); // 发布到npm
};
run();
