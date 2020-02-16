const express = require('express');
const router = express.Router();
const TestService = require('../../services/TestService')

// create dummy user
router.post('/dummyUsers', async (req, res, next) => {
    const { start, end } = req.body;
    const result = TestService.createDummyUsers(start, end);
    res.json({ result })
})

// Login
router.patch('/dummyUsers/BOJ_problem_set', async (req, res, next) => {
    const cnt = req.body.cnt
    TestService.updateBOJ(cnt)
    res.json({true: true})
})

module.exports = router