const db = require('../mysql');
const Sequelize = db.connection;
const userinfo = Sequelize.import('../schema/userinfo.js');
const moment = require('moment');
userinfo.sync({force:false});

class userInfoModel {
    // 添加用户
    static async createUser(data) {
        return await userinfo.create({
            userName: data.userName,
            password: data.password,
            realName: data.realName || null,
            idcard: data.idcard || null,
            sex: data.sex || null,
            birth: data.birth || null,
            role: data.role,
            createTime: moment().unix(),
        });
    }
    // 查询用户
    static async getUser(data) {
        return await userinfo.findOne({
            where: data
        });
    }
    // 删除用户
    static async delUser(id) {
        return await userinfo.destroy({
            where: {id: id}
        });
    }
    // 修改用户信息
    static async updateUser(data) {
        return await userinfo.update({
            userName: data.userName,
            password: data.password,
            realName: data.realName,
            idcard: data.idcard,
            sex: data.sex,
            birth: data.birth,
            role: data.role,
            createTime: data.createTime,
        });
    }
}
module.exports = userInfoModel;