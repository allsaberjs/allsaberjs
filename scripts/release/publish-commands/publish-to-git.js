const { exec } = require('child-process-promise');
const version = process.env.version

;(async () => {
  await exec('git', ['add', '-A'], { stdio: 'inherit' })
  await exec(
    'git',
    ['commit', '-m', `build: build production v${version}`],
    { stdio: 'inherit' }
  )
  await execa(
    'npm',
    ['version', version, '-m', `chore: update version with tag v${version}`],
    { stdio: 'inherit' }
  )
  await exec('git', ['push', 'origin', `v${version}`], { stdio: 'inherit' })
  await exec('git', ['push', 'origin', 'master'], { stdio: 'inherit' })
  console.log('release prod end')
})().catch((err) => {
  console.log(err)
  console.error(err.stderr)
  console.error(err.stdout)
  process.exit(1)
})
