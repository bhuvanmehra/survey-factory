//requireLogin if we are exporting function
//RequireLogin if we are exporting class of component

//next is the next middleware or route to which we need to pass the request to. Optional
module.exports = (req, res, next) => {
  if (!req.user) {
    return res.staus(401).send({ error: 'Login Required!' });
  }
  //If req.user is true
  next();
};
