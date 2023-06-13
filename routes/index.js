const {Register,Login}=require('./../controller/user')
const {Mywallet}=require('../controller/wallet')
const verifyToken=require("../middleware/authjwt")
const { PayoutRequest,GetPayout}=require('../controller/payouts')
const {isAdmin}=require("../middleware/verify")

module.exports=(app)=>{

  app.use(function(req, res, next){
    res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept");
    next();
    })


    app.post("/reg", Register)
    app.post('/log',Login)
    app.get("/test",[verifyToken,isAdmin],(req,res)=>{res.send("working")})
    app.get("/mywallet",[verifyToken],Mywallet)
    app.post("/payout",[verifyToken],PayoutRequest)
    app.get("/payout",[verifyToken],GetPayout)

}
