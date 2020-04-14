const mongoose = require('mongoose');
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


// Bütün Yönetmenler ve Filmlerini Getirme :
router.get('/' , (req,res) => {
  const promise = Director.aggregate([
    {
      // Burada Join işlemi yapılır.(Bağlama)
      $lookup: {
          from : 'movies',
          localField : '_id',
          foreignField : 'director_id',
          as : 'movies'
      }
    },
    {
      // Yukarıdaki bağlantıyı kullanabilmek için .
      $unwind : {
        path : '$movies',
        preserveNullAndEmptyArrays : true    // Bunun anlamı yönetmenin filmi olmasa da göster.
      }
    },
    {
      //Bir Yönetmene ait tüm filmleri beraber göstermesi için.
      $group:{
        _id: {
          _id : '$_id',
          name : '$name',
          surname : '$surname',
          bio : '$bio'
        },
        movies : {
          $push : '$movies'
        }
      }
    },
    {
      // Gösterme işleminde id yazmasın diye.
      $project : {
        _id : '$_id._id',
        name : '$_id.name',
        surname : '$_id.surname',
        movies : '$movies'
      }
    }


  ]);

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });

});


// Director_id Bazlı Yönetmen Arama , Getirme :
router.get('/:director_id' , (req,res) => {
  const promise = Director.aggregate([
    {
      // Koşullar burada konulur.
      $match : {
        '_id' : mongoose.Types.ObjectId(req.params.director_id)
      }
    },
    {
      // Burada Join işlemi yapılır.(Bağlama)
      $lookup: {
        from : 'movies',
        localField : '_id',
        foreignField : 'director_id',
        as : 'movies'
      }
    },
    {
      // Yukarıdaki bağlantıyı kullanabilmek için .
      $unwind : {
        path : '$movies',
        preserveNullAndEmptyArrays : true    // Bunun anlamı yönetmenin filmi olmasa da göster.
      }
    },
    {
      //Bir Yönetmene ait tüm filmleri beraber göstermesi için.
      $group:{
        _id: {
          _id : '$_id',
          name : '$name',
          surname : '$surname',
          bio : '$bio'
        },
        movies : {
          $push : '$movies'
        }
      }
    },
    {
      // Gösterme işleminde id yazmasın diye.
      $project : {
        _id : '$_id._id',
        name : '$_id.name',
        surname : '$_id.surname',
        movies : '$movies'
      }
    }


  ]);

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });

});


module.exports = router;
