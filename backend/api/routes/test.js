const express = require('express');
const router = express.Router();
const TestService = require('../../services/TestService')

// create dummy user
router.post('/dummyUsers', async (req, res, next) => {
    const { start, end } = req.body;
    const result = await TestService.createDummyUsers(start, end);
    res.json({ result })
})

// add problem_set
router.patch('/dummyUsers/BOJ_problem_set', async (req, res, next) => {
    const cnt = req.body.cnt
    const result = await TestService.updateBOJ(cnt)
    res.json({ result })
})

// create rank sys
router.post('/rankSys/ranks', async (req, res, next) => {
    const result = await TestService.createRankSys()
    res.json({ result })
})

// set nextRank
router.post('/rankSys/nextRank', async (req, res, next) => {
    const result = await TestService.setNextRank();
    res.json({ result })
})

// insert problem data into DB
router.post('/problems', async (req, res, next) => {
    const result = await TestService.csv2DB();
    res.json({ result })
})


module.exports = router