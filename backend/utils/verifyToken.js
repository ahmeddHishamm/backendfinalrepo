
const jwt= require("jsonwebtoken");
const  {createError} = require( "./error");
  const verifyToken = (req,res,next)=>{
     const token = req.cookies.access_token;
     if(!token){
         return next(createError(401, "You are not authenticated"))
     }

     jwt.verify(token,process.env.JWT_SECRET, (err, user)=>{
         if (err) return next(createError(403, "invalid Token"));

         req.user= user;
         next()
     });
 };

  const verifyUser = (req,res,next)=>{
      verifyToken(req,res,next, ()=> {
          if (req.user.id === req.params.id || req.user.isAdmin){
              next()
          }else {
              if (err) return next(createError(403,"Token is not valid"));
          }
      })
  }

const verifyAdmin = (req,res,next)=>{
    verifyToken(req,res,next, ()=> {
        if (req.user.isAdmin){
            next()
        }else {
            if (err) return next(createError(403,"Token is not valid"));
        }
    })
}


  module.exports = {
      verifyToken,
      verifyUser,
      verifyAdmin
  }