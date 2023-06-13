module.exports = (sequelize, Sequelize) => {
    const wallet = sequelize.define("userwallet", {
      amout: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      }
    });
  
    return wallet;
  };