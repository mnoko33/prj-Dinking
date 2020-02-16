const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rankSchema = new Schema({
    rankName: String,
    rankMark: Number,
    rankImg: String,
    threshold: Number,
    nextRank: { type: Schema.Types.Mixed, default: null },
},
    {
        versionKey: false
    });

module.exports = mongoose.model('Rank', rankSchema);