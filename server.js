const express = require('express');
const app = express();
const { exec } = require('child_process');

// Middleware to parse JSON request bodies
app.use(express.json());

// Define a route to handle POST requests to '/api/command'
app.post('/api/command', (req, res) => {
  const command = req.body.command; // Extract the command from the request body

  // Execute the command
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      res.json({ result: `Error: ${error.message}` });
      return;
    }
    if (stderr) {
      console.error(`Error in command output: ${stderr}`);
    }
    console.log(`Command output: ${stdout}`);

    // Return the result as JSON
    res.json({ result: stdout.trim() });
  });
});

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
