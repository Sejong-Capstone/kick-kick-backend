module.exports = (sequelize, Sequelize) => {
  const user =  sequelize.define('user', {
    userId: {
      type: Sequelize.STRING(50),
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING(500),
      allowNull: false
    },
    email: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(20),
      allowNull: false,
      unique: true
    },
    token: {
      type: Sequelize.STRING(200),
      allowNull: true,
      unique: true
    }
  }, {
    timestamps: true,
    paranoid: true,
    tableName: 'user'
  })
  
  return user;
};
