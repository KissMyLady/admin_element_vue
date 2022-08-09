<template>
  <div>

    <div class="box-specialist">
      <div class="box-tips">
        <span class="blue-tag"></span>
        <span>用户-权限表</span>
      </div>
    </div>

    <div class="tableArea">
      <!--表单域-->
      <el-form :inline="true">
        <el-button size="small"
                   @click="optionRefreshButton"
                   style="margin: 6px;"
        >刷新 <i class="el-icon-refresh-right"></i></el-button>
        <el-button type="primary" plain
                   size="small"
                   @click="addImageButton"
                   plain><i class="el-icon-plus" style="color: deepskyblue"></i> 添加
        </el-button>
      </el-form>

      <!--表格渲染-->
      <el-table ref="tableSort"
                border
                :row-style="{height:'32px'}"
                :header-row-style="{height:'32px'}"
                :cell-style="{padding:'1px'}"
                :data="tableDataLists">
        <!--        <el-table-column type="index" width="60px" align="center" label="序"/>-->
        <el-table-column v-for="(item, index) in columns"
                         :key="index"
                         :align="item.align"
                         :label="item.label"
                         :prop="item.prop"
                         :width="item.width">
          <!--判断字段渲染-->
          <template #default="{ row }">
            <div v-if="item.prop === 'imgUrl'">
              <el-image style="width: 200px;"
                        :src="row[item.prop]"
                        :preview-src-list="[row[item.prop]]"
                        fit="contain"></el-image>
            </div>

            <div v-else-if="item.prop === 'requiredPermission'">
              <el-tag v-if="row[item.prop] == '1' ">{{row[item.prop]}}</el-tag>
              <el-tag v-if="row[item.prop] == '2' "
                      type="info">{{row[item.prop]}}</el-tag>
            </div>

            <!--其他列表渲染-->
            <span v-else>{{ row[item.prop] }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="200px" align="center">
          <template #default="{row}">
            <el-button size="small"
                       type="primary" plain
                       @click="imageEdita(row)"
            >修改 <i class="el-icon-edit"></i></el-button>
            <el-button size="small"
                       v-permission="'option:delete'"
                       type="warning" plain
                       @click="deleteImageButton(row)"
            >删除 <i class="el-icon-delete"></i></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <div class="block" style="text-align: center;margin-top: 10px">
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page.sync="listQuery.page"
                       :page-sizes="[10, 20, 30, 50, 100, 200]"
                       :page-size="listQuery.pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       background
                       :total="listQuery.total">
        </el-pagination>
      </div>

    </div>

    <!--展示内容弹出框-->
    <sysPermission_add ref="sysPermission_add" @sysPermission_add="sysPermission_add"></sysPermission_add>

  </div>
</template>

<script>
import TipMessage from "@/utils/TipMessage";

import {
  api_sys_permission_add, api_sys_permission_delete,
  api_sys_permission_change, api_sys_permission_list
} from "@/api/auth/SysPermissionApi"

import sysPermission_add from "@/views/user/dialog/sysPermission_add";

export default {
  components: {
    sysPermission_add: sysPermission_add
  },

  data() {
    return {
      isEnable: true,
      //option 0, 查询删除的, 1: 查询不删除的
      listQuery: {
        total: 1,
        page: 1,
        pageSize: 20,
        option: 1,
      },
      //表格数据
      tableDataLists: [],

      columns: [
        {align: "center", label: "主键id",  width: "80px", prop: "id"},
        {align: "center", label: "菜单Code",    width: "auto", prop: "menuCode"},
        {align: "center", label: "名称", width: "auto", prop: "menuName"},
        {align: "center", label: "权限Code", width: "auto", prop: "permissionCode"},
        {align: "center", label: "权限描述", width: "auto", prop: "permissionName"},
        {align: "center", label: "是否本菜单必选权限", width: "160px", prop: "requiredPermission"},
      ],

    };
  },
  created() {
    this.getTableData();
  },

  methods: {
    deleteImageButton(row) {
      this.$okBox("此操作不可逆, 您确定要删除吗?", null, async () => {
        let sendData = {
          "id": row.id
        }
        api_sys_permission_delete(sendData).then((res) => {
          if (res.data.code !== 200) {
            TipMessage.Warning(res.data.msg);
            return null;
          }
          TipMessage.isOK(res.data.msg);
          this.getTableData();
        }).catch((err) => {
          //TipMessage.Error("错误"+ err);
        })
      })
    },
    //添加图片
    addImageButton() {
      this.$refs['sysPermission_add'].showDialog(null);
    },
    //图片修改
    imageEdita(row) {
      this.$refs['sysPermission_add'].showDialog(row);
    },
    //子组件回调
    sysPermission_add() {
      this.getTableData();
    },
    //按钮点击刷新数据
    optionRefreshButton() {
      this.getTableData();
      TipMessage.isOK("刷新成功");
    },
    //表格数据获取
    getTableData() {
      this.tableDataLists = [];
      //展示删除的, option 0, 查询删除的, 1: 查询不删除的
      api_sys_permission_list(this.listQuery).then((res) => {
        if (res.data.code !== 200) {
          TipMessage.Warning(res.data.msg);
          return null;
        }
        this.tableDataLists = res.data.data.records;
        this.listQuery.total = res.data.data.total;
      }).catch((err) => {
        //TipMessage.Error("错误"+ err);
      })
    },
    //计算时间戳
    stampTimeChange(stampTime) {
      let timestamp4 = new Date(stampTime) //直接用 new Date(时间戳) 格式转化获得当前时间'
      let y = timestamp4.getFullYear()
      let m = timestamp4.getMonth() + 1
      let d = timestamp4.getDate()
      let h = timestamp4.getHours()
      let mm = timestamp4.getMinutes()
      //let ss = timestamp4.getMilliseconds()
      return y + '-' + m + '-' + d + ' ' + h + ':' + mm + ''//+ ss;
    },
    //分页组件
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getTableData();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getTableData();
    },
  },


};
</script>


<style lang="scss" scoped>
.iframe_style {
  ::v-deep img {
    width: 60%;
  }
}

.tableArea {
  padding: 10px;
  background: #fff;
  border-radius: 10px;

  .btn-blue {
    background: #1890ff;
    color: #fff;
  }

  .btn-orange {
    background: #f27d49;
    color: #fff;
  }
}

.box-specialist {
  padding: 10px;
  background: #fff;
  border-radius: 10px;
}

.box-tips {
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 600;

  .blue-tag {
    border-radius: 2px;
    margin-right: 8px;
    width: 4px;
    height: 16px;
    background: #1890ff;
  }
}

.box-content {
  ul {
    display: flex;
    width: 100%;
    list-style: none;

    li {
      width: 25%;
    }
  }
}

.list-btn {
  button {
    margin-right: 12px;
  }
}
</style>
