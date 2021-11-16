
const { CustomErrors } = require('../../../common');
const model = require('../../../models');
const { detected_image } = model;

const detect_services = {
  attributes: {
    include: [
      'isDetected',
      'image'
    ],
    exclude: [
      'fk_user_id',
      'fk_camera_id'
    ]
  },
  findAll: async (where={}) => {
    try {
      const rows = await detected_image.findAll({
        where,
        attributes: detect_services.attributes,
      });
      
      return rows;
    } catch (err) {
      throw new CustomErrors.ConflictError(err);
    }
  },
  find: async () => {
    try {
      const rows = await detected_image.findOne({ 
        attributes: detect_services.attributes,
      });

      return rows;
    } catch (err) {
      throw new CustomErrors.ConflictError(err);
    }
  },
  create: async ({ fk_user_id, fk_camera_id, isDetected, image }) => {
    try {
      const rows = await detected_image.create({ 
        fk_user_id, fk_camera_id, isDetected, image
      });

      return rows;
    } catch (err) {
      throw new CustomErrors.ConflictError(err);
    }
  },
  update: async ({ detected_image_id, fk_user_id, isDetected, image }) => {
    try {
      await detected_image.update({ 
        isDetected, image
      }, {
        where: {
          id: detected_image_id,
          fk_user_id: fk_user_id
        }
      });

      return true;
    } catch (err) {
      throw new CustomErrors.ConflictError(err);
    }
  },
  delete: async ({ detected_image_id, fk_user_id }) => {
    try {
      await detected_image.destroy({
        where: {
          id: detected_image_id,
          fk_user_id
        }
      });

      return true;
    } catch (err) {
      throw new CustomErrors.ConflictError(err);
    }
  },
  detectAndCreate: async ({ fk_user_id, fk_camera_id, image }) => {
    try {
      // Detect Login Will be Added

      await detected_image.create({
        fk_user_id, fk_camera_id, image, isDetected: true
      });

      return true;
    } catch (err) {
      throw new CustomErrors.ConflictError(err);
    }
  }
}

module.exports = detect_services;