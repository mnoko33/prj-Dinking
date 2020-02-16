// const express = require('express');
// const router = express.Router();
// const Rank = require('../models/rank');

// // create rank sys
// router.post('/create', async function(req, res, next) {
//     const rank_name = ["Unranked", "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Professional", "Expert", "GOD"]
//     const rank_img = [
//         "https://image.flaticon.com/icons/svg/455/455723.svg", // unranked
//         "https://image.flaticon.com/icons/svg/695/695123.svg",  // bronze 
//         "https://image.flaticon.com/icons/svg/522/522404.svg",  // silver
//         "https://image.flaticon.com/icons/svg/1435/1435691.svg", // gold
//         "https://image.flaticon.com/icons/svg/1949/1949682.svg", // platinum
//         "https://image.flaticon.com/icons/svg/1144/1144441.svg", // diamond
//         "https://image.flaticon.com/icons/svg/2331/2331795.svg", // pro
//         "https://www.flaticon.com/premium-icon/icons/svg/1610/1610459.svg", // expret
//         "https://image.flaticon.com/icons/svg/1197/1197953.svg", // GOD
//     ];
//     const rank_threshold = [1, 200, 500, 1000, 10000, 20000, 50000, 100000, Number.MAX_SAFE_INTEGER]

//     const ranks = []

//     for (let i = 0; i <9; i++) {
//         ranks.push(new Promise((resolve, reject) => {
//             resolve(Rank.create({
//                 rankName: rank_name[i],
//                 rankImg: rank_img[i],
//                 threshold: rank_threshold[i]
//             }))
//         }))
//     }

//     Promise.all(ranks);

//     return res.json(await Rank.find(function(err, res) {
//         return res
//     }))
// })

// router.post('/setNextRank', async function(req,res,next) {
//     const rank_name = ["Unranked", "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Professional", "Expert", "GOD"]
//     const unranked = await Rank.findOne({rankName: "Unranked"})
//     const Bronze = await Rank.findOne({rankName: "Bronze"})
//     const Silver = await Rank.findOne({rankName: "Silver"})
//     const Gold = await Rank.findOne({rankName: "Gold"})
//     const Platinum = await Rank.findOne({rankName: "Platinum"})
//     const Diamond = await Rank.findOne({rankName: "Diamond"})
//     const Professional = await Rank.findOne({rankName: "Professional"})
//     const Expert = await Rank.findOne({rankName: "Expert"})
//     const GOD = await Rank.findOne({rankName: "GOD"})
//     unranked.nextRank = Bronze._id
//     Bronze.nextRank = Silver._id
//     Silver.nextRank = Gold._id
//     Gold.nextRank = Platinum._id
//     Platinum.nextRank = Diamond._id
//     Diamond.nextRank = Professional._id
//     Professional.nextRank = Expert._id
//     Expert.nextRank = GOD._id
//     GOD.nextRank = null
//     await unranked.save()
//     await Bronze.save()
//     await Silver.save()
//     await Gold.save()
//     await Platinum.save()
//     await Diamond.save()
//     await Professional.save()
//     await Expert.save()
//     await GOD.save()

//     return res.json(await Rank.find(function(err, res) {
//         return res
//     }))
// })

// module.exports = router;