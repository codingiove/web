<template>
  <div>
    <!-- 面包屑导航 -->
    <Breadcrumbs>
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item slot="c">角色列表</el-breadcrumb-item>
    </Breadcrumbs>
    <!-- 卡片视图 -->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="dialogVisible= true">添加角色</el-button>
        </el-col>
      </el-row>
      <!-- 角色列表区域 -->
      <el-table :data="rolelist" border stripe>
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              :class="['bdbottom', i1 === 0 ? 'bdtop' : '', 'vcenter']"
              v-for="(item1, i1) in scope.row.children"
              :key="item1.id"
            >
              <!-- 渲染一级权限 -->
              <el-col :span="5">
                <el-tag @close="removeRightById(scope.row, item1.id)">{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 渲染二级和三级权限 -->
              <el-col :span="19">
                <!-- 通过 for 循环 嵌套渲染二级权限 -->
                <el-row
                  :class="[i2 === 0 ? '' : 'bdtop', 'vcenter']"
                  v-for="(item2, i2) in item1.children"
                  :key="item2.id"
                >
                  <el-col :span="6">
                    <el-tag
                      type="success"
                      @close="removeRightById(scope.row, item2.id)"
                    >{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      type="warning"
                      v-for="item3 in item2.children"
                      :key="item3.id"
                      closable
                      @close="removeRightById(scope.row, item3.id)"
                    >{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row.id)"
            >编辑</el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="element(scope.row.id)"
            >删除</el-button>
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
              @click="show(scope.row)"
            >分配角色</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 修改用户的对话框 -->
    <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%" @close="adddialogclose">
      <el-form ref="editFormRefa" :model="editForm">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserionf">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加用户列表 -->
    <el-dialog title="添加用户" :visible.sync="dialogVisible" @close="adddialogclose">
      <el-form :model="editForm" ref="tjref">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配权限 -->
    <el-dialog title="分配权限" :visible.sync="assignpermissions" width="30%" @close="nog">
      <!--树形控件 -->
      <el-tree
        :data="datalog"
        :props="treeProps"
        show-checkbox
        node-key="id"
        ref="treeRef"
        default-expand-all
        :default-checked-keys="defKeys"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="assignpermissions = false">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Breadcrumbs from './childComps/Breadcrumbs'

export default {
  components: { Breadcrumbs },
  name: '',
  data() {
    return {
      // 所有角色列表数据
      rolelist: [],
      editForm: {},
      editDialogVisible: false,
      dialogVisible: false,
      assignpermissions: false,
      //权限数据
      datalog: [],
      //树形控件绑定对象
      treeProps: {
        label: 'authName',
        children: 'children'
      },
      // 默认选中的节点Id值数组
      defKeys: [],
      // 当前即将分配权限的角色id
      roleId: ''
    }
  },
  created() {
    this.getRolesList()
  },
  methods: {
    // 获取所有角色的列表
    async getRolesList() {
      const { data: res } = await this.$http.get('roles')
      if (res.meta.status !== 200) {
        return this.$message.error('获取角色列表失败！')
      }
      this.rolelist = res.data
    },
    //根据提示用户是否删除  (a,b)接收转过来的数据 一个是角色id一个是权限id
    async removeRightById(a, b) {
      const confirm = await this.$confirm(
        '此操作将永久删除该文件, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)

      if (confirm !== 'confirm') {
        //如果不等于confirm,返回一句信息
        return this.$message.info('取消了删除!')
      }
      const { data: res } = await this.$http.delete(`roles/${a.id}/rights/${b}`)
      if (res.meta.status !== 200) {
        return this.$message.error('删除权限失败')
      }
      //给当前角色信息重新负值,这样删除的时候就不会刷新
      a.children = res.data
    },
    //删除角色列表
    async element(id) {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      // 如果用户确认删除，则返回值为字符串 confirm
      // 如果用户取消了删除，则返回值为字符串 cancel
      // console.log(confirmResult)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      const { data: res } = await this.$http.delete('roles/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('删除用户失败！')
      }
      this.$message.success('删除用户成功！')
      this.getRolesList()
    },

    async showEditDialog(id) {
      //点击添加图标时,打开添加选项框
      const { data: res } = await this.$http.get('roles/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('修改用户失败！')
      }
      this.editForm = res.data
      // console.log(this.editForm.roleId)
      this.editDialogVisible = true
    },

    //修改对话框,有问题
    editUserionf() {
      //validate验证valid有效的
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        //发起网络请求
        const { data: res } = await this.$http.post(
          'roles/' + this.editForm.roleId
        )
        if (res.meta.status !== 200) {
          return this.$message.error('更新用户信息失败！')
        }
        // 关闭对话框'roles/' + this.editForm.roleId,
        this.editDialogVisible = false
        // 刷新数据列表
        this.getRolesList()
        // 提示修改成功
        this.$message.success('更新用户信息成功！')
      })
    },

    adddialogclose() {
      this.$refs.editFormRefa.resetFields()
    },
    adddialogclose() {
      this.$refs.tjref.resetFields()
    },
    //添加用户,有问题
    addUser() {
      this.$refs.tjref.validate(async valid => {
        if (!valid) return
        // 可以发起添加用户的网络请求
        const { data: res } = await this.$http.get('roles', this.addForm)
        if (res.meta.status !== 200) {
          return this.$message.error('添加用户失败！')
        }
        this.$message.success('添加用户成功！')
        // 隐藏添加用户的对话框
        this.dialogVisible = false
        // 重新获取用户列表数据
        this.getRolesList()
      })
    },
    //
    async show(role) {
      const { data: res } = await this.$http.get('rights/tree')
      //因为数据传不到allotRights方法中,所以在弹对话框的时候直接把id保存起来,因为这里可以接收到
      this.roleId = role.id
      // 获取所有权限的数据

      if (res.meta.status !== 200) {
        return this.$message.error('获取权限数据失败！')
      }
      this.datalog = res.data

      // 递归获取三级节点的Id,当递归函数成功之后这(this.defKeys)数组,肯定是已经拥有的三级id,也就是之前给他的那些权限
      this.getLeafKeys(role, this.defKeys)
      this.assignpermissions = true
    },

    // 通过递归的形式，获取角色下所有三级权限的id，并保存到 defKeys 数组中
    getLeafKeys(node, arr) {
      // 如果当前 node 节点不包含 children 属性，则是三级节点
      if (!node.children) {
        return arr.push(node.id)
      }
      //每循环一次拿到一个子节点item,在根据item再次调用递归函数,当递归完毕之后,把所有三级节点保存到arr数组中
      node.children.forEach(item => this.getLeafKeys(item, arr))
    },

    // 监听分配权限对话框的关闭事件
    nog() {
      this.defKeys = []
    },

    // 点击为角色分配权限
    async allotRights() {
      //es6语法
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(), //获取所有已经选中id数组
        ...this.$refs.treeRef.getHalfCheckedKeys() //返回目前半选中的节点的id的数组,也就是返回之前没有选择的数据
      ]
      const idStr = keys.join(',') //用,把他们拼接为字符串形式
      const { data: res } = await this.$http.post(
        `roles/${this.roleId}/rights`,
        { rids: idStr }
      )
      if (res.meta.status !== 200) {
        return this.$message.error('分配权限失败！')
      }
      this.$message.success('分配权限成功！')
      this.getRolesList()
      this.assignpermissions = false
    }
  }
}
</script>
<style scoped>
.el-table {
  margin-top: 20px;
}
.el-tag {
  margin: 7px;
}
.bdtop {
  border-top: 1px solid #eee;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>