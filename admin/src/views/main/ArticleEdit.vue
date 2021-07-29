<template>
  <div class="catedit">
   <h2 class="header">{{id ? "编辑" : "新建"}}文章</h2>
   <el-form label-width="120px" @submit.native.prevent="save">
     <el-form-item label="所属分类">
       <el-select v-model="model.categories" placeholder="请选择" multiple >
    <el-option
      v-for="item in categories"
      :key="item._id"
      :label="item.name"
      :value="item._id">
    </el-option>
  </el-select>
     </el-form-item>
     <el-form-item label="标题" >
       <el-input v-model="model.title"></el-input>
     </el-form-item>
     <el-form-item label="详情" >
        <vue-editor v-model="model.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
     </el-form-item>
     <el-form-item>
       <el-button type="primary" native-type="submit" class="new-btn">提交</el-button>
     </el-form-item>
   </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor
  },
  props: {
    id: {
      type: String
    }
  },
data() {
  return {
    model: {

    },
    categories: []
  }
},
methods: {
   async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post('upload', formData)
      Editor.insertEmbed(cursorLocation, "image", res.data.url)
      resetUploader()
    },
  async save() {
    let res
    if (this.id) {
      res = await this.$http.put(`/rest/articles/${this.id}`,this.model)
    } else {
      res = await this.$http.post('/rest/articles',this.model)
    }
    this.$router.push('/articles/list')
    this.$message({
      type: 'success',
      message: '保存成功'
    })
  },
  async fetch() {
    const res = await this.$http.get(`/rest/articles/${this.id}`)
    this.model = res.data
  },
  async fetchCategories() {
    const res = await this.$http.get('/rest/category')
    this.categories = res.data
  }
},
created() {
  this.id && this.fetch()
  this.fetchCategories()
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