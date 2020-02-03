const express = require('express');
const router = express.Router();
const Rank = require('../model/rank');

// create rank sys
router.post('/', async function(req, res, next) {
    let rank_name = ["Unranked", "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Professional", "Expert", "GOD"]
    let rank_img = [
        "https://image.flaticon.com/icons/svg/455/455723.svg", // unranked
        "https://image.flaticon.com/icons/svg/695/695123.svg",  // bronze 
        "https://image.flaticon.com/icons/svg/522/522404.svg",  // silver
        "https://image.flaticon.com/icons/svg/1435/1435691.svg", // gold
        "https://image.flaticon.com/icons/svg/1949/1949682.svg", // platinum
        "https://image.flaticon.com/icons/svg/1144/1144441.svg", // diamond
        "https://image.flaticon.com/icons/svg/2331/2331795.svg", // pro
        "https://www.flaticon.com/premium-icon/icons/svg/1610/1610459.svg", // expret
        "https://image.flaticon.com/icons/svg/1197/1197953.svg", // GOD
    ];
    let rank_threshold = [1, 200, 500, 1000, 10000, 20000, 50000, 100000, Number.MAX_SAFE_INTEGER]

    for (let i = 0; i <9; i++) {
        (function(j) {
            Rank.create({
                rankName: rank_name[j],
                rankImg: rank_img[j],
                threshold: rank_threshold[j]
            })
        })(i)
    }
    const rankList = await Rank.find(function(err, res) {
        return res
    })
    
    // set next Rank
    for (let i; i < 9; i++) {
        (async function(j) {
            const rankId = rankList[j]._id;
            if (j < 8) {
                rank = await Rank.findById({rankId})
                rank.nextRank = rankList[j+1]._id;
            }
        })(i);
    }
    
    return res.json(await Rank.find(function(err, res) {
        return res
    }))
})

module.exports = router;