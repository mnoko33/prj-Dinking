const express = require('express');
const router = express.Router();
const ProblemService = require('../../services/ProblemService');

// All Problems
router.get('/', async (req, res, next) => {
    const problems = await ProblemService.getAllProblems();
    res.json({ problems })
})

// get problems with conditions
router.get('/:type/:content', async (req, res, next) => {
    const { type, content } = req.params
    const problems = await ProblemService.getProblemsByCondition(type, content)
    res.json({ problems })
})

module.exports = router;