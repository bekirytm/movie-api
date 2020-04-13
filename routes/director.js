const express = require('express');
const router = express.Router();

// Director Rootu

// Models
const Director = require('../models/Director');

// Yeni Kayıt Ekleme :
router.post('/', (req, res) =>  {

  const director = new Director(req.body);
  const promise = director.save();

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });

});


module.exports = router;
