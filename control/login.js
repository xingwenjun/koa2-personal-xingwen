const fn_signin = async (ctx, next) => {
    let name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    if (name === 'koa' && password === '12345') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.path ='/login/404.html';
    }
};
module.exports = {
	'POST /signin': fn_signin
}