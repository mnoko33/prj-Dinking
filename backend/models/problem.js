const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const problemSchema = new Schema({
    pb_source: String,
    pb_id: Number,
    pb_name: String,
    pb_success_cnt: Number,
    pb_trial_cnt: Number,
    pb_success_rate: Number,
    pb_difficulty: String,
    pb_score: Number,
},
    {
        versionKey: false
    });

module.exports = mongoose.model('Problem', problemSchema);