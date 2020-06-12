const db = require('../mysql');
const sequelize = db.sequelize;
const userinfo = sequelize.import('../sechema/userinfo');
userinfo.sync({force:false});

class userInfoModel {
    // 添加用户
    static async createUser(data) {
        return await userinfo.create({
            userName: data.userName,
            password: data.password,
            realName: data.realName,
            sex: data.sex,
            birth: data.birth,
            role: data.role,
            createTime: data.createTime,
        });
    }
    // 查询用户
    static async getUserInfo(id) {
        return await userinfo.findOne({
            where: {id}
        });
    }
    // 删除用户
    static async deleteUserInfo(id) {
        return await userinfo.destroy({
            where: {id}
        });
    }
    // 修改用户信息
    static async updateUserInfo(data) {
        return await userinfo.update({
            userName: data.userName,
            password: data.password,
            realName: data.realName,
            sex: data.sex,
            birth: data.birth,
            role: data.role,
            createTime: data.createTime,
        });
    }
}
module.exports = userInfoModel;