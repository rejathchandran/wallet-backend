const db=require("../models")
const User=db.User
const Wallet=db.wallet


const Mywallet=(req, res) => {
    User.findByPk(req.userId).then(user=>{
        Wallet.findOne({
            where: {
              id: user.userwalletId
            }
          }).then(w=>{
            res.send({
                amount:w.amout
            })
          })
    })
}



module.exports={
    Mywallet
}