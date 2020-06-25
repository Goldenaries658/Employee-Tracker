const inquirer = require('inquirer');
const colors = require('colors');

const connection = require('./config/connection');
const viewTracker = require('./lib/viewTracker');
const addToTracker = require('./lib/addToTracker');
const updateTracker = require('./lib/updateTracker');

// Connecting to server
connection.connect((err) => {
  if (err) {
    console.error(`Error connecting: ${err.stack}`.red.bold);
    return;
  }
  console.clear();
  console.log('Connected - id: '.green + `[${connection.threadId}]`.cyan);
  console.log(
    `Welcome to the Employee Tracker
`.blue.bold.underline
  );
  teamManager();
});

// Main menu
const teamManager = async () => {
  try {
    const { functionChoice } = await inquirer.prompt({
      type: 'list',
      name: 'functionChoice',
      message: 'What would you like to do?',
      choices: ['Add', 'View', 'Update', 'Exit'.red],
    });
    console.clear();
    switch (functionChoice) {
      case 'Add':
        await addToTracker();
        break;
      case 'View':
        await viewTracker();
        break;
      case 'Update':
        await updateTracker();
        break;
      default:
        exitApp();
    }
    const { confirmCont } = await inquirer.prompt({
      type: 'confirm',
      name: 'confirmCont',
      message: 'Quit?'.red.bold,
    });
    console.clear();
    confirmCont ? exitApp() : teamManager();
  } catch (err) {
    console.error(`ERROR - App.js - teamManager.js: ${err}`);
  }
};

const exitApp = () => {
  console.log('Exiting App...'.red.bold);
  process.exit();
};
