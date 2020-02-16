import ProblemModel from '../models/problem';

module.exports = {
    getAllProblems: () => {
        const problems = await ProblemModel.find();
        return problems
    },
    getProblemsByCondition: async (type, content) => {
        if (type === "pb_id") {
            return await ProblemModel.find({ pb_id: content })
        }
        if (type === "pb_name") {
            return await ProblemModel.find({ pb_name: content })
        }
    }
}