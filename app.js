const express=require('express')
const app=express()
const cors = require("cors");
const routes =require('./routes')
const db=require('./models')



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
routes(app)
const PORT = 8000;



db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
})
.catch((err) => {
    console.log("Failed to sync db: " + err.message);
})
    

db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});







app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

