class tryController {
    static async try(ctx) {
        console.log(22222)
        ctx.status = 200
        ctx.body = {
            code: 200,
            message: '测试'
        }
    }
}

module.exports = {
    'GET /try': tryController.try
}