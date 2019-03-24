<template>
  <el-dialog title="修改todo" :visible.sync="updateTodoFlag">
    <el-form :model="todoDetail" label-width="120px">
      <el-form-item label="todo名称">
        <el-input v-model="todoDetail.todo" class="w-300"></el-input>
      </el-form-item>
      <el-form-item label="截止时间">
        <el-date-picker
          v-model="todoDetail.deadline"
          type="date"
          class="w-300"
          format="yyyy-MM-dd"
          value-format="timestamp"
          placeholder="选择截止日期">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button>取 消</el-button>
      <el-button type="primary" @click="submitUpdate">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'UpdateTodo',
  data () {
    return {
      updateTodoFlag: false,
      todoDetail: {}
    }
  },
  methods: {
    showUpdateTodo (item) {
      this.updateTodoFlag = true
      this.todoDetail = item
    },
    submitUpdate () {
      this.$emit('updateTodo', this.todoDetail)
      this.updateTodoFlag = false
    }
  }
}
</script>

<style scoped>
.w-300 {
  width: 300px
}
</style>
