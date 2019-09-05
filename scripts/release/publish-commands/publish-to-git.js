const execa = require('execa');
const version = process.env.version

;(async () => {
  await execa('git', ['add', '-A'], { stdio: 'inherit' })
  await execa(
    'git',
    ['commit', '-m', `build: build production v${version}`],
    { stdio: 'inherit' }
  )
  await execa(
    'npm',
    ['version', version, '-m', `chore: update version with tag v${version}`],
    { stdio: 'inherit' }
  )
  await execa('git', ['push', 'origin', `v${version}`], { stdio: 'inherit' })
  await execa('git', ['push', 'origin', 'master'], { stdio: 'inherit' })
  console.log('release prod end')
})().catch((err) => {
  console.log(err)
  console.error(err.stderr)
  console.error(err.stdout)
  process.exit(1)
})
