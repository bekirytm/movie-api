// Burada app.js ' de kullanabilmek için db connection'ımızı modül olarak yazdık ve app.js'e ekledik.

const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect('mongodb://movie_user:abcd1234@ds139436.mlab.com:39436/movie-api', {useNewUrlParser: true , useUnifiedTopology: true });
  mongoose.connection.on('open' , () => {
      console.log("MongoDB :  Connected");
  });

  mongoose.connection.on('error' , (err) => {
      console.log("MongoDB : ERROR " , err);
  })
};