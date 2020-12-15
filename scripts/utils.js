const { exec } = require('child-process-promise');
const prompt = require('prompt-promise');
const theme = require('./theme')

const confirm = async message => {
  const confirmation = await prompt(theme`\n{caution ${message}} (y/N) `);
  console.log('confirmation:', confirmation)
  prompt.done();
  if (confirmation !== 'y' && confirmation !== 'Y') {
    console.log(theme`\n{caution Release cancelled.}`);
    process.exit(0);
  }
};

const execRead = async (command, options) => {
  const { stdout } = await exec(command, options);
  // console.warn('stdout:', stdout)
  return stdout.trim();
};

module.exports = {
  confirm,
  execRead
}
