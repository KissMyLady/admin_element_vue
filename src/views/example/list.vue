<template>
  <div class="app-container">
    <h1>演示界面</h1>

    <div>
      <h3>一个需要角色权限的按钮</h3>

      <!--v-permission="hasPerm('option:list')"-->

      <p>fileType:list权限按钮</p>
      <el-button size="small"
                 v-permission="'fileType:list'"
                 type="warning" plain
      >fileType:list <i class="el-icon-delete"></i>fileType:list 权限</el-button>

      <p>option:list 权限按钮</p>
      <el-button size="small"
                 v-permission="'option:list'"
                 type="warning" plain
      >修改 <i class="el-icon-delete"></i>option:list 权限</el-button>

      <p>file:list权限按钮</p>
      <el-button size="small"
                 v-permission="'file:list'"
                 type="warning" plain
      >有按钮 <i class="el-icon-delete"></i>有 file:list 权限</el-button>
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
