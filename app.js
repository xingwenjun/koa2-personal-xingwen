const koa = require('koa');
const app = new koa();
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const koa_session = require('koa-session');
const controller = require('./controllers.js');
const staticfile = require('koa-static');
const cors = require('koa2-cors');
app.use(cors({
    origin: function (ctx) {
        return '*'; // 允许来自所有域名请求
        // return 'http://localhost:8080'; / 这样就能只允许 http://localhost:8080 这个域名的请求了
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
const session_signed_key = ['login secret']
const session_config = { 
    key: 'token', /** cookie的key。 (默认是 koa:sess) */ 
    maxAge: 3600000, /** session 过期时间，以毫秒ms为单位计算 。*/ 
    autoCommit: true, /** 自动提交到响应头。(默认是 true) */ 
    overwrite: true, /** 是否允许重写 。(默认是 true) */ 
    httpOnly: true, /** 是否设置HttpOnly，如果在Cookie中设置了"HttpOnly"属性，那么通过程序(JS脚本、Applet等)将无法读取到Cookie信息，这样能有效的防止XSS攻击。 (默认 true) */ 
    signed: true, /** 是否签名。(默认是 true) */ 
    rolling: true, /** 是否每次响应时刷新Session的有效期。(默认是 false) */ 
    renew: false, /** 是否在Session快过期时刷新Session的有效期。(默认是 false) */ 
};
const localfilter = ['POST /api/login', 'POST /api/user']
const handler = async (ctx, next) => {
    try {
        if(ctx.session.login) {
            await next();
        } else if(localfilter.includes(`POST ${ctx.originalUrl}`)) {
            await next();
        } else {
            ctx.body = {
                code: 10000,
                message: '账号未登录'
            }
        }
    } catch (err) {
        console.log(err)
        ctx.response.status = err.statusCode || err.status || 500;
        ctx.throw(500);
        ctx.response.body = {
            message: err.message
        };
    }
};
const session = koa_session(session_config, app)
app.keys = session_signed_key
app.use(session)
app.use(staticfile(__dirname + '/static'));
app.use(bodyParser());
app.use(handler);
app.use(controller());

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000)
console.log('conection localhost:3000')