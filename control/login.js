const userInfoModel =  require('../modules/userinfo');

class loginController {
    static async login(ctx) {
        let req = ctx.request.body
        if (req.userName && req.password) {
            try {
                const tableUser = await userInfoModel.getUser({userName: req.userName});
                const flag = (tableUser['password'] === req.password);
                ctx.response.status = flag ? 200:400;
                delete tableUser['password'];
                ctx.body = {
                    code: flag ? 200:400,
                    message: flag ? '登录成功':'账号密码有误',
                    data: flag ? tableUser : '',
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
                message: req.userName? '请输入密码':'请输入账户'
            }
        }
    }
}

module.exports = {
    'POST /login': loginController.login
}