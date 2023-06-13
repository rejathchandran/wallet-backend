var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const db=require("../models")
const User=db.User
const Wallet=db.wallet
const config=require("../auth.config")

Register=(req, res) => {
    User.create({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 8)
    }).
    then(async(user)=>{
        const w= await Wallet.create({ amout: 100 });
        user.userwalletId=w.id
        user.save()
        res.send({ message: "User registered successfully!" });
    }).
    catch(err => {
        res.status(500).send({ message: err.message });
    })
}



Login=(req, res) => {

    User.findOne({
        where: {
          username: req.body.username
        }
    })
    .then(user => {
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
          }
        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
          )


        if (!passwordIsValid) {
            return res.status(401).send({
              message: "Invalid Password!"
            });
        }

        let token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 
        })

        res.status(200).send({
            id: user.id,
            username: user.username,
            roles: user.role,
            accessToken: token
          })

    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    })
   

}



module.exports={
    
    Register,
    Login
  }