const fn_signin = async(ctx, next) => {
    let name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    if (name === 'koa' && password === '12345') {
        ctx.response.status = 200;
    } else {
        ctx.response.status = 400;
    }
    stateCode(ctx)
};
const register = async(ctx, next) => {
    let name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
};

function stateCode(ctx) {
    let msg = '';
    switch (ctx.response.status) {
        case 200:
            msg = '请求通过'
            break;
        case 404:
            msg = '接口未找到'
            break;
        case 500:
            msg = '数据库错误'
            break;
    }
    ctx.response.body = { status: ctx.response.status, data: { type: 1 }, msg: msg || '网络错误' }
}
module.exports = {
    'POST /signin': fn_signin
}