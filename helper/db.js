// Burada app.js ' de kullanabilmek için db connection'ımızı modül olarak yazdık ve app.js'e ekledik.

const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect('Burada db connect linki var.', {useNewUrlParser: true , useUnifiedTopology: true });
  mongoose.connection.on('open' , () => {
      console.log("MongoDB :  Connected");
  });

  mongoose.connection.on('error' , (err) => {
      console.log("MongoDB : ERROR " , err);
  });

  // Buradaki yapının nedeni rout işlemlerimizden dönen verileri promise ile kullanabilmek.
  mongoose.Promise = global.Promise;
};