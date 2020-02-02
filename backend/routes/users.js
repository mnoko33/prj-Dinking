var express = require('express');
var router = express.Router();
const User = require('../model/user')
const makeRes = require('../makeRes');

// find all user
router.get('/', function (req, res, next) {
	User.find(function (err, users) {
		if (err) {
			return res.json({
				"status": false,
				"err": err
			})
		}
		return res.json({
			"status": true,
			"users": users
		})
	});
})


// find user by ID
router.get('/:id', function (req, res, next) {
	User.findById(req.params.id, function (err, user) {
		if (err) {
			return res.json({
				"status": false,
				"err": err
			})
		}
		return res.json({
			"status": true,
			"user": user
		})
	})
})

module.exports = router;
