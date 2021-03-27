#!/usr/bin/env node

const execa = require('execa');
const theme = require('./theme')

const pushgit = async () => {
  const vernum = process.env.version;
  console.log('vernum:', vernum)
  await execa('git', ['add', '-A'], { stdio: 'inherit' })
  await execa('git', ['commit', '-m', `build production v${vernum}`], { stdio: 'inherit' })
  await execa('npm', ['version', vernum, '-m', `chore: update version with tag v${vernum}`], { stdio: 'inherit' })
  // await execa('git', ['push', 'origin', `v${vernum}`], { stdio: 'inherit' })
  // await execa('git', ['push', 'origin', 'master'], { stdio: 'inherit' })
  await execa('git', ['push'], { stdio: 'inherit' })
  console.log(
    theme`{package ✓} Publish to {package github} finished...`
  );
}

module.exports = pushgit

