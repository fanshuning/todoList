<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
body {
  width: 100%;
  height: 100%;
  margin: 0px;
  background-color: rgb(248, 248, 248);
}
/*   统一修改element样式   */
.el-radio {
  color: #fff;
}
.el-radio__input.is-checked+.el-radio__label {
  color: #fff;
}
.el-dialog {
  width: 800px;
}
</style>
