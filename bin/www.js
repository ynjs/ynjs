const ynserve = require("../index");



ynserve().listen(4000,function(){
    console.log("服务已启动 http://127.0.0.1:4000");
})