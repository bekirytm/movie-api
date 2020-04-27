const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);

let token , director_id_test;


describe('/api/directors tests' , () => {
    // TOKEN İŞLEMİ
    before((done) => {
        chai.request(server)
            .post('/authenticate')
            .send({username: 'bkr258' , password : 'bkr258'})
            .end((err,res)=> {
                token = res.body.token;
                console.log(token);
                done();
            });
    });


    // Bütün filmleri getirme testi
    describe('/GET all director get test' , () => {
       it('it should GET all the directors' , (done) => {
           chai.request(server)
               .get('/api/directors')
               .set('x-access-token' , token)
               .end((err,res) => {
                   res.should.have.status(200);
                   res.body.should.be.a('array');

                   done();
               });


       });
    });


    // Director ekleme işlemi testi (POST)
    describe('/POST director test' , () => {
       it('it should POST a director' , (done) => {

           const directorTest = {
               name : "Test İsim 1",
               surname : "Test Soyisim 1",
               bio : "Test Bio Bio Bio  1"
           };

           chai.request(server)
               .post('/api/directors')
               .send(directorTest)
               .set('x-access-token' , token)
               .end((err,res) => {
                   res.should.have.status(200);
                   res.body.should.be.a('object');
                   res.body.should.have.property('name');
                   res.body.should.have.property('surname');
                   res.body.should.have.property('bio');
                   director_id_test = res.body._id;
                   done();
               });

       });
    });


    // director_id ile Arama işlemi Testi
    describe('/GET/:director_id director search' , () => {
       it('/it should GET director by the id' , (done) => {
          chai.request(server)
              .get('/api/directors/' + director_id_test)
              .set('x-access-token' , token)
              .end((err,res) => {
                 res.should.have.status(200);
                 res.body.should.be.a('array');
                 res.body[0].should.have.property('name');
                 res.body[0].should.have.property('surname');
                 res.body[0].should.have.property('_id').eql(director_id_test);

                 done();
              });
       });
    });


    // PUT İşlemi Testi
    describe('/api/directors   PUT director' , () => {
       it('it should UPDATE a mdirector given by id' , (done) => {
           const directorTest = {
               name : "Update Test",
               surname : "Update Test",
               bio : "Test Update bio "
           };


           chai.request(server)
               .put('/api/directors/' + director_id_test)
               .send(directorTest)
               .set('x-access-token' , token)
               .end((err,res) => {
                   res.should.have.status(200);
                   res.body.should.be.a('object');
                   res.body.should.have.property('name').eql(directorTest.name);
                   res.body.should.have.property('surname').eql(directorTest.surname);
                   res.body.should.have.property('bio').eql(directorTest.bio);

                   done();
               });

       });
    });


    // DELETE İşlemi Testi
    describe('/DELETE/:director_id  director test' , () => {
       it('it should DELETE a director given by id' , (done) => {

           chai.request(server)
               .delete('/api/directors/' + director_id_test)
               .set('x-access-token' , token)
               .end((err,res) => {
                  res.should.have.status(200);
                  res.body.should.have.property('status').eql(1);

                  done();
               });
       });
    });

});