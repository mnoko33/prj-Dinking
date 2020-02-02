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
    history: Array,
    problem_set: Array,
},
    {
        versionKey: false
    });

module.exports = mongoose.model('User', userSchema);