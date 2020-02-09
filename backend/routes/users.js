var express = require('express');
var router = express.Router();
const User = require('../model/user')
const Problem = require('../model/problem')

// find all user
router.get('/', function (req, res, next) {
	User.find(function (err, users) {
		if (err) {
			return res.json({status: false, err})
		}
		return res.json({status: true, users})
	});
})

// find user by ID
router.get('/:id', function (req, res, next) {
	User.findById(req.params.id, function (err, user) {
		if (err) {
			return res.json({status: false, err})
		}
		return res.json({ status: true, user })
	})
})

router.patch('/boj_problem_set', async function(req, res, next) {
	const problemId = req.body.id;
	const userId = req.body.userId;
	const problem = await Problem.findById(problemId);
	const userObj = await User.findById(userId);
	userObj.boj_problem_set.push(problem);
	userObj.score += problem.pb_score 
	if (userObj >= userObj.threshold) {
		
	}
	// 가중치 적용 필요
	// 랭크 업인지 아닌지 구분
	const user = await userObj.save();
	res.json({status: true, user})
})

module.exports = router;
