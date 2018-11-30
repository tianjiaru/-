<template>
  <div class="box">
    <el-row :gutter="10" type="flex" justify="center" align="middle" class="login-row">
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" class="login-col">
        <el-form class="login-form" :label-position="labelPosition" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      labelPosition: 'top',
      ruleForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 登录事件：
    submitForm (formName) {
      // validate 方法用来实现表单校验
      this.$refs.ruleForm.validate(valid => {
        if (!valid) {
          return false
        }

        // 校验成功
        // 发送请求到登录接口，完成登录
        axios
          .post('http://localhost:8888/api/private/v1/login', this.ruleForm)
          .then(res => {
            console.log('登录结果：', res)
            if (res.data.meta.status === 200) {
              // 1 登录成功，跳转到后台首页
              // 2 将 token 存储到localStorage中
              // localStorage.setItem('token',res.data)
              localStorage.setItem('token', res.data.data.token)
              // 通过编程式导航实现路由跳转
              // push 方法的参数为：要跳转到的页面路径，与 路由规则 中的path匹配
              this.$router.push('/home')
              this.$message({
                message: res.data.meta.msg,
                type: 'success',
                duration: 1000
              })
            } else {
              // 登录失败
              this.$message({
                message: res.data.meta.msg,
                type: 'error',
                duration: 1000
              })
            }
          })
      })
    },
    // 表单重置：
    resetForm (formName) {
      // resetFields 方法用来重置表单
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less">
.box {
  width: 100%;
  height: 100%;
  background: #2d434c;
  .login-form {
    padding: 20px;
    background: #fff;
    border-radius: 20px;
  }
}
.login-row {
  width: 100%;
  height: 100%;
  position: relative;
  .login-col {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
