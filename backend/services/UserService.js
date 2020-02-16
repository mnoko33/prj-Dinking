import UserModel from '../models/user'
import ProblemMode from '../models/problem'

// 가중치 공식 (Weighting Formular)
const WF = (difficulty, score, continuous) => {
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

module.exports = {
    // find user by Id
    findUserById: async (uid) => {
        try { 
            const user = await UserModel.findById(uid) 
        }
        catch(err) {
            console.log(err)
        }
        return user
    },

    // find all user
    findAllUsers: async () => {
        try {
            const users = await UserModel.find();
        }
        catch (err) {
            console.log(err)
        }
        return users
    },

    // update BOJ problem_set
    updateBOJ: async(uid, pids) => {
        const userDoc = await UserModel.findById(uid);
        pids.forEach(async pid => {
            const problemDoc = await ProblemModel.findById(pid);
            userDoc.score += WF(problemDoc.pb_difficulty, problemDoc.pb_score, userDoc.continuous)
            userDoc.boj_problem_set.push(problemDoc);
        })
        
        let nextRankDoc

        while (userDoc.score >= userDoc.threshold) {
            nextRankDoc = await Rank.findById(userDoc.nextRank);
            userDoc.threshold = nextRankDoc.threshold;
            userDoc.nextRank = nextRankDoc.nextRank;
        }
        if (nextRankDoc) {
            userDoc.rank = nextRankDoc.rankName;
            userDoc.rank_history.push({
                date: new Date(),
                rank: userDoc.rank
            })
        }

        return await userDoc.save();
    }

}