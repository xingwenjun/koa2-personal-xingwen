const db = require('../mysql');
const Sequelize = db.connection;
const userinfo = Sequelize.import('../schema/userinfo.js');

class loginModel {
    static login(ctx) {
        let req = ctx.request.body
        const userName = req.userName
        if (userName && req.password) {
            try {
                const tableUser = userinfo.findOne({where: {userName: userName}});
                console.log(tableUser)
                ctx.response.status = 200
                ctx.body = {
                    code: 200,
                    message: '登录成功',
                    data: tableUser
                }
            } catch (error) {
                ctx.response.status = 500
                ctx.body = {
                    code: 500,
                    message: '登录失败',
                    data: error
                }
            }
        } else {
            ctx.response.status = 400
            ctx.body = {
                code: 400,
                message: userName? '请输入密码':'请输入账户'
            }
        }
    }
}

module.exports = {
    'POST /login': loginModel.login
}