var http = require("http"),
    fs = require("fs");

function Times(){
}

module.exports = Times;

//读取用户信息
Times.get = function(callback) {
    var xlsx = require("node-xlsx");

    var list = xlsx.parse("./config/list.xlsx");
        sheet2 = list[1].data, arr = [];
    for(var i=0; i< sheet2.length ;i ++){
        var obj = sheet2[i];
        arr.push({
            name : obj[0],
            price : obj[1],
            num : obj[2]
        })
    }

    callback(arr);

    //var rf=require("fs");
    //rf.readFile("./config/times.js",'utf-8',function(err,data){
    //    if(err){
    //        console.log("error");
    //    }else{
    //        var json = JSON.parse(data);
    //        callback(json);
    //    }
    //});
};