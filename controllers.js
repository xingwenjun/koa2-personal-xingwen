const fs = require('fs');

function addMapping(router, mapping) { // control文件夹下面的api遍历
    for (let url in mapping) {
        if (url.startsWith('GET ')) {
            let path = url.substring(4);
            router.get(path, mapping[url]);
        } else if (url.startsWith('POST ')) {
            let path = url.substring(5);
            router.post(path, mapping[url]);
        } else if (url.startsWith('DELETE ')) {
            let path = url.substring(7);
            router.delete(path, mapping[url]);
        } else if (url.startsWith('PUT ')) {
            let path = url.substring(4);
            router.put(path, mapping[url]);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}
function addControllers(router) {
    let files = fs.readdirSync(__dirname + '/control');
    let js_files = files.filter((f) => {
        return f.endsWith('.js');
    });

    for (let f of js_files) {
        let mapping = require(__dirname + '/control/' + f);
        addMapping(router, mapping);
    }
}
module.exports = function (dir) {
    let
        controllers_dir = dir || 'controllers', // 如果不传参数，扫描目录默认为'controllers'
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
};