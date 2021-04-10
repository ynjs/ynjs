const create = require("./server").default;

const sqlite3 = require("sqlite3");

module.exports = function(){

    var app = create();

    app.use("/",function(req,res){
        res.send("hello world")
    })
    app.use("/api",function(req,res){
        res.send("api")
    })
    
    return app
}