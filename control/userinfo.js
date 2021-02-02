const userInfoModel =  require('../modules/userinfo');

class userInfoController {
    static async createUser(ctx) {
        let req = ctx.request.body;
        if(req.userName && req.password) {
            req.role = 2;
            try {
                const tableUser = await userInfoModel.getUser({userName: req.userName});
                if (tableUser && tableUser['userName'] === req.userName) {
                    ctx.response.status = 200
                    ctx.body = {
                        code: 10003,
                        message: '该账号已存在'
                    }
                    return
                }
                const data = await userInfoModel.createUser(req);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    data: true,
                    message: '注册成功'
                }
            } catch (error) {
                ctx.response.status = 500
                ctx.body = {
                    code: 500,
                    message: '注册失败',
                    data: error.original.sqlMessage
                }
            }
        } else {
            ctx.response.status = 400
            ctx.body = {
                code: 400,
                message: '参数不全'
            }
        }
    }
    // 查询用户
    static async findUser(ctx) {
        let id = ctx.params.id;
        if (id) {
            try {
                let data = await userInfoModel.getUser(id)
                ctx.response.status = 200;
                ctx.body = {
                    data
                }
            } catch (error) {
                ctx.response.status = 500
                ctx.body = {
                    code: 500,
                    message: '查询失败',
                    data: error
                }
            }
        } else {
            ctx.response.status = 400
            ctx.body = {
                code: 400,
                message: '参数不全',
                data: error
            }
        }
    }
    // 删除用户
    static async delUser(ctx) {
        let id = ctx.params.id;
        if (id) {
            try {
                let data = await userInfoModel.delUser(id)
                ctx.response.status = 200;
                ctx.body = {
                    data
                }
            } catch (error) {
                ctx.response.status = 500
                ctx.body = {
                    code: 500,
                    message: '删除失败',
                    data: error
                }
            }
        } else {
            ctx.response.status = 400
            ctx.body = {
                code: 400,
                message: '参数不全',
                data: error
            }
        }
    }
    static async updateUser(ctx) {
        let req = ctx.request.body;
        try {
            const ret = await userInfoModel.updateUser(req);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: '修改成功'
            }
        } catch (error) {
            ctx.response.status = 500
            ctx.body = {
                code: 500,
                message: '修改失败',
                data: error
            }
        }
    }
}

module.exports= {
    'POST /user': userInfoController.createUser,
    'GET /user': userInfoController.findUser,
    'PUT /user': userInfoController.updateUser,
    'DELETE /user': userInfoController.delUser
}