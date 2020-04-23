const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app');

chai.use(chaiHttp);

describe('Node Server' , () => {
   it('GET / anasayfayı döndürür.' , (done) => {
       chai.request(server) // Bir istek attık
           .get('/')   // Gideceği yeri gösterdik(direk kök dizini)
           .end((err,res) => {
              // İstek bittiğinde bu http call'un durumu 200 olmalı.(Buna bakıcaz.)
              res.should.have.status(200);

              done();     // Test bitti. her şey yolunda demek.
           });
        // Test bitti. her şey yolunda demek.
   });
});


