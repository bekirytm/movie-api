const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Director Şeması :

const DirectorSchema = new Schema({
    name : String,
    surname : String,
    bio : String,
    createAt : {
        type: Date,
        default : Date.now
    }
});


module.exports = mongoose.model('director', DirectorSchema);