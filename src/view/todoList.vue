<template>
  <div>
    <div class="add-todo">
      <span class="label">截止日期：</span>
      <el-date-picker
        v-model="deadline"
        :default-value="defalutTime"
        type="date"
        format="yyyy-MM-dd"
        value-format="timestamp"
        placeholder="选择截止日期"
      ></el-date-picker>
      <span class="label">todo：</span>
      <el-input v-model="todoContent" @keyup.enter.native="addTodo" class="input" placeholder="请输入todo内容"></el-input>
      <span class="text-btn border-right cursor-pointer" @click="showAll = false">unCompleted</span>
      <span class="text-btn cursor-pointer" @click="showAll = true">Show All</span>
    </div>
    <el-card class="todo-card">
      <div v-for="(item, index) in todoList" :key="index" class="list">
        <el-row v-if="!item.isEnd || showAll" :gutters="20">
            <i
              :class="[item.isEnd?'el-icon-circle-check-outline': 'el-icon-remove-outline', 'fl']"
              @click="endThisTodo(item)"
            ></i>
            <div
              :class="[item.isEnd? 'through-line' : '', 'cursor-pointer', 'todo-content']"
              @click="showUpdateTodo(item)"
            >{{item.todo}}</div>
            <i class="el-icon-delete delete" @click="delateTodo(item)"></i>
            <span style="float: right">{{item.showTime}}</span>
        </el-row>
      </div>
      <span class="lastNum">{{lastNum}} &nbsp; items left</span>
      <div class="bottom-action">
        <span style="padding: 0 10px; border-right: 1px solid #0398ff" @click="clearCompleted">clear completed</span>
        <span @click="allCompleted">all completed</span>
      </div>
      <update-todo ref="updateTodo" @updateTodo="submitUpdateTodo"/>
    </el-card>
  </div>
</template>

<script>
import UpdateTodo from './updateTodo.vue'
import * as api from '../api/todoApi'
export default {
  name: 'TodoList',
  components: { UpdateTodo },
  data () {
    return {
      todoContent: '',
      deadline: Date.parse(new Date()),
      todoList: [],
      showAll: true,
      defalutTime: new Date()
    }
  },
  computed: {
    lastNum () {
      return this.todoList.filter(item => item.isEnd === false).length
    }
  },
  created () {
    this.getAllTodos()
  },
  methods: {

    // 新增todo
    addTodo () {
      if (this.todoContent === '') {
        this.$message({
          duration: 1000,
          message: '请输入todo内容',
          type: 'warning'
        })
        return
      }
      let params = {
        todo: this.todoContent,
        isEnd: false,
        deadline: this.deadline,
        id: this.GenNonDuplicateID()
      }
      api.createTodo(params)
        .then(res => {
          this.$message({
            duration: 1000,
            message: res.data.msg,
            type: res.data.code === 1 ? 'success' : 'warning'
          })
          this.getAllTodos()
        })
        .catch(reject => {
          console.log(reject)
        })
    },

    // 获取全部todo列表
    getAllTodos () {
      api.getAllTodos()
        .then(res => {
          res.data.data.sort((a, b) => {
            return a.deadline - b.deadline
          })
          res.data.data.forEach(item => {
            let newDate = new Date()
            newDate.setTime(item.deadline)
            item.showTime = newDate.toLocaleDateString()
          })
          this.todoList = res.data.data
        })
        .catch(reject => {
          console.log(reject)
        })
    },

    // 删除todo
    delateTodo (item) {
      console.log('deleteTodo')
      api.deleteTodo({id: item.id})
        .then(res => {
          this.getAllTodos()
        })
        .catch(reject => {
          console.log(reject)
        })
    },

    // 更新todo
    submitUpdateTodo (item) {
      api.updateTodo(item)
        .then(res => {
          this.getAllTodos()
        })
        .catch(reject => {
          console.log(reject)
        })
    },

    // 展示更新todo弹框
    showUpdateTodo (item) {
      let self = this
      self.$refs['updateTodo'].showUpdateTodo(item)
    },

    // 将todo标记为完成
    endThisTodo (item) {
      item.isEnd = !item.isEnd
      this.submitUpdateTodo(item)
    },

    // 删除已完成的todo
    clearCompleted () {
      this.todoList.forEach(item => {
        if (item.isEnd === true) {
          this.delateTodo(item)
        }
      })
    },

    // 将所有todo标记为已完成
    allCompleted () {
      this.todoList.forEach(item => {
        if (item.isEnd === false) {
          this.endThisTodo(item)
        }
      })
    },
    // 生成唯一id
    GenNonDuplicateID () {
      return Math.random().toString(36).substr(3)
    }
  }
}
</script>

<style lang="less" scoped>
// 顶部新增todo样式
.add-todo {
  width: 100%;
  height: 100px;
  background-color: rgb(59, 59, 59);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  .label {
    margin: 0 10px;
  }
  span {
    flex-shrink: 0;
  }
  .input {
    width: 300px;
    min-width: 150px;
  }
  .text-btn {
    line-height: 30px;
    padding: 0 10px;
  }
  .border-right {
    border-right: 1px solid #fff;
  }
}

// todo卡片样式
.todo-card {
  width: 800px;
  margin: 50px auto;
  min-height: 600px;
  border-radius: 10px;
  position: relative;
  .list {
    margin: 20px;
    font-size: 20px;
    .through-line {
      text-decoration: line-through;
    }
    .delete {
      float: right;
      margin: 0 10px;
    }
    .todo-content {
      max-width: 500px;
      overflow: hidden;
      display: inline-block;
      text-overflow: ellipsis;
      margin-left: 10px;
    }
  }
  .lastNum {
    position: absolute;
    bottom: 10px;
    text-align: center;
  }
  .bottom-action {
    color: #0398ff;
    cursor: pointer;
    position: absolute;
    bottom: 10px;
    right: 20px;
  }
}
.cursor-pointer {
  cursor: pointer;
}
.fl {
  float: left;
}
.todo-card /deep/ i {
  cursor: pointer;
  line-height: 30px;
  font-size: 20px;
}
</style>
