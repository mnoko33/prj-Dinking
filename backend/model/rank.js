const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rankSchema = new Schema({
    rankName: String,
    rankMark: Number,
    rankImg: String,
    threshold: Number,
    nextRank: mongoose.ObjectId,
},
    {
        versionKey: false
    });

module.exports = mongoose.model('Rank', rankSchema);