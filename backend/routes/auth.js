const express = require('express');
const router = express.Router();
const User = require('../model/user');
const { emailRegex, passwordRegex } = require('../regex')
const makeRes = require('../makeRes');

const str2month = {
    "Jan": 1,
    "Feb": 2,
    "Mar": 3,
    "Apr": 4,
    "May": 5,
    "Jun": 6,
    "Jul": 7,
    "Aug": 8,
    "Sep": 9,
    "Oct": 10,
    "Nov": 11,
    "Dec": 12
}

// signup
router.post('/signup', async function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    const nickName = req.body.nickName;

    // check required data
    if (!email || !password || !nickName) {        
        const msg = "No" + (email ? "" : " email") + (password ? "" : " password") + (nickName ? "" : " nickName");
        return res.json(makeRes(false, "err", msg))
    }

    // check regex of email and password
    if (!emailRegex(email)) {
        console.log('email regex err')
        return res.json(makeRes(false, "err", "email regex"))
    }

    if (!passwordRegex(password)) {
        return res.json(makeRes(false, "err", "password regex"))
    }

    // check email and nickName is already exist
    let user = await User.findOne({email: email});
    if (user) {
        return res.json(makeRes(false, "err", "email is already exist"))
    }   

    user = await User.findOne({nickName: nickName});
    if (user) {
        return res.json(makeRes(false, "err", "nickName is already exist"))
    }   

    // make today string
    let today = (new Date).toString().split(' ')
    today = today[3] + str2month[today[1]] + today[2];

    // signup
    const userObj = new User({
        email: email,
        password: password,
        nickName: nickName
    })
    try {
        const user = await userObj.save();
        return res.json(makeRes(true, "user", user))
    }
    catch {
        return res.json(makeRes(false, "err", "there is some error when creating user"))
    }
})

// loogin
router.post('/login', async function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({
        email: email,
        password: password
    })
    if (user) {
        return res.json(makeRes(true, "user", user))
    }
    return res.json(makeRes(false, "err", "there is no such user match with those infos"))
})

router.get('/signup', async function(req, res, next) {
    const type = req.params.type;
    const data = req.params.data;
    if (type === "email") {
        const user = await User.findOne({ email: data });
        if (user) {
            return res.json(makeRes(true, "err", "email is already used"))
        }
        return res.json(makeRes(false, "err", "this email is possible"))
    }
    if (type === "nickName") {
        const user = await User.findOne({nickName: data});
        if (user) {
            return res.json(makeRes(true, "err", "nickName is already used"))
        }
        return res.json(makeRes(false, "err", "this nickName is possible"))
    } 
})

module.exports = router;
