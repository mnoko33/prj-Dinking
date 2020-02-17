var express = require('express');
var router = express.Router();
const UserService = require('../../services/UserService')

// find all user
router.get('/', async function (req, res, next) {
	const users = await UserService.getAllUsers()
	res.json({ users })
})

// find user by ID
router.get('/:id', async (req, res, next) => {
	const uid = req.params.id;
	const user = await UserService.getUserById(uid);
	res.json({ user })
})

// update user problem_set
router.patch('/:id/BOJ_problem_set', async (req, res, next) => {
	const uid = req.params.id;
	const pids = req.body.problemList; // TODO: frontend 수정 필요
	const user = await UserService.updateBOJ(uid,pids);
	res.json({ user })
})

router.get('/rank/:idx/:cnt', async (req, res, next) => {
	const cnt = req.params.cnt * 1 // how many
	const idx = req.params.idx * 1 // start index
	const userList = await UserService.getUserListSortedByScore(idx, cnt);
	res.json({ userList })
})


module.exports = router;
