const db=require("../models")
const User=db.User
const payout=db.payout
const Wallet=db.wallet

const PayoutRequest=(req,res)=>{
    User.findByPk(req.userId).then(user=>{
        Wallet.findOne({
            where: {
              id: user.userwalletId
            }
          }).then(async(w)=>{
            let amount=req.body.amount
            if(w.amout>=parseInt(amount)){
                const am = await payout.create({ amount:amount,userId:user.id})
                w.amout=w.amout-amount
                w.save()
                res.status(200).send({
                    message: "request submited sucess"
                  })
            }
            else{
                res.status(204).send({
                    message: "withdraw amount less than wallet amount"
                  })
            }
            
          })
    })

}


const GetPayout=(req,res)=>{

payout.findAll({
    where: {
        userId: req.userId
    },
  raw: true,
  nest: true,
  }).
  then(i=>res.json(i))
    
}


module.exports={
    PayoutRequest,
    GetPayout
}