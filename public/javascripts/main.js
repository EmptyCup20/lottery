
if (document.attachEvent) {
  alert("这个例子不支持 Old IE 哦")
}

define(function(require) {
  var $ = require('jquery');

  $.ajax({
    url : "/users",
    type : "get",
      data : {
          num : activeTime
      },
    success : function(data){
      var lucky = require('./lucky');

      lucky.init(data.users);
    }
  })

});

