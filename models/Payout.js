module.exports = (sequelize, Sequelize) => {
    const Payout = sequelize.define("Payout", {
      status: {
        type: Sequelize.STRING,
        defaultValue: "pending",
      },
      amount:{
        type:Sequelize.INTEGER,
      }
    })
  
    return Payout;
  };