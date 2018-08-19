const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
// Make a new exress app
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


// Middleware to keep timetamted server log that displays every url entered by user
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log')
    }
  });
  next();
})
// Middleware to display maintenance page..stops other pages from being displayed
// because next() is not called.
// app.use((req, res, next) => {
//   res.render('maintenance.hbs')
// })

// Middleware to allow you to access public directory
app.use(express.static(__dirname + '/public'));

// Helper section
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
})
// Register a handler for a get request
app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  res.render('home.hbs', {
    welcomeMessage: 'Welcome to this wonderful website',
    pageTitle: 'Home Page',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({errorMessage: "unable to fufill this request"})
});

app.listen(3000, () => {
  console.log("Server is up and running on port 3000.")
}); //Binds app to port on machine
