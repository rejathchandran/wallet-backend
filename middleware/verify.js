const db=require("../models")
const User=db.User


checkUsername = (req, res, next) => {
    User.findOne({
      where: {
        username: req.body.username
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Username is already in use!"
        })
        return;
      } 
      next();
      });

  }

  

isAdmin=(req, res, next)=>{
  User.findByPk(req.userId).then(user => {
    if(!user){
      res.status(404).send({
        message:"invalid Credentails"
      })
    }
    else{
      if(user.role===0){
        res.status(401).send({
          message: "NOT ADMIN USER"
        })
        return;
      }
    }
    next()
  })
        
}


const isTokenExpired=(token)=> {
  const payloadBase64 = token.split('.')[1];
  const decodedJson = Buffer.from(payloadBase64, 'base64').toString();
  const decoded = JSON.parse(decodedJson)
  const exp = decoded.exp;
  const expired = (Date.now() >= exp * 1000)
  return expired
}

module.exports={
    isAdmin,
    checkUsername
}