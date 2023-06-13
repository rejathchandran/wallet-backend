
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      username: {
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        type: Sequelize.STRING
      },
      role:{
        type:Sequelize.INTEGER,
        defaultValue: 0,
      }
    }
   
    );
  
    return User;
  
  };