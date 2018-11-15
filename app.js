const koa = require('koa');
const app = new koa();
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const controller = require('./controllers.js');
const staticfile = require('koa-static');
const cors = require('koa2-cors');

app.use(staticfile(__dirname+'/static'));
app.use(bodyParser());
app.use(controller());
app.use(cors({
    origin: function (ctx) {
        if (ctx.url === '/test') {
            return "*"; // 允许来自所有域名请求
        }
        // return 'http://localhost:8080'; / 这样就能只允许 http://localhost:8080 这个域名的请求了
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

app.listen(3000);
console.log('app started at port 3000...');