const userInfoModel =  require('../modules/userinfo');

class loginController {
    static async login(ctx) {
        let req = ctx.request.body
        if (req.userName && req.password) {
            try {
                const tableUser = await userInfoModel.getUser({userName: req.userName});
                const flag = tableUser && (tableUser['password'] === req.password) || false;
                ctx.response.status = 200;
                ctx.body = {
                    code: flag ? 200:10001,
                    message: flag ? '登录成功':'账号或密码有误'
                }
                if(ctx.response.status === 200) {
                    ctx.session.login = {
                        userInfo: req.userName,
                        password: req.password
                    }
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
                code: 10002,
                message: req.userName? '请输入密码':'请输入账户'
            }
        }
    }
}

module.exports = {
    'POST /login': loginController.login
}