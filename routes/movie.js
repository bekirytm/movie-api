const express = require('express');
const router = express.Router();

// MOVIE Root'u
// AÇIKLAMA : Apilerde karşıdan gelen veriler req.body ile alınabilir.


// Models
const Movie = require('../models/Movie');


router.post('/', (req, res, next) => {



  // YENİ YÖNTEM (Burada karşıdan gelen verileri req ile aldık ve promise ile kaydettik.)

  const movie = new Movie(req.body);
  // Burada Promise Yapısını Kullanmamız daha mantıklı ve uygun.
  const promise = movie.save();
  promise.then(() => {
    res.json({ status : 1 });
  }).catch((err) => {
    res.json(err);
  });





  // ESKİ YÖNTEM : (Buradaki yazım şeklimiz eski ikiside çalışıyor ama diğeri daha kolay ve kısa. )

  // const { title , imdb_score , category , country , year } = req.body;           // DESTRUCTİNG kullandık.
  // const movie = new Movie({
  //     title: title,
  //     imdb_score: imdb_score,
  //     category: category,
  //     country: country,
  //     year: year
  // });

  // movie.save((err,data) => {
  //     if(err){
  //       res.json(err);
  //     }
  //     else{
  //       res.json({ status : 1 });
  //     }
  // });





});

module.exports = router;
