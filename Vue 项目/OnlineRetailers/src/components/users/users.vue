<template>
  <!-- 面包屑导航 -->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    <el-card>
      <!-- 输入框 -->
      <el-row :gutter="20">
        <!--gutter="20"边距,:span="7"站的位置-->
        <el-col :span="7">
          <!--clear清除数据,相当于刷新页面,getUserList里面存放的数据-->
          <!--@click="getUserList"搜索字母一样的数据-->
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="searchfor">
            <el-button slot="append" icon="el-icon-search" @click="searchfor"></el-button>
          </el-input>
        </el-col>
        <!--推荐用户按钮-->
        <el-col :span="4">
          <el-button type="primary" @click="dialogVisible= true">推荐用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表 -->
      <el-table :data="userlist" border stripe>
        <!--border格子一样的线条,stripe隔行变色-->
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="create_time" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="状态" v-slot="scope">
          <!--v-slot接收到了scope里的数据 -->
          <el-switch v-model="scope.row.mg_state" @change="update(scope.row)"></el-switch>
          <!--@change="update(scope.row)把这个数据传入到这个函数中-->
        </el-table-column>
        <el-table-column prop="address" label="操作" width="180px">
          <!-- 添加 -->
          <template v-slot="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row.id)"
            ></el-button>
            <!-- 删除 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="element(scope.row.id)"
            ></el-button>
            <!-- 鼠标停留时显示分配角色 -->
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="no">
              <!-- 分配角色 -->
              <el-button type="warning" icon="el-icon-setting" size="mini" @click="js(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!--分页条，，queryInfo.pagenum动态显示第几页, queryInfo.pagesize动态显示几条数据,layout分页条的排序 total一共多少页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1,5,7,10]"
        :page-size="queryInfo.pagesize"
        layout="prev, pager, next, jumper,total"
        :total="total"
      ></el-pagination>
      <!-- 添加用户对话框, 动态决定dialogVisible显示和隐藏, @close="adddialogVisible"清理form里addFormRef的数据 -->
      <el-dialog title="添加用户" :visible.sync="dialogVisible" @close="adddialogVisible">
        <el-form :model="addForm" :rules="rules" ref="addFormRef">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="addForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addForm.email"></el-input>
          </el-form-item>
          <el-form-item label="电话号码" prop="mobile">
            <el-input v-model="addForm.mobile"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 修改用户的对话框 -->
      <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%" @close="adddialogclose">
        <el-form ref="editFormRef" :model="editForm" :rules="rules">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="editForm.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="editForm.mobile"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editUserionf">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 分配角色 -->
      <el-dialog title="分配角色" :visible.sync="dialogble" width="30%">
        <div class="yhbk">
          <p>
            当前的用户:
            <span>{{userInfo.username}}</span>
          </p>
          <p>
            当前的角色:
            <span>{{userInfo.role_name}}</span>
          </p>
          <p>
            分配新角色:
            <span>
              <el-select v-model="selectedRoleId" placeholder="分配新角色">
                <el-option
                  v-for="item in RolesList"
                  :key="item.id"
                  :label="item.label"
                  :value="item.roleName"
                ></el-option>
              </el-select>
            </span>
          </p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogble = false">取 消</el-button>
          <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </el-breadcrumb>
</template>

<script>
export default {
  data() {
    var checkEmail = (rule, value, cb) => {
      // 验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/

      if (regEmail.test(value)) {
        // 合法的邮箱
        return cb()
      }

      cb(new Error('请输入合法的邮箱'))
    }
    // 验证手机号的规则
    var checkMobile = (rule, value, cb) => {
      // 验证手机号的正则表达式
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/

      if (regMobile.test(value)) {
        return cb()
      }

      cb(new Error('请输入合法的手机号'))
    }
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: '',
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 2
      },
      userlist: [],
      total: 0,
      no: false,
      dialogVisible: false,
      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      //查询的用户资料
      dialogble: false,
      editForm: {},
      //需要分配角色的信息
      userInfo:[],
      //所有角色的数据
      RolesList:[],
      //已经中的角色id值
      selectedRoleId:'',
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getUserList() //用户数据
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get('users', {
        params: this.queryInfo
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取用户列表失败！')
      }
      this.userlist = res.data.users
      this.total = res.data.total
    },
    handleSizeChange(newsize) {
      this.queryInfo.pagesize = newsize //负值
      this.getUserList() //数据发现更新,重新发起数据请求
    },
    handleCurrentChange(newpage) {
      this.queryInfo.pagenum = newpage //负值
      this.getUserList() //数据发现更新,重新发起数据请求
    },
    async update(info) {
      //上面把数据传到了这个参数里update,所有可以通过info拿到里面的参数
      const { data: res } = await this.$http.put(
        `users/${info.id}/state/${info.mg_state}` //``模板字符串,${动态数据}
      )
      if (res.meta.status !== 200) {
        info.mg_state = !info.mg_state
        return this.$message.error('更新状态失败！')
      }
      this.$message.success('更新状态成功')
    },

    // 监听分配角色对话框的关闭事件,清理上面红色文字和选像
    adddialogVisible() {
      this.$refs.addFormRef.resetFields()
    },
    //重置修改用户,清理上面红色文字和选像
    adddialogclose() {
      this.$refs.editFormRef.resetFields()
    },
    // 点击按钮，添加新用户
    addUser() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        // 可以发起添加用户的网络请求
        const { data: res } = await this.$http.post('users', this.addForm)
        if (res.meta.status !== 201) {
          this.$message.error('添加用户失败！')
        }
        this.$message.success('添加用户成功！')
        // 隐藏添加用户的对话框
        this.addDialogVisible = false
        // 重新获取用户列表数据
        this.getUserList()
      })
    },
    async showEditDialog(id) {
      //点击添加图标时,打开添加选项框
      const { data: res } = await this.$http.get('users/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('修改用户失败！')
      }
      this.editForm = res.data
      this.editDialogVisible = true
    },
    editUserionf() {
      //validate验证valid有效的
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        //发起网络请求
        const { data: res } = await this.$http.put(
          'users/' + this.editForm.id,
          { email: this.editForm.email, mobile: this.editForm.mobile }
        )
        if (res.meta.status !== 200) {
          return this.$message.error('更新用户信息失败！')
        }
        // 关闭对话框
        this.editDialogVisible = false
        // 刷新数据列表
        this.getUserList()
        // 提示修改成功
        this.$message.success('更新用户信息成功！')
      })
    },
    // 根据Id删除对应的用户信息
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
      const { data: res } = await this.$http.delete('users/' + id)
      if (res.meta.status !== 200) {
        // return this.$message.error('删除用户失败！')
        return false
      }
      this.$message.success('删除用户成功！')
      this.getUserList()
    },
    async js(userInfo) {
      this.userInfo = userInfo

      const { data: res } = await this.$http.get('roles')
      if (res.meta.status !== 200) {
        return this.$message.error('获取角色列表失败！')
      }
      this.RolesList = res.data

      this.dialogble = true
    },
    // 点击按钮，分配角色
    async saveRoleInfo() {
      if (!this.selectedRoleId) {
        return this.$message.error('请选择要分配的角色！')
      }
      const { data: res } = await this.$http.put(
        `users/${this.userInfo.id}/role`,
        {
          rid: this.selectedRoleId
      })

      if (res.meta.status !== 200) {
        
        return this.$message.error('更新角色失败！')
      }
      this.$message.success('更新角色成功！')
      this.getUserList()
      this.dialogble = false
    },
    searchfor(){
      //解决不处于第一页时搜不到东西的bug
      this.queryInfo.pagenum = 1
      this.getUserList()
    }    
  },

  name: '',
  components: {}
}
</script>
<style scoped>
.el-table,
.el-pagination {
  margin-top: 20px;
}
.el-card {
  position: relative;
  top: 20px;
  width: 100%;
}
.yhbk p span {
  margin-left: 20px;
}
</style>