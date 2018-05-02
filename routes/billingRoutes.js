const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

// body-parser
// Node.js body parsing middleware.
// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
//requireLogin
//requireLogin middleware is applied to this request. not calling it like this requireLogin()
//bcoz we dont want Express to run it the instance it runs.
//requireLogin - Express will run it internally only once a post request comes this way
module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id
    });

    //Access current user model with req.user
    //This setup as used Passport in index.js
    //Just changing doesnt persist
    req.user.credits += 5;
    //save is an async method. Gives the updated user model
    const user = await req.user.save();
    //Respond the request with res and send data to browser
    res.send(user);
  });
};
