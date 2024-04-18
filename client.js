const axios = require('axios');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function sendCommand(command) {
  const url = 'http://127.0.0.1:5000/api/command'; // URL of the server to send the command to
  const payload = { command: command }; // Payload data containing the command

  // Send a POST request to the server with the payload
  axios.post(url, payload)
    .then(response => {
      // Print the result returned by the server
      console.log(response.data.result);
    })
    .catch(error => {
      // Print an error message if the request failed
      console.error('Error:', error.message);
    });
}

// Start an infinite loop to continuously accept user input
function promptCommand() {
  rl.question('Enter command (type "exit" to quit): ', (command) => {
    if (command.toLowerCase() === 'exit') {
      rl.close(); // Close the readline interface if the user enters 'exit'
    } else {
      sendCommand(command); // Send the user-entered command to the server for processing
      promptCommand(); // Prompt for the next command
    }
  });
}

// Start prompting for user input
promptCommand();
