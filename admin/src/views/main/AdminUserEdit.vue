<template>
  <div class="catedit">
   <h2 class="header">{{id ? "编辑" : "新建"}}管理员</h2>
   <el-form label-width="120px" @submit.native.prevent="save">
     <el-form-item label="用户名" >
       <el-input v-model="model.username"></el-input>
     </el-form-item>
     <el-form-item label="密码" >
       <el-input type="text" v-model="model.password"></el-input>
     </el-form-item>
     <el-form-item>
       <el-button type="primary" native-type="submit" class="new-btn">提交</el-button>
     </el-form-item>
   </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String
    }
  },
data() {
  return {
    model: {

    }
  }
},
methods: {
  async save() {
    let res
    if (this.id) {
      res = await this.$http.put(`/rest/admin_user/${this.id}`,this.model)
    } else {
      res = await this.$http.post('/rest/admin_user',this.model)
    }
    this.$router.push('/admin_user/list')
    this.$message({
      type: 'success',
      message: '保存成功'
    })
  },
  async fetch() {
    const res = await this.$http.get(`/rest/admin_user/${this.id}`)
    this.model = res.data
  }
},
created() {
  this.id && this.fetch()
}
}
</script>

<style>
.catedit {
  padding: 20px;
}
.catedit .header {
  width: 100%;
  text-align: center;
}
.new-btn {
  float: right;
}
</style>