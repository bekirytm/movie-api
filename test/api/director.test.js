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
    

});