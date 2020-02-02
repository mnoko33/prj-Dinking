const mongoose = require('mongoose');

const db = function () {
    return mongoose.connect('mongodb://localhost:27017/toy_prj1')
        .then((db => {
            console.log('mongoose is connected!')
            return db
        }))
        .catch(err => {
            console.log('DB is not connected!', err)
        })

}

module.exports = db