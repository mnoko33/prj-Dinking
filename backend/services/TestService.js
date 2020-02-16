import UserModel from '../models/user';
import ProblemModel from '../models/problem';
import RankModel from '../models/rank'
import fs from 'fs';

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

function get_diff_and_score(pbtcnt, pbsrate) {
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

module.exports = {
    createDummyUsers: async (start, end) => {
        const promises = []
        for (let i = start; i < end+1; i++) {
            const promise = new Promise((resolve, reject) => {
                const userDoc = new UserModel({
                    email: `test${i}@naver.com`,
                    password: "qwer1234",
                    nickName: `test${i}`,
                    nextRank: "5e382d0e82d5ff0718d6339d"
                })
                resolve(userDoc.save())
            })
            promises.push(promise)
        }
        const dummyUsers = Promise.all(promises);
        return dummyUsers
    },

    updateBOJ: async (cnt) => {
        const dummys = await UserModel.find({ nickName: /test/ })
        const problemDocs = await ProblemModel.find();
        const promises = dummys.map(dummy => {
            return new Promise(async(resolve) => {
                for (let i =0; i<cnt;i++) {
                    const idx = getRandomInt(8000,10000);
                    const problemDoc = problemDocs[idx]
                    dummy.score += WF(problemDoc.pb_difficulty, problemDoc.pb_score, dummy.continuous)
                    dummy.boj_problem_set.push(problemDoc);
                }
                let nextRankDoc
                while (userDoc.score >= userDoc.threshold) {
                    nextRankDoc = await RankModel.findById(dummy.nextRank);
                    dummy.threshold = nextRankDoc.threshold;
                    dummy.nextRank = nextRankDoc.nextRank;
                }
                if (nextRankDoc) {
                    dummy.rank = nextRankDoc.rankName;
                    dummy.rank_history.push({
                        date: new Date(),
                        rank: userDoc.rank
                    })
                }
                const dummyUser = await dummy.save();
                resolve(dummyUser)
            })
        })
        const dummyUsers = Promise.all(promises)
        return dummyUsers
    },

    // create rank system
    createRankSys: () => {
        const rank_name = ["Unranked", "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Professional", "Expert", "GOD"]
        const rank_img = [
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
        const rank_threshold = [1, 200, 500, 1000, 10000, 20000, 50000, 100000, Number.MAX_SAFE_INTEGER]
        const ranks = []
        for (let i = 0; i <9; i++) {
            ranks.push(new Promise((resolve, reject) => {
                resolve(RankModel.create({
                    rankName: rank_name[i],
                    rankImg: rank_img[i],
                    threshold: rank_threshold[i]
                }))
            }))
        }
        Promise.all(ranks);
        return true
    },

    // set next rank
    // TODO: reafactorying with Array.map function
    setNextRank: async () => {
        const rank_name = ["Unranked", "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Professional", "Expert", "GOD"]
        const unranked = await RankModel.findOne({rankName: "Unranked"})
        const Bronze = await RankModel.findOne({rankName: "Bronze"})
        const Silver = await RankModel.findOne({rankName: "Silver"})
        const Gold = await RankModel.findOne({rankName: "Gold"})
        const Platinum = await RankModel.findOne({rankName: "Platinum"})
        const Diamond = await RankModel.findOne({rankName: "Diamond"})
        const Professional = await RankModel.findOne({rankName: "Professional"})
        const Expert = await RankModel.findOne({rankName: "Expert"})
        const GOD = await RankModel.findOne({rankName: "GOD"})

        unranked.nextRank = Bronze._id
        Bronze.nextRank = Silver._id
        Silver.nextRank = Gold._id
        Gold.nextRank = Platinum._id
        Platinum.nextRank = Diamond._id
        Diamond.nextRank = Professional._id
        Professional.nextRank = Expert._id
        Expert.nextRank = GOD._id
        GOD.nextRank = null

        await unranked.save()
        await Bronze.save()
        await Silver.save()
        await Gold.save()
        await Platinum.save()
        await Diamond.save()
        await Professional.save()
        await Expert.save()
        await GOD.save()

        return true
    },

    csv2DB: async () => {
        fs.readFile('../backjoon.csv', 'utf8', function (err, data) {
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
                    await ProblemModel.create({ pb_id, pb_name, pb_trial_cnt, pb_success_cnt, pb_difficulty, pb_score, pb_source })
                } catch (err) {
                    console.log(err)
                }
            })
        });
        return true
    }
}