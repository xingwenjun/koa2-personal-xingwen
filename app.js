const koa = require('koa');
const app = new koa();
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const koa_session = require('koa-session');
const controller = require('./controllers.js');
const staticfile = require('koa-static');
const cors = require('koa2-cors');

const session_signed_key = ['some secret hurr']
const session_config = { 
    key: 'koa:sess', /** cookie的key。 (默认是 koa:sess) */ 
    maxAge: 4000, /** session 过期时间，以毫秒ms为单位计算 。*/ 
    autoCommit: true, /** 自动提交到响应头。(默认是 true) */ 
    overwrite: true, /** 是否允许重写 。(默认是 true) */ 
    httpOnly: true, /** 是否设置HttpOnly，如果在Cookie中设置了"HttpOnly"属性，那么通过程序(JS脚本、Applet等)将无法读取到Cookie信息，这样能有效的防止XSS攻击。 (默认 true) */ 
    signed: true, /** 是否签名。(默认是 true) */ 
    rolling: true, /** 是否每次响应时刷新Session的有效期。(默认是 false) */ 
    renew: false, /** 是否在Session快过期时刷新Session的有效期。(默认是 false) */ 
};
const session = koa_session(session_config, app)
app.keys = session_signed_key

app.use(session)
app.use(staticfile(__dirname + '/static'));
app.use(bodyParser());
app.use(controller());
app.use(cors({
    origin: function (ctx) {
        if (ctx.url === '/test') {
            return '*'; // 允许来自所有域名请求
        }
        // return 'http://localhost:8080'; / 这样就能只允许 http://localhost:8080 这个域名的请求了
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
app.use(ctx=>{
    const databaseUserName = "testSession"; 
    const databaseUserPasswd = "noDatabaseTest"; // 对/favicon.ico网站图标请求忽略 
    if (ctx.path === '/favicon.ico') return; 
    if (!ctx.session.logged) { // 如果登录属性为undefined或者false，对应未登录和登录失败 
        // 设置登录属性为false 
        ctx.session.logged = false; // 取请求url解析后的参数对象，方便比对 
        // 如?nickname=post修改&passwd=123解析为{nickname:"post修改",passwd:"123"} 
        let query = ctx.request.query; // 判断用户名密码是否为空 
        console.log(query)
        if (query.nickname && query.passwd) { // 比对并分情况返回结果 
            if (databaseUserName == query.nickname) { // 如果存在该用户名 
                // 进行密码比对并返回结果 
                ctx.body = (databaseUserPasswd == query.passwd) ? "登录成功" : "用户名或密码错误"; 
                ctx.session.logged = true; 
            } else { // 如果不存在该用户名 // 如果用户名不存在 
                ctx.redirect('/login.html');
            } 
        } else { 
            ctx.redirect('/login.html');
        } 
    } else { 
        
    }
})
const handler = async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        console.log(err)
        ctx.response.status = err.statusCode || err.status || 500;
        ctx.throw(500);
        ctx.response.body = {
            message: err.message
        };
    }
};
router.get('*', async (ctx) => {
    ctx.redirect('/404.html');
});
router.get('/', async (ctx) => {
    ctx.redirect('/login.html');
})
app.use(router.routes()).use(router.allowedMethods())
app.use(handler);
app.listen(3000)
console.log('conection localhost:3000')