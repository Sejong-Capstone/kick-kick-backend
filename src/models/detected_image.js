
module.exports = (sequelize, Sequelize) => {
  const detected_image =  sequelize.define('detected_image', {
    fk_user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      },
    },
    fk_camera_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'camera',
        key: 'id'
      },
    },
    isDetected: {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: true,
    }
  }, {
    timestamps: true,
    paranoid: true,
    tableName: 'detected_image'
  })
  
  return detected_image;
};
