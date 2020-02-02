const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    password: String,
    nickName: String,
    profile: String,
    score: Number,
    last: String,
    continuous: Number,
    rank: String,
    threshold: Number,
    nextRank: mongoose.ObjectId,
    rank_history: Array,
    boj_problem_set: Array,
    badge: Array
},
    {
        versionKey: false
    });

module.exports = mongoose.model('User', userSchema);