
const { CustomErrors } = require('../../../common');
const model = require('../../../models');
const { camera } = model;

const camera_services = {
  attributes: {
    include: [
      'fk_user_id',
      'cameraName',
      'isConnected',
      'location'
    ],
    exclude: [
      'fk_user_id'
    ]
  },
  findAll: async (where={}) => {
    try {
      const rows = await camera.findAll({
        where,
        attributes: camera_services.attributes,
      });
      console.log(where);
      return rows;
    } catch (err) {
      throw new CustomErrors.ConflictError(err);
    }
  },
  find: async () => {
    try {
      const rows = await camera.findOne({ 
        attributes: camera_services.attributes,
      });

      return rows;
    } catch (err) {
      throw new CustomErrors.ConflictError(err);
    }
  },
  create: async ({ cameraName, location, fk_user_id, isConnected=false }) => {
    try {
      const rows = await camera.create({ 
        cameraName, location, fk_user_id, isConnected
      });

      return rows;
    } catch (err) {
      throw new CustomErrors.ConflictError(err);
    }
  },
  update: async ({ cameraId, cameraName, location, fk_user_id, isConnected=false }) => {
    try {
      await camera.update({ 
        cameraName, location, isConnected
      }, {
        where: {
          id: cameraId,
          fk_user_id: fk_user_id
        }
      });

      return true;
    } catch (err) {
      throw new CustomErrors.ConflictError(err);
    }
  },
  delete: async ({ id, fk_user_id }) => {
    try {
      await camera.destroy({
        where: {
          id,
          fk_user_id
        }
      });

      return true;
    } catch (err) {
      throw new CustomErrors.ConflictError(err);
    }
  },
  filterByUserId: async ({ fk_user_id }) => {
    try {
      const rows = await camera_services.findAll({
        fk_user_id
      });

      return rows;
    } catch (err) {
      throw new CustomErrors.ConflictError(err);
    }
  }
}

module.exports = camera_services;