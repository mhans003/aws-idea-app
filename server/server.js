//Configure Express app.
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

//Include routes.
//

//Handle parsing middleware.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Serve static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

//API routes will go here
//

// Start the API server
app.listen(PORT, () =>
  console.log(`Server now listening on PORT ${PORT}!`)
);

