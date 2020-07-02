// Burada app.js ' de kullanabilmek için db connection'ımızı modül olarak yazdık ve app.js'e ekledik.

const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect('mongodb://movie_user:movie1234@ds123981.mlab.com:23981/heroku_p3g76q4l', {useNewUrlParser: true , useUnifiedTopology: true });
  mongoose.connection.on('open' , () => {
      console.log("MongoDB :  Connected");
  });


  mongoose.connection.on('error' , (err) => {
      console.log("MongoDB : ERROR " , err);
  });

  // Buradaki yapının nedeni route işlemlerimizden dönen verileri promise ile kullanabilmek.
  mongoose.Promise = global.Promise;
};