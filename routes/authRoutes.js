const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  //passport.authenticate is a middleware here. it passes control to passport for auth
  //and once finished, it will give control back to another middleware
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys/');
    }
  );

  // app.get('/', (req, res) => {
  //   res.send({ Abir: 'Mehra', Anshika: 'Mehra', Bhuvan: 'Mehra' });
  // });

  app.get('/api/logout', (req, res) => {
    req.logout(); // Passport automatically attaches logout function to request object
    //res.send(req.user);
    // Logout function takes the cookie that has user id and kills the id in there
    res.redirect('/');
  });
  // app.get('/api/current_user', (req, res) => {
  //                               Arrow Function with request and response object
  // Arrow Function automatically gets called when user navigates to this route
  app.get('/api/current_user', (req, res) => {
    res.send(req.user); // Passport attaches the user property to request object
  });
};
