const Sequelize = require("sequelize");

const db = {};

const sequelize = new Sequelize(
   'wallet',
   'root',
   'root',
    {
      host: 'localhost',
      dialect: 'mysql'
    }
  );

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./User")(sequelize, Sequelize);
db.wallet=require('./Wallet')(sequelize, Sequelize);
db.payout=require('./Payout')(sequelize,Sequelize)
db.User.belongsTo(db.wallet)
db.payout.belongsTo(db.User)

module.exports = db;