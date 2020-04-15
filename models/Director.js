const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Director Şeması :

const DirectorSchema = new Schema({
    name : {
        type: String,
        maxlength : [60 , ' (`{PATH}`) alanı en fazla (`{MAXLENGTH}`) karakterden oluşabilir.'],
        minlength : [2 , '(`{PATH}`) alanı en az (`{MINLENGTH}`) karakterden oluşabilir.']
    },
    surname : {
        type: String,
        maxlength: 60,
        minlength: 2
    },
    bio : {
        type: String,
        maxlength : 1000,
        minlength : [10 , 'Bu alan en az ({MINLENGTH}) karakterden oluşmalıdır.']
    },
    createAt : {
        type: Date,
        default : Date.now
    }
});


module.exports = mongoose.model('director', DirectorSchema);