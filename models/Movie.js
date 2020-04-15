const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// ŞEMA OLUŞTURMA (MOVIE)
// Filmleri Ekleyeceğimiz Collection için Şemamızı oluşturduk ve dışa aktardık.

const MovieSchema = new Schema({
    director_id: Schema.Types.ObjectId,
    title: {
        type: String,
        required: [true , '{PATH} alanı zorunludur.'],
        maxlength : [20 , '`{PATH}` alanı (`{VALUE}`) , ({MAXLENGTH}) karakterden büyük olamaz.'],
        minlength : [3 , '`{PATH}` alanı (`{VALUE}`) , ({MINLENGTH})  karakterden küçük olamaz.']
    },
    category: {
        type: String,
        maxlength: 30,
        minlength: 1
    },
    country: {
        type: String,
        maxlength: 30,
        minlength: 1
    },
    year: {
        type: Number,
        max: 2050,
        min: 1900
    },
    imdb_score: {
        type: Number,
        max: 10,
        min: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('movie' , MovieSchema);