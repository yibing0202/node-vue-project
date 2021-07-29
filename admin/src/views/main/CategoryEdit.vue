<template>
  <div class="catedit">
   <h2 class="header">{{id ? "编辑" : "新建"}}分类</h2>
   <el-form label-width="120px" @submit.native.prevent="save">
     <el-form-item label="上级分类">
       <el-select v-model="model.parent" placeholder="请选择">
    <el-option
      v-for="item in parents"
      :key="item._id"
      :label="item.name"
      :value="item._id">
    </el-option>
  </el-select>
     </el-form-item>
     <el-form-item label="名称" >
       <el-input v-model="model.name"></el-input>
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

    },
    parents: []
  }
},
methods: {
  async save() {
    let res
    if (this.id) {
      res = await this.$http.put(`/rest/category/${this.id}`,this.model)
    } else {
      res = await this.$http.post('/rest/category',this.model)
    }
    this.$router.push('/category/list')
    this.$message({
      type: 'success',
      message: '保存成功'
    })
  },
  async fetch() {
    const res = await this.$http.get(`/rest/category/${this.id}`)
    this.model = res.data
  },
  async fetchParents() {
    const res = await this.$http.get('/rest/category')
    this.parents = res.data
  }
},
created() {
  this.id && this.fetch()
  this.fetchParents()
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