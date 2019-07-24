const express = require('express');
const cors = require('cors');
const path = require('path');

// Create the server
const app = express();

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/dist')));
app.use(express.static(path.join(__dirname, 'client/public_images')));

// Routes.
app.use(require('./mock-server-routes/categories'));
app.use(require('./mock-server-routes/home'));
app.use(require('./mock-server-routes/items'));
app.use(require('./mock-server-routes/suppliers'));

// Anything that doesn't match the above, send back the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/dist/index.html'))
});

// Choose the port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`)
});
