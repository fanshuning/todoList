const mongoose = require('mongoose')
// 连接数据库 如果不自己创建 默认test数据库会自动生成
mongoose.connect('mongodb://localhost/test')
 
// 为这次连接绑定事件
const db = mongoose.connection
db.once('error', () => console.log('Mongo connection error'))
db.once('open', () => console.log('Mongo connection successed'))

/************** 定义模式todoList **************/
let TodoSchema = mongoose.Schema
const todoSchema = new TodoSchema({
  todo: String,
  isEnd: Boolean,
  deadline: Number,
  id: String
}, { collection: 'todoData' });
 
/************** 定义模型Model **************/
const Models = {
  Todo: mongoose.model('Todo', todoSchema)
}
 
module.exports = Models