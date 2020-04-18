const express = require('express');
const router = express.Router();

//bcrypt
const bcrypt = require('bcryptjs');

//Models
const User = require('../models/User');

router.post('/register' , (req,res,next) => {
  const { username , password } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    const user = new User({
      username : username,
      password : hash
    });

    const promise = user.save();
    promise.then((data) => {
      res.json(data);

    }).catch((err) => {
      res.json(err);
    });
  });
});


router.post('/authenticate' , (req,res) => {
  const { username , password } = req.body;

  User.findOne({
    username
  } , (err , user) => {
    if(err){
      throw err;
    }

    if(!user){
      res.json({
        status : false ,
        message : 'Autentication failed , user not found. '
      });
    }
    else{
      bcrypt.compare(password , user.password).then((result) => {
        if(!result){
          res.json({
            status : false  ,
            message : 'Authentication failed , wrong password'
          })
        }
        else{

        }
      });
    }
  });

});



module.exports = router;
