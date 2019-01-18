const db = require("../models/index");
const jwt = require('jsonwebtoken');

module.exports.register =  async (req, res, next) => {
  try {
      console.log('body details',req.body);
    const user = await db.User.create(req.body);
    const {id,username} = {user};
    const token = jwt.sign({id,username},process.env.SECRET)
    res.status(200).json(id,
        username,
        token);
    
  } catch (error) {
      if(err.code === 11000){
          err.message = 'Sorry username is already taken';
      }
     next(error);
  }

};

module.exports.login = async (req, res, next) => {
  try {
      const user = await db.User.findOne({username:req.body.username});
      const {id,username } = user;
      const valid = await user.comparePassword(req.body.pass);
      if(valid){
    const token = jwt.sign({id:username},process.env.SECRET)

          res.json({
              id,
              username,
              token
          });
      }else{
          throw new Error('Wrong username and password');
      }
  } catch (e) {
      err.message = 'Invalid Username/Password'
    // next(e)
  }
};


module.exports.notFound = ((req,res,next) => {
    const err = new Error('Not found');
    err.status =  404;
    next(err);
});

module.exports.errorHandler = (err,req,res,next) => {
    res.status(err.status || 400).json({
        err: err.message || 'Something went wrong'
    });
};