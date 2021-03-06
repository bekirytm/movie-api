const express = require('express');
const router = express.Router();

// MOVIE Root'u
// AÇIKLAMA : Apilerde karşıdan gelen veriler req.body ile alınabilir.


// Models
const Movie = require('../models/Movie');


// ****** BÜTÜN FİLMLERİ GETİRME *******
// AÇIKLAMA : Burada db'ye kayıtlı tüm filmleri getiren endpoint'i yaptık.

//Düzenleme : Artık filmlerin yönetmenleri de eklendi.
router.get('/' , (req,res) => {
  const promise = Movie.aggregate([
    {
      $lookup : {
        from: 'directors',
        localField : 'director_id',
        foreignField : '_id',
        as : 'director'
      }
    },
    {
      $unwind : '$director'
    }
  ]);

  promise.then((data) => {
    res.json(data);
  }).catch((err) =>{
    res.json(err);
  });

});


// TOP 10 LİSTESİ
// En yüksek IMDB puanına sahip ilk 10 filmi getirir.  (Burada önemli olan ıd bazlı get isteğinin önünde olmalı olması)

router.get('/top10' , (req,res) => {
  const promise = Movie.find({}).limit(10).sort({imdb_score: -1});

  promise.then((data) => {
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  });
});



// BETWEEN / İki yıl arası arama
// Burada iki yıl arasındaki filmleri bulmamızı sağlar. NOT: gte ve lte arasında anlamında e(<=) harfi o yılı da alır.  (gte : >= /  gt : > )
router.get('/between/:start_year/:end_year' , (req,res) =>{

  const { start_year,end_year } = req.params;
  const promise = Movie.find(
      {
          year: { "$gte" : parseInt(start_year) , "$lte" : parseInt(end_year) }    //Burada gte ve lte büyük eşit - küçük eşit anlamında. (e harfi eşiti kapsar.)
      });

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});





// ****** ID' ye GÖRE ARAMA YAPMA ****** (movie_id bazlı arama)
// AÇIKLAMA : Burada film id'lerine göre arama yaptık ve o id'ye sahip filmi getirdik.
// NOT : endpoint'ten gelen değerleri req.params ile alabiliriz. (:)

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
  const promise = Movie.findByIdAndUpdate(
      req.params.movie_id,
      req.body,                 // hangi kayıt , hangi değişiklikler
      {
        new : true              //Güncelleme yaptıktan sonra güncellenen objeyi dönmesini sağlar.(Normalde eski değer dönüyordu.)
      }
  );

  promise.then((data) => {
    if(!data){
      next({ message:  " The movie was not found. Update failed." , code : 108 });
    }else{
      res.json(data);
    }
  }).catch((err) => {
    res.json(err);
  });

});



// ****** ID BAZLI SİLME İŞLEMİ ******
// Burada id bazlı silme işlemi yaptık.Film id'lerine göre film kaydını sildik.

router.delete('/:movie_id' , (req,res,next) => {
  const promise = Movie.findByIdAndRemove(req.params.movie_id);

  promise.then((data) => {
    if(!data){
      next({ message : "The movie was not found.Delete failed. ", code : 107});
    }else{
      res.json({ status : 1});
    }
  }).catch((err) => {
    res.json(err);
  });
});




// ****** YENİ FİLM OLUŞTURMA ******

router.post('/', (req, res) => {

  // YENİ YÖNTEM (Burada karşıdan gelen verileri req ile aldık ve promise ile kaydettik.)

  const movie = new Movie(req.body);  // req.body (post'tan (karşıdan) gelen verilerdir)
  // Burada Promise Yapısını Kullanmamız daha mantıklı ve uygun.
  const promise = movie.save();
  promise.then((data) => {
    res.json(data);
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
