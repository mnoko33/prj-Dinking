const express = require('express');
const router = express.Router();
const AuthService = require('../../services/AuthService')

// check isDuplcaited by type 
router.get('/signup', async (req, res, next) => {
    const type = req.query.type;
    const data = req.query.data;
    const isDuplcated = await AuthService.isDuplcated(type, data)
    res.json({ isDuplcated })
})

// Signup
router.post('/signup', async (req, res, next) => {
    const userDTO = req.body;
    const user = await AuthService.signup(userDTO);
    res.json({ user })
})

// Login
router.post('/login', async (req, res, next) => {
    const userDTO = req.body;
    const user = await AuthService.login(userDTO);
    res.json({ user })
})

module.exports = router;
