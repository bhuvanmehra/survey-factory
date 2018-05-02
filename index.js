const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./models/User');
require('./models/Survey');
require('./services/passport');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

const app = express();

//Place all Express Middlewares here
//app.use is a middleware
//Middleware are small functions preprocesses the incoming requests before
//sending them to different route handlers
//Place common logic for all the route handlers in Middle wares

//if any incoming POST/PUT request has a body then body-parser would parse the body and
//assign it to req.body
app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

//now use req.user to access user model anywhere
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  //Express will serve up production assets like main.js or main.css file!
  app.use(express.static('client/build'));

  //In Heroku when we navigate to /surveys, then a HTTP request goes to Express server.
  //Now Express doesnt has such a route.
  //So Express checks 1. If it has a file inside its build directory called surveys?
  //                  2. Else just load up the HTML document it has and makes calls to main.js.
  //                  3. React Application boots up. React router takes control
  //                     and deciedes what components to show on screen depending on the route
  //Express will serve index.html file if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
const PORT = process.env.PORT || 5000;
app.listen(PORT);
