const inquirer = require('inquirer');
const { exec } = require('child_process');


console.log('Have a nice day!');

// type(scope?): subject

var questions = [
  {
    type: 'rawlist',
    pageSize: Infinity,
    name: 'type',
    message: 'type',
    choices: ['fix', 'chore', 'style', 'test', 'build', 'docs', 'refactor', new inquirer.Separator(), 'perf', 'revert',  'feat', 'wip', ],
    filter: function(val) {
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
  
  exec(`git commit -m "${type}(${scope}): ${subject}"`, (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      console.log(err);
      return;
    }
    
    // the *entire* stdout and stderr (buffered)
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
});
