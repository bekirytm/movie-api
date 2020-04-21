const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
  const token = req.headers['x-access-token'] || req.body.token || req.query.token;


  if(token){
      jwt.verify(token , req.app.get('api-secret_key') , (err , decoded) => {
         if(err){
             res.json({
                 status : false,
                 message : 'Failed to Authenticate Token'
             });
         }
         else{
            req.decode = decoded;
            next();
         }
      });
  }
  else{
      res.josn({
         status : false,
         message : 'No token Provided'
      });
  }


};