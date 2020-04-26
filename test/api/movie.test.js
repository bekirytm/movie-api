const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);

let token , movieId;

describe('/api/movies tests ' , () => {
   before((done) => {                         //before kısmı testten önce çalışmasını istediğimiz kod alanı.(Burayı test için token gerekli onu burda alıyoruz.)
      chai.request(server)
          .post('/authenticate')
          .send({username: 'bkr258' , password : 'bkr258'})
          .end((err,res)=> {
             token = res.body.token;
              console.log(token);
              done();
          });
   });

    //Token kullanarak bütün filmleri getiren route testi : (Burada token ile filmleri getirmesi test ediliyor.)
   describe('/GET movies test' , ()=> {
       it('it should GET all the movies' , (done)=> {
          chai.request(server)
              .get('/api/movies')
              .set('x-access-token' , token)
              .end((err,res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  done();
              });
       });
    });


   // Burada da film ekleme işlemi testi yapıyoruz.
   describe('/POST movie test' , () => {
       it('it should POST a movie' , (done)=> {
           const movie = {
               title : "Test",
               director_id : "5e95bc9cccc4494cb0a788f4",
               category : "Komedi",
               country : "Turkey",
               year : 1980,
               imdb_score : 8
           };


           chai.request(server)
               .post('/api/movies')
               .send(movie)
               .set('x-access-token' , token)
               .end((err,res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('title');
                  res.body.should.have.property('director_id');
                  res.body.should.have.property('category');
                  res.body.should.have.property('country');
                  res.body.should.have.property('year');
                  res.body.should.have.property('imdb_score');
                  movieId = res.body._id;
                  done();
               });
       });

   });


   // movie_id ile Film arama testi
    describe('/GET/:movie_id movie' , ()=> {
       it('it should Get  movie by the id' , (done) => {
          chai.request(server)
              .get('/api/movies/' + movieId)
              .set('x-access-token' , token)
              .end((err,res) => {
                 res.should.have.status(200);
                 res.body.should.be.a('object');
                 res.body.should.have.property('title');
                 res.body.should.have.property('director_id');
                 res.body.should.have.property('category');
                 res.body.should.have.property('country');
                 res.body.should.have.property('year');
                 res.body.should.have.property('imdb_score');
                 res.body.should.have.property('_id').eql(movieId);
                 done();
              });

       });
    });


    // PUT işlemi testleri :
    describe('/PUT/movie_id movie test' , () => {
        it('it should UPDATE a movie given by id' , (done)=> {
            const movie = {
                title : "93creative",
                director_id : "5e95bc9cccc4494cb0a788f1",
                category : "Suç",
                country : "Fransa",
                year : 1970,
                imdb_score : 9
            };


            chai.request(server)
                .put('/api/movies/' + movieId)
                .send(movie)
                .set('x-access-token' , token)
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title').eql(movie.title);
                    res.body.should.have.property('director_id').eql(movie.director_id);
                    res.body.should.have.property('category').eql(movie.category);
                    res.body.should.have.property('country').eql(movie.country);
                    res.body.should.have.property('year').eql(movie.year);
                    res.body.should.have.property('imdb_score').eql(movie.imdb_score);

                    done();
                });
        });

    });


    // DELETE işlemi testi :
    describe('/DELETE/movie_id movie test' , () => {
        it('it should DELETE a movie given by id' , (done)=> {

            chai.request(server)
                .delete('/api/movies/' + movieId)
                .set('x-access-token' , token)
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(1);

                    done();
                });
        });

    });
});