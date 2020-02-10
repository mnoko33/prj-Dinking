var express = require('express');
var router = express.Router();
const User = require('../model/user');
const Problem = require('../model/problem');
const Rank = require('../model/rank');

// 가중치 공식 (Weighting Formular)
const WF = (difficulty, continuous, score) => {
	switch (difficulty) {
		case "Lack of Sample":
			if (continuous < 30) return score + score * continuous / 100
			else return score + 100
		case "Practice":
			if (continuous < 5) return score + 1
			if (continuous < 10) return score + 3
			if (continuous < 30) return score + 5
			else return score + 10
		case "Very Easy":
			if (continuous < 5) return score + 1
			if (continuous < 10) return score + 3
			if (continuous < 30) return score + 5
			else return score + 10
		case "Easy":
			if (continuous < 5) return score + continuous
			if (continuous < 10) return score + 10 * continuous
			if (continuous < 30) return score + 150
			else return score + 200
		case "Normal":
			if (continuous < 5) return score + score * continuous * 0.1
			if (continuous < 10) return score + score * continuous * 0.1
			if (continuous < 30) return score + score * continuous * 0.1
			else return score + score * c * 0.01
		case "Hard":
			if (continuous < 5) return score * 1.1
			if (continuous < 10) return score * 1.5
			if (continuous < 30) return score * 2
			else return score * 3
		case "Very Hard":
			if (continuous < 5) return score * 1.1
			if (continuous < 10) return score * 1.5
			if (continuous < 30) return score * 2
			else return score * 3
		case "Hell":
			if (continuous < 5) return score * 1.1
			if (continuous < 10) return score * 1.5
			if (continuous < 30) return score * 2
			else return score * 3
		default:
			return score
	}
}



// find all user
router.get('/', function (req, res, next) {
	User.find(function (err, users) {
		if (err) {
			return res.json({ status: false, err })
		}
		return res.json({ status: true, users })
	});
})

// find user by ID
router.get('/:id', function (req, res, next) {
	User.findById(req.params.id, function (err, user) {
		if (err) {
			return res.json({ status: false, err })
		}
		return res.json({ status: true, user })
	})
})

// update problem_set 
router.patch('/boj_problem_set', async function (req, res, next) {
	const problemId = req.body.id;
	const userId = req.body.userId;
	// 문제가 여러 개 추가라면 ???
	const problemObj = await Problem.findById(problemId);
	const userObj = await User.findById(userId);
	userObj.boj_problem_set.push(problemObj);
	userObj.score += WF(problemObj.difficulty, problemObj.pb_score, userObj.continuous)
	let nextRankObj
	while (userObj.score < userObj.threshold) {
		nextRankObj = await Rank.findById(userObj.nextRank);
		userObj.threshold = nextRankObj.threshold;
		userObj.nextRank = nextRankObj.nextRank;
	}
	if (nextRankObj) {
		userObj.rank = nextRankObj.rankName;
		userObj.rank_history.push({
			date: new Date(),
			rank: userObj.rankName
		})
	}

	const user = await userObj.save();
	res.json({ status: true, user })
})

// problem_set
router.patch('/boj_problem_set', async function (req, res, next) {
	const problem_set = req.body.problem_set;
	const userId = req.body.userId;
	// 문제가 여러 개 추가라면 ???
	const problemObj = await Problem.findById(problemId);
	const userObj = await User.findById(userId);
	problem_set.forEach(problem => {
		const problemObj = await Problem.findById(problemId);

	})
	userObj.boj_problem_set.push(problemObj);
	userObj.score += WF(problemObj.difficulty, problemObj.pb_score, userObj.continuous)
	let nextRankObj
	while (userObj.score < userObj.threshold) {
		nextRankObj = await Rank.findById(userObj.nextRank);
		userObj.threshold = nextRankObj.threshold;
		userObj.nextRank = nextRankObj.nextRank;
	}
	if (nextRankObj) {
		userObj.rank = nextRankObj.rankName;
		userObj.rank_history.push({
			date: new Date(),
			rank: userObj.rankName
		})
	}

	const user = await userObj.save();
	res.json({ status: true, user })
})



module.exports = router;
