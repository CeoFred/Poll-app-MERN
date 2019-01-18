const db = require("../models/index");

module.exports.register =  async (req, res, next) => {
  try {
      console.log('body details',req.body);
    const user = await db.User.create(req.body);

    res.status(200).json(user);
    
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
          res.json({
              id,
              username
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