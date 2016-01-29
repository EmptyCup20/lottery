var express = require('express'),
    router = express.Router(),
    app = express(),
    fs = require('fs'),
    User = require('../models/user'),
    Times = require('../models/times'),
    _ = require('underscore');

var times, users;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title : '抽奖系统',
        times : []
    });
});

/* GET 抽奖重置. */
router.get('/reset', function(req, res, next) {
    times = null;
    users = null;
    res.render('index', {
        title : '抽奖系统',
        times : []
    });
});

/* get users */
router.get('/users', function(req, res, next) {
    if(users){
        res.send({
            users : users
        });
        return
    }
    User.get(function(temp){
        users = temp[0].data;
        res.send({
            users : users
        });
    });
});

/* GET lottery page. */
router.get('/lottery', function(req, res, next) {
    if(times){
        res.render('lottery', {
            title: '抽奖啦',
            times : times
        });
        return
    }
    Times.get(function(temp) {
        times = temp;
        res.render('lottery', {
            title: '抽奖啦',
            times : times
        });
    });
});

/* GET lottery page. */
router.get('/save', function(req, res, next) {
    var list = req.query.list,
        num = req.query.num,
        arr = [];

    users = _.filter(users, function(user){
        var temp = true;
        _.each(list, function(n){
            if(user[0] == n){
                arr.push(user[0]);
                temp = false;
            }
        });
        return temp;
    });
    times[num].people = arr;

    // 写入log.txt文件
    var str = "\n" + new Date() + "   " + times[num].name + "\n中奖名单:"
        + arr.join(",");

    fs.appendFile("config/log.txt", str, function(err){
        if(err)
            console.log("fail " + err);
        else
            console.log("写入文件ok");
    });

    res.send("success");
});

/* GET lottery page. */
router.get('/lottery/:num?', function(req, res, next) {
    var num = req.params.num || 0;
    if(times){
        res.render('lottery', {
            title : '抽奖啦',
            times : times,
            num : num,
            peopleNum : times[num].num
        });
        return
    }
    Times.get(function(temp) {
        times = temp;
        res.render('lottery', {
            title: '抽奖啦',
            times : times,
            num : num,
            peopleNum : times[num].num
        });
    });
});

module.exports = router;
