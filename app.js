const inquirer = require('inquirer');
const colors = require('colors');

const connection = require('./lib/connection');
const viewTracker = require('./lib/viewTracker');
const addToTracker = require('./lib/addToTracker');
const updateTracker = require('./lib/updateTracker');

// Connecting to server
connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
  teamManager();
});

// Main menu
const teamManager = async () => {
  try {
    console.log('Welcome to the Employee Tracker');
    const { functionChoice } = await inquirer.prompt({
      type: 'list',
      name: 'functionChoice',
      message: 'What would you like to do?',
      choices: ['Add', 'View', 'Update', 'Exit'],
    });
    console.clear();
    switch (functionChoice) {
      case 'Add':
        await addToTracker();
        teamManager();
        break;
      case 'View':
        await viewTracker();
        teamManager();
        break;
      case 'Update':
        await updateTracker();
        teamManager();
        break;
      default:
        console.log('Exiting App...'.red.bold);
        process.exit();
        break;
    }
  } catch (err) {
    console.error(`ERROR - App.js - teamManager.js: ${err}`);
  }
};
