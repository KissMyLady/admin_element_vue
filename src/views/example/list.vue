<template>
  <div class="app-container">
    <h1>演示界面</h1>

    <div>
      <h3>一个需要角色权限的按钮</h3>

      <el-button size="small"
                 v-permission="'option:list'"
                 type="warning" plain
      >删除 <i class="el-icon-delete"></i></el-button>

      <el-button size="small"
                 v-permission="'option:list'"
                 type="warning" plain
      >修改 <i class="el-icon-delete"></i></el-button>
    </div>


 </div>
</template>

<script>

export default {
  name: 'ArticleList',

  data() {
    return {

    }
  },
  created() {
  },
  methods: {

  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
