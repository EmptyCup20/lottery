var http = require("http"),
    fs = require("fs");

function User(){
}

module.exports = User;

//读取用户信息
User.get = function(callback) {
    var xlsx = require("node-xlsx");

    var list = xlsx.parse("./config/list.xlsx");

    //var json = JSON.parse(data);
    callback(list);

    //var rf=require("fs");
    //rf.readFile("./config/user.js",'utf-8',function(err,data){
    //    if(err){
    //        console.log("error");
    //    }else{
    //        var json = JSON.parse(data);
    //        callback(json);
    //    }
    //});
};