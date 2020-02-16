import UserModel from '../models/user';
import ProblemModel from '../models/problem';
import RankModel from '../models/rank'

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
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
        Promise.all(promises);
        return true
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
    
                const result = await dummy.save();
                resolve(result)
            })
        })
        Promise.all(promises)
        res.json({"result": "good"})
    }   
}