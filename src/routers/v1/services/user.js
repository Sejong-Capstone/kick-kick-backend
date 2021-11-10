
const { CustomErrors } = require('../../../common');
const model = require('../../../models');
const { user } = model;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const salt = 10
const jwtTokenKey = 'abcdefghijklmnopqrstuvwxyz1234567890';

const user_services = {
  attributes: {
    include: [
      'userId',
      'email',
      'name',
    ],
    exclude: [
      'password',
      'token' 
    ]
  },
  findAll: async () => {
    try {
      const rows = await user.findAll({ 
        attributes: user_services.attributes,
      });

      return rows;
    } catch (err) {
      throw new CustomErrors.ConflictError(err);
    }
  },
  login: async ({ userId, password }) => {
    try {
      const userData = await user.findOne({
        where: {
          userId
        }
      })

      if (userData.length == 0) {
        throw new Error('없는 유저입니다.');
      }

      const isValid = await bcrypt.compareSync(password, userData.password);
      
      if (isValid) {
        const token = jwt.sign({ userId: userData.userId  }, jwtTokenKey)
        await user.update({
          token
        },
        {
          where: {
            userId: userData.userId
          }
        })
        return token;
      }
      
      throw new Error('비밀번호가 틀립니다.');
    } catch (e) {
      throw new Error('Signup Error:' + e.toString());
    }
  },
  signup: async ({ userId, name, password, email }) => {
    try {
      const hashedPw = await bcrypt.hash(password, salt);
      
      await user.create({
        userId, name, password: hashedPw, email 
      })
    } catch (e) {
      throw new Error('Signup Error:' + e.toString());
    }

    return { success: true }
  },
  logout: async ({ id }) => {
    try {
      await user.update({
        token: ''
      }, {
        where: {
          id
        }
      })
      return { success: true };
    } catch (e) {
      throw new Error('user:logout Error:' + e.toString());
    }
  },
  getPkFromToken: async ({ token }) => {
    try {
      const userData = await user.findOne({
        where: {
          token
        }
      })
      if (userData) {
        return userData.id;
      } else {
        throw new Error('Token Invalid');
      }
    } catch (e) {
      throw new Error('getUserIdFromToken Error:' + e.toString());
    }
  },
  me: async ({ id }) => {
    try {
      const userData = await user.findOne({
        where: {
          id
        },
        attributes: user_services.attributes,
      }, )
      if (userData) {
        return userData;
      } else {
        throw new Error('No User Detected');
      }
    } catch (e) {
      throw new Error('user:me Error:' + e.toString());
    }
  }
}

module.exports = user_services;