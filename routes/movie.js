const express = require('express');
const router = express.Router();

// MOVIE Root'u
// AÇIKLAMA : Apilerde karşıdan gelen veriler req.body ile alınabilir.


// Models
const Movie = require('../models/Movie');


// ****** BÜTÜN FİLMLERİ GETİRME *******
// AÇIKLAMA : Burada db'ye kayıtlı tüm filmleri getiren endpoint'i yaptık.

router.get('/' , (req,res) => {
  const promise = Movie.find({});

  promise.then((data) => {
    res.json(data);
  }).catch((err) =>{
    res.json(err);
  });

});


// ****** ID' ye GÖRE ARAMA YAPMA ****** (movie_id bazlı arama)
// AÇIKLAMA : Burada film id'lerine göre arama yaptık ve o id'ye sahip filmi getirdik.

router.get('/:movie_id' , (req,res,next) => {
  const promise = Movie.findById(req.params.movie_id);

  promise.then((data) => {
    // Burada hata yönetimi yaptık (o id'de movie yoksa)
    if(!data){
      next({ message : " The movie was not found ." , code : 109 });
    }else {
      res.json(data);
    }

  }).catch((err) => {
    res.json(err);
  })

});


// ****** GÜNCELLEME İŞLEMİ ******
// Burada istenilen filme ait değişiklikler , güncellemeler yaptık.
router.put('/:movie_id' , (req,res,next) => {
  const promise = Movie.findByIdAndUpdate( req.params.movie_id , req.body );   // hangi kayıt , hangi değişiklikler

  promise.then((data) => {
    if(!data){
      next({ message:  " The movie was not found ." , code : 108 });
    }else{
      res.json(data);
    }
  }).catch((err) => {
    res.json(err);
  })

});





// ****** YENİ FİLM OLUŞTURMA ******

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
