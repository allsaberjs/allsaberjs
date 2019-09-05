const execa = require('execa');

const pushgit = async () => {
  const vernum = process.env.version;
  console.log('vernum:', vernum)
  await execa('git', ['add', '-A'], { stdio: 'inherit' })
  await execa(
    'git',
    ['commit', '-m', `build: build production v${vernum}`],
    { stdio: 'inherit' }
  )
  await execa(
    'npm',
    ['version', vernum, '-m', `chore: update version with tag v${vernum}`],
    { stdio: 'inherit' }
  )
  await execa('git', ['push', 'origin', `v${vernum}`], { stdio: 'inherit' })
  await execa('git', ['push', 'origin', 'master'], { stdio: 'inherit' })
  console.log('release prod end')
}

module.exports = pushgit

