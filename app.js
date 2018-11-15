const koa = require('koa');
const app = new koa();
const router = require('koa-router');
const bodyParser = require('koa-bodyparser');


app.use(async(ctx,next)=>{
	await next();
	ctx.response.type = 'text/html';
	ctx.response.body = '<h1>hello,world</h1';
})
app.use(bodyParser());

function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}
function addControllers(router) {
    var files = fs.readdirSync(__dirname + '/controllers');
    var js_files = files.filter((f) => {
        return f.endsWith('.js');
    });

    for (var f of js_files) {
        console.log(`process controller: ${f}...`);
        let mapping = require(__dirname + '/controllers/' + f);
        addMapping(router, mapping);
    }
}
addControllers(router);



app.listen(3000);
console.log('app started at port 3000...');