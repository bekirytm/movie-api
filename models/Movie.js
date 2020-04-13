const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// ŞEMA OLUŞTURMA (MOVIE)
// Filmleri Ekleyeceğimiz Collection için Şemamızı oluşturduk ve dışa aktardık.

const MovieSchema = new Schema({
    director_id: Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    category: String,
    country: String,
    year: Number,
    imdb_score: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('movie' , MovieSchema);