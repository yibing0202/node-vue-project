<template>
  <div class="login">
    <el-card class="box-card">
  <div slot="header" class="clearfix" style="text-align: center; font-size: 28px">
    <span >登录</span>
  </div>
 <el-form @submit.native.prevent="login"> 
   <el-form-item label="用户名" label-width="100px">
     <el-input v-model="model.username"></el-input>
   </el-form-item>
   <el-form-item label="密码" label-width="100px">
     <el-input type="password" v-model=" model.password"></el-input>
   </el-form-item>
   <el-form-item>
     <el-button type="primary" native-type="submit" style="float: right">登录</el-button>
   </el-form-item>
 </el-form>
</el-card>
  </div>
</template>

<script>
export default {
data() {
  return {
    model: {

    }
  }
},
methods: {
  async login() {
  const res = await this.$http.post('login', this.model)
  localStorage.token = res.data.token
  this.$router.push('/')
  this.$message({
    type: 'success',
    message: '登录成功'
  })
  }
}
}
</script>

<style>
.login {
  width: 50%;
  margin: 10rem auto;
}
</style>