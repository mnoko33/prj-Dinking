const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    password: String,
    nickName: String,
    profile: { type: String, default: "https://faculty.nps.edu/dl/ced3/img/team/NO.png" },
    score: { type: Number, default: 0 },
    last: { type: Date, default: Date.now() },
    continuous: { type: Number, default: 1 },
    rank: { type: String, default: "Unranked" },
    threshold: { type: Number, default: 1 },
    nextRank: Schema.Types.ObjectId,
    rank_history: { type: Array, default: [] },
    boj_problem_set: { type: Array, default: [] },
    badge:{ type: Array, default: [] }
},
    {
        versionKey: false
    });

module.exports = mongoose.model('User', userSchema);

