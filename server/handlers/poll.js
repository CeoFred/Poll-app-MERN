//handlers
const db = require('../models/index');

exports.polls = async (req,res,next) => {
    try {
        const polls = await db.Poll.find();

        res.status(200).json(polls);
    } catch (error) {
        error.status = 400;
        next(error);
    };
};
exports.createPoll = async (req,res,next) => {
    try {
     const {question,options} = req.body;

        const poll=  await db.Poll.create({
            question,
            options:options.map(optionS => ({
                option:optionS,votes:0
            }))
        });
     
     res.status(201).json(poll);

    } catch (error) {
     error.status = 400;
     next(error);   
    }
}