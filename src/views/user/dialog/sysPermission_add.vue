<template>

  <!--任务描述对话框-->
  <el-dialog title="权限菜单增加/修改"
             :visible.sync="dialogFormVisible">

    <!--表单域-->
    <el-form ref="form"
             :model="form"
             :rules="rules"
             label-width="180px">

      <el-form-item label="模块id" >
        <el-input v-model="form.id" style="width: 60%"></el-input>
      </el-form-item>

      <el-form-item label="菜单Code" >
        <el-input v-model="form.menuCode" style="width: 60%"></el-input>
      </el-form-item>

      <el-form-item label="名称" >
        <el-input v-model="form.menuName" style="width: 60%"></el-input>
      </el-form-item>

      <el-form-item label="权限Code" >
        <el-input v-model="form.permissionCode" style="width: 60%"></el-input>
      </el-form-item>

      <el-form-item label="权限描述" >
        <el-input v-model="form.permissionName" style="width: 60%"></el-input>
      </el-form-item>

      <el-form-item label="是否是菜单" >
        <el-input v-model="form.requiredPermission" style="width: 60%"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button @click="dialogFormVisible=false">取 消</el-button>
        <el-button style="margin-left: 60px;"
                   @click="editOkButton">确 定
        </el-button>
      </el-form-item>

    </el-form>

  </el-dialog>

</template>


<script>

import {
  api_sys_permission_add, api_sys_permission_delete,
  api_sys_permission_change, api_sys_permission_list
} from "@/api/auth/SysPermissionApi"

import TipMessage from "@/utils/TipMessage";


export default {
  data() {
    return {
      dialogFormVisible: false,
      editOrCreate: true,   //编辑或创建, 默认编辑

      form: {
        "id": "",
        "menuCode": "",
        "menuName": "",
        "permissionCode": "",
        "permissionName": "",
        "requiredPermission": "",
      },
      rules: {
        tpName: [
          { required: true, message: '请输入模块名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 1 到 32 个字符', trigger: 'blur' }
        ],
      }

    }
  },

  created() {
    this.init()
  },

  mounted() {
  },

  updated() {
  },

  //函数
  methods: {
    init() {
    },

    //确定编辑按钮点击了
    editOkButton() {
      //编辑状态
      if(this.editOrCreate === true){
        api_sys_permission_change(this.form).then((res) => {
          if (res.data.code !== 200) {
            TipMessage.Warning(res.data.msg)
            return null
          }
          TipMessage.isOK(res.data.msg)
          this.close()
        }).catch((err) => {
          //TipMessage.Error("错误"+ err);
        })
      }
      //创建状态
      else {
        api_sys_permission_add(this.form).then((res) => {
          if (res.data.code !== 200) {
            TipMessage.Warning(res.data.msg)
            return null
          }
          TipMessage.isOK(res.data.msg)
          this.close()
        }).catch((err) => {
          //TipMessage.Error("错误"+ err);
        })
      }
    },

    showDialog(row) {
      if (row != null) {
        this.form = row
        this.editOrCreate = true // 编辑状态
      } else {
        this.editOrCreate = false //创建状态
        this.form = {
          "id": "",
          "menuCode": "",
          "menuName": "",
          "permissionCode": "",
          "permissionName": "",
          "requiredPermission": "",
        }
      }
      this.dialogFormVisible = true
    },

    close() {
      this.dialogFormVisible = false
      this.$emit('sysPermission_add')
    }
  },

  //计算属性
  computed: {},

  //监听
  watch: {},

  //组件
  components: {},

  beforeDestroy() {
  }

}
</script>


<style scoped>
h1 {
  color: #000;
}

</style>
