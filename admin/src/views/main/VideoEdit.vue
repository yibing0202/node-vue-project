<template>
  <div class="catedit">
   <h2 class="header">{{id ? "编辑" : "新建"}}视频</h2>
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
      <el-form-item label="封面" >
       <el-upload
  class="avatar-uploader"
  :action="$http.defaults.baseURL + '/upload'"
  :headers="getHeadersAuthor()"
  :show-file-list="false"
  :on-success="afterUpload"
  :before-upload="beforeAvatarUpload">
  <img v-if="model.avatar" :src="model.avatar" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>

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
    categories: []
  }
},
methods: {
   afterUpload(res) {
    this.$set(this.model,'icon',res.url)
  },

  async save() {
    let res
    if (this.id) {
      res = await this.$http.put(`/rest/videos/${this.id}`,this.model)
    } else {
      res = await this.$http.post('/rest/videos',this.model)
    }
    this.$router.push('/videos/list')
    this.$message({
      type: 'success',
      message: '保存成功'
    })
  },
  async fetch() {
    const res = await this.$http.get(`/rest/videos/${this.id}`)
    this.model = res.data
  },
  async fetchParents() {
    const res = await this.$http.get('/rest/category')
    this.categories = res.data
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
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 375px;
    height: 165px;
    line-height: 165px;
    text-align: center;
  }
  .avatar {
    width: 375px;
    height: 165px;
    display: block;
  }
</style>