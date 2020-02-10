const express = require('express');
const router = express.Router();
const Problem = require('../model/problem');
const fs = require('fs');

const get_diff_and_score = function (pbtcnt, pbsrate) {
    if (pbtcnt < 1000) {
        return { "pb_difficulty": "Lack Of Sample", "pb_score": 100 - pbsrate }
    }
    if (pbsrate > 90) {
        return { "pb_difficulty": "Practice", "pb_score": 5 }
    }
    if (pbsrate > 70) {
        return { "pb_difficulty": "Very Easy", "pb_score": 10 }
    }
    if (pbsrate > 50) {
        return { "pb_difficulty": "Easy", "pb_score": 100 }
    }
    if (pbsrate > 35) {
        return { "pb_difficulty": "normal", "pb_score": 300 }
    }
    if (pbsrate > 20) {
        return { "pb_difficulty": "Hard", "pb_score": 1000 }
    }
    if (pbsrate > 5) {
        return { "pb_difficulty": "Very Hard", "pb_score": 5000 }
    }
    return { "pb_difficulty": "Hell", "pb_score": 50000 }
}

// insert data into DB
router.post('/', async function (req, res, next) {
    fs.readFile('./backjoon.csv', 'utf8', function (err, data) {
        let dataArray = data.split(/\r?\n/);
        dataArray.forEach(async data => {
            data = data[0] == `"` ? data.slice(1, -1) : data
            data = data.split(':::')
            const pb_id = data[0] * 1
            const pb_name = data[1]
            const pb_trial_cnt = data[2] * 1
            const pb_success_cnt = data[3] * 1
            const pb_success_rate = (data[4].slice(0, -1)) * 1
            const { pb_difficulty, pb_score } = get_diff_and_score(pb_trial_cnt, pb_success_rate);
            const pb_source = "BOJ"
            try {
                await Problem.create({ pb_id, pb_name, pb_trial_cnt, pb_success_cnt, pb_difficulty, pb_score, pb_source })
            } catch (err) {
                console.log(err)
            }
        })
    });
    res.json({
        "status": true
    })
})

// 모든 문제
router.get('/', async function (req, res, next) {
    Problem.find(function (err, problems) {
        if (err) {
            res.json({ status: false, err })
        } else {
            res.json({ status: true, problems })
        }
    })
})

// 문제 찾기
router.get('/:type/:content', async function (req, res, next) {
    try {
        const type = req.params.type;
        const content = req.params.content;
        const problem = type === "pb_id" ? await Problem.find({ pb_id: content }) : await Problem.find({ pb_name: content });
        res.json({ status: true, problem })
    } catch (err) {
        res.json({ status: false, err })
    }
})

module.exports = router;