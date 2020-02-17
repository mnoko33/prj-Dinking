import ProblemModel from '../models/problem';

module.exports = {
    getAllProblems: async () => {
        const problems = await ProblemModel.find();
        return problems
    },
    getProblemsByCondition: async (type, content) => {
        if (type === "pb_id") {
            return await ProblemModel.find({ pb_id: content })
        }
        if (type === "pb_name") {
            // if (content.length <= 2) {
            return await ProblemModel.find({ pb_name: content })
            // } else {
            //     const param = {}
            //     const a = `\\${content}`
            //     console.log(`\\${content}`)
            //     param[type] = new RegExp(a, "g");
            //     console.log(param)
            //     return await ProblemModel.find(param)
            // }
            
        }
    }
}