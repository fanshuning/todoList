const todoModel = require('./todo').Todo
const express = require('express')
const router = express.Router()

// 新增todo
router.post('/api/createTodo', (req, res) => {
  let newTodo = new todoModel({
    todo: req.body.todo,
    isEnd: req.body.isEnd,
    deadline: req.body.deadline,
    id: req.body.id
  })
  //查询这个todo是否已经存在
  todoModel.count({"todo": newTodo.todo },(err,docs) => {
    if(err) {
      res.send(err)
    }else {
      if(docs>=1){
        res.send({code:2,msg:'已经添加过该todo，不可重复添加'})
      }else{
        newTodo.save((err, data) => {
          if (err) {
            res.send(err)
          } else {
            res.send({code:1,msg:'添加todo成功！要及时完成哦！'})
          }
        })
      }
    }
  })
});

// 获取所有todo列表
router.get('/api/getAllTodos', (req, res) => {
  todoModel.find((err, docs) => {
    if(err){
      res.send(err);
    }else{
       res.send({code:1,data: docs});
    }
  })
});

// 删除todo
router.post('/api/delateTodo', (req, res) => {
  console.log('delate')
  console.log(req.body)
  todoModel.count({"id": req.body.id},(err,docs) => {
    todoModel.remove({"id": req.body.id },(err) => {
          if (err) return handleError(err);
        });
        res.send({code:1,msg:'todo已删除'});
 
  })
});

// 修改todo
router.post('/api/updateTodo', (req, res) => {
  console.log('node update')
  todoModel.count({"id": req.body.id }, (err,docs) => {
    todoModel.update({"id": req.body.id }, req.body, (err) => {
          if (err) return handleError(err);
        });
        res.send({code:1,msg:'todo已更新'});
 
  })
});
 
module.exports = router