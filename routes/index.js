const express = require('express');
const router = express.Router();

//Models
const User = require('../models/User');

router.post('/register' , (req,res,next) => {
  const { username , password } = req.body;
  const user = new User({
    username : username,
    password : password
  });

  const promise = user.save();
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });

});

module.exports = router;
