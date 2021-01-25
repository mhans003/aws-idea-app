//Configure Express app.
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

//Include routes.
const userRoutes = require('./routes/user-routes');

//Handle parsing middleware.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Serve static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

//Set up API routes.
app.use('/api/', userRoutes);

// Start the API server
app.listen(PORT, () =>
    console.log(`Server now listening on PORT ${PORT}!`)
);

