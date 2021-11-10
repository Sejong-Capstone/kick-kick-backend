
module.exports = (sequelize, Sequelize) => {
  const camera =  sequelize.define('camera', {
    fk_user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      },
    },
    cameraName: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    isConnected: {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: true,
    },
    location: {
      type: Sequelize.STRING(200),
      allowNull: true,
    }
  }, {
    timestamps: true,
    paranoid: true,
    tableName: 'camera'
  })
  
  return camera;
};
