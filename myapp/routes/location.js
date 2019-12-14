'use strict';
var express = require('express');
var router = express.Router();
// const moduleB = require('../public/javascripts/test')
/* サンプルAPI① 
 * http://localhost:3000/samples にGETメソッドのリクエストを投げると、
 * JSON形式で文字列を返す。
 */
router.get('/', function(req, res, next) {
  console.log(req.params);
  console.log('routes/location');
  var min = 0 ;
  var max = 400 ;

  var x = Math.floor( Math.random() * (max + 1 - min) ) + min ;
  var y = Math.floor( Math.random() * (max + 1 - min) ) + min ;
  var Todo = require('../model/models').Todo;
  // Todo.update({name:'user_1'}, {$set:{x:x, y:y, step:0}});
  
  var where = {name: "user_1"};
  var set = {$set:{x:x, y:y, step:0}};
  // ----------------------------------------------------------------------
  // UPDATE
  // ----------------------------------------------------------------------
  Todo.updateMany(where, set, function(err, result) {
    if (err) throw err;
    console.log("update");
    // db.close();
  });  

  Todo.find().exec((err, todos) => {
    if (err) {
      console.log('error');
      res.send(err)
      return
    }   
    // console.log(todos);
    // res.json(todos)
    res.header('Content-Type', 'application/json; charset=utf-8')
    res.send(todos)
  })  
  // module.exports = function (socket, io) {
  //   // 投稿メッセージを送信する
  //   console.log('routes/location');
  //   io.sockets.emit('receive', 'aaa');
  
  // };

  // moduleB
  // socket.on('test', function (userName) {
  //   // 存在していたら、入室できないフラグ
  //   if (global.memberList.indexOf(userName) != -1) {
  //     socket.emit('blockEnterFlag', true);
  //   } else {
  //     socket.emit('blockEnterFlag', false);
  //   }
  // });
    // module.exports = function (socket, io) {
    //     // 投稿メッセージを送信する
    //     // console.log('test');
    //     // io.sockets.emit('receive', 'a');
    //     // socket.on('sendMessage', async function (userMessage) {
    //     //   if (!userMessage.message) {
    //     //     return;
    //     //   }
    //     //   // io.sockets.emit('receive', 'a');
    //     // });

    //   };
      
  // var param = {"値":"これはサンプルAPIです"};
  // res.header('Content-Type', 'application/json; charset=utf-8')
  // res.send(param);
});

/* サンプルAPI② 
 * http://localhost:3000/samples/hello にGETメソッドのリクエストを投げると、
 * JSON形式で文字列を返す。
 */
router.get('/user', function(req, res, next) {
    var min = 0 ;
    var max = 400 ;
    var x = Math.floor( Math.random() * (max + 1 - min) ) + min ;
    var y = Math.floor( Math.random() * (max + 1 - min) ) + min ;
    var Todo = require('../model/models').Todo;

    Todo.find().exec((err, todos) => {
    if (err) {
      console.log('error');
      res.send(err)
      return
    }   
    // console.log(todos);
    // res.json(todos)
    res.header('Content-Type', 'application/json; charset=utf-8')
    res.send(todos)
  })  
  // var param = {
  //               "user_1": {"x":x, "y": y},
  //               "user_2": {"x":x- 30, "y": y-20}
  //             };

  // res.header('Content-Type', 'application/json; charset=utf-8')
  // res.send(param);
});
router.get('/api/todos', function(req, res) {
  var Todo = require('../model/models').Todo;
  Todo.find().exec((err, todos) => {
    if (err) {
      console.log('error');
      res.send(err)
      return
    }   
    console.log(todos);
    res.header('Content-Type', 'application/json; charset=utf-8')
    res.send(todos)
    res.json(todos)
    return
  })  
});

router.post('/update', function(req, res, next) {
  var min = -4 ;
  var max = 4 ;
      
  var Todo = require('../model/models').Todo;
  Todo.find({ name: req.body['name'] }, function(err, result) {
    if (err){ throw err;
    }
    //ユーザ登録なし
    if (result.length == 0) {
      let todo = new Todo({ name: req.body['name'], x:1410, y:710,step});
      todo.save(function(err) {
        if (err) { console.log(err); }
      });
        console.log(result);
        res.send(result)
    }
    else{
      // console.log(result[0]);
      // console.log('routes/location');
      let step = req.body['step'];
      let x = result[0]['x'];
      let y  = result[0]['y'];
      // console.log(step,x,y);
      for (  var i = 0;  i < step;  i++  ) {
        x += Math.floor( Math.random() * (max + 1 - min) ) + min ;
        y += Math.floor( Math.random() * (max + 1 - min) ) + min ;
       }
       console.log(step,x,y);
      // var min = 0 ;
      // var max = 400 ;
      
      // var x = Math.floor( Math.random() * (max + 1 - min) ) + min ;
      // var y = Math.floor( Math.random() * (max + 1 - min) ) + min ;
      // Todo.update({name:'user_1'}, {$set:{x:x, y:y, step:0}});
      
      var where = {name: result[0]['name']};
      var set = {$set:{x:x, y:y, step:result[0]['step'] + step}};
      // ----------------------------------------------------------------------
      // UPDATE
      // ----------------------------------------------------------------------
      Todo.updateMany(where, set, function(err, result) {
        if (err) throw err;
        console.log("update");
      });  
    
      Todo.find().exec((err, todos) => {
        if (err) {
          console.log('error');
          res.send(err)
          return
        }   
        res.header('Content-Type', 'application/json; charset=utf-8')
        if (step % 10 == 0){
          res.send(false)
        }else{
          res.send(true)
        }
      })   
    }
  });
});

router.post('/phase', function(req, res, next) {
  var User = require('../model/users').User;
  User.find({ name: req.body['name'] }, function(err, result) {
    if (err){ throw err;
    }
    //ユーザ登録なし
    if (result.length == 0) {
      let user = new User({ name: req.body['name'], phase: 1 });
      user.save(function(err) {
        if (err) { console.log(err); }
      });
        console.log(result);
        res.send(result)
    }
    else{
      let name = result[0]['name'];
      let phase  = result[0]['phase'];
      console.log(name,phase);
      var where = {name: name};
      var set = {$set:{phase:phase}};
      // ----------------------------------------------------------------------
      // UPDATE
      // ----------------------------------------------------------------------
      User.updateMany(where, set, function(err, result) {
        if (err) throw err;
        console.log("update");
      });  
    
      User.find().exec((err, users) => {
        if (err) {
          console.log('error');
          res.send(err)
          return
        }   
        res.header('Content-Type', 'application/json; charset=utf-8')
        res.send(users)
      })   
    }
  });
});

module.exports = router;