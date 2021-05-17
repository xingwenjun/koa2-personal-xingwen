class tryController {
    static async try(ctx) {
        try {
            ctx.status = 200
            ctx.body = {
                code: 200,
                message: '测试'
            }
        } catch (error) {
            ctx.response.status = 500
            ctx.body = {
                code: 10004,
                message: '请求错误',
                data: error
            }
        }
    }
}

module.exports = {
    'GET /api/try': tryController.try
}