const db = require("../models/index");

exports.register = async (req, res, next) => {
  try {
    const user = await db.User.create({
        username:"fred",
        password:"messilo18"
    });
    res.status(201).json(user);
    
  } catch (error) {
     next(error);
  }
};

exports.login = (req, res, next) => {
  try {
  } catch (e) {
    // next(e)
  }
};
