const express = require('express');
const router = express.Router();
const User = require('../model/user');
const Problem = require('../model/problem');
const makeRes = require('../makeRes');

router.post('/problem_set/:id', async function(req, res, next) {
    const problemId = req.params.problemId;
    const userId = req.body.userId;
    
    try {
        // TODO: update logic
        const problem = await Problem.findById(problemId);
        const user = await User.findById(userId);
        user.proble_set.push(problem);
        // user.score += new_score
        // user.history.push()
        user = await user.save();
        // 
    }

    catch(err) {
        res.json(makeRes(false, "err", err))
    }
})

module.exports = router;