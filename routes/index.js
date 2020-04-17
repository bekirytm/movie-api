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


router.get('/pass' , (req,res) => {

});

module.exports = router;
