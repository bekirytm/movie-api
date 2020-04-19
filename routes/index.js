const express = require('express');
const router = express.Router();

//bcrypt
const bcrypt = require('bcryptjs');

//jwt
const jwt = require('jsonwebtoken');

//Models
const User = require('../models/User');


// KAYIT OLMA
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
      // Kullanıcı adı kayıtlı değilse:
      res.json({
        status : false ,
        message : 'Autentication failed , user not found. '
      });
    }
    else{
      // Kullanıcı adı var ise şifre karşılaştırma:
      bcrypt.compare(password , user.password).then((result) => {
        if(!result){
          // Şifre karşılaştırma başarısızsa:
          res.json({
            status : false  ,
            message : 'Authentication failed , wrong password'
          });
        }
        else{
          // Şifre Krşılaştırma başarılı ise Token Oluşturma:
          const payload = {
            username
          };

          const token = jwt.sign(payload , req.app.get('api_secret_key') , {
            expiresIn : 720 // 12 saat
          });

          res.json({
            status : true ,
            token
          });

        }
      });
    }
  });

});



module.exports = router;
