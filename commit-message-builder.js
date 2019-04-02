const inquirer = require('inquirer');
const { exec } = require('child_process');

var questions = [
  {
    type: 'rawlist',
    pageSize: Infinity,
    name: 'type',
    message: 'type',
    choices: [
      '🐞  fix',
      '🛠  chore',
      '👗  style',
      '🚚  build',
      '📝  docs',
      '🔨  refactor',
      new inquirer.Separator(),
      '🚀  perf',
      '⏪  revert',
      '😱  test',
      '🌈  feat',
      '🤔  wip',
    ],
    filter: function(val) {
      console.log(val);
      return val.toLowerCase();
    }
  },
  {
    type: 'input',
    name: 'scope',
    message: "scope",
  },
  {
    type: 'input',
    name: 'subject',
    message: "subject",
  },
];

inquirer.prompt(questions).then(answers => {
  const {
    type,
    scope,
    subject,
  } = answers;
  
  exec(`git commit -m "${type.replace(/.* {2}/,'')}(${scope}): ${subject}"`, (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      console.log(err);
      return;
    }
    
    // // the *entire* stdout and stderr (buffered)
    // console.log(`stdout: ${stdout}`);
    // console.log(`stderr: ${stderr}`);
    console.log('Have a nice day!😀');
  });
});
