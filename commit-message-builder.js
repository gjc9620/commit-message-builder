#! /usr/bin/env node
'use strict';

const inquirer = require('inquirer');
const { exec } = require('child_process');

var questions = [
  {
    type: 'rawlist',
    pageSize: Infinity,
    name: 'type',
    message: 'type',
    choices: [
      '🤔  wip',
      '🌈  feat',
      '🐞  fix',
      '😱  test',
      '🚚  build',
      new inquirer.Separator(),
      '📝  docs',
      '🔨  refactor',
      '🚀  perf',
      '👗  style',
      '🛠  chore',
      '⏪  revert',
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
