<template>
  <div class="catedit">
   <h2 class="header">{{id ? "编辑" : "新建"}}物品</h2>
   <el-form label-width="120px" @submit.native.prevent="save">
     <el-form-item label="类型">
       <el-select v-model="model.genre" placeholder="请选择">
    <el-option
      v-for="item in mold"
      :key="item.name"
      :label="item.name"
      :value="item.name">
    </el-option>
  </el-select>
     </el-form-item>
      <el-form-item label="装备名称" >
       <el-input v-model="model.name"></el-input>
     </el-form-item>
      <el-form-item label="图标" >
       <el-upload
  class="avatar-uploader"
  :action="$http.defaults.baseURL + '/upload'"
  :headers="getHeadersAuthor()"
  :show-file-list="false"
  :on-success="afterUpload"
  :before-upload="beforeAvatarUpload">
  <img v-if="model.icon" :src="model.icon" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>

     </el-form-item>
      <el-form-item label="装备价格" >
       <el-input v-model="model.price"></el-input>
     </el-form-item>
      <el-form-item label="基础属性" >
       <el-input v-model="model.basic"></el-input>
     </el-form-item>
      <el-form-item label="装备技能" >
       <el-input v-model="model.skill"></el-input>
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
    mold: [
      {
      id: 1,
      name: '攻击型'
      },
      {
      id: 2,
      name: '法术型'
      },
      {
      id: 3,
      name: '防御性'
      },
      {
      id: 4,
      name: '移动型'
      },
      {
      id: 5,
      name: '辅助型'
      },
      {
      id: 6,
      name: '打野型'
      }
    ]
  }
},
methods: {
  afterUpload(res) {
    this.$set(this.model,'icon',res.url)
  },
  beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
  async save() {
    let res
    if (this.id) {
      res = await this.$http.put(`/rest/items/${this.id}`,this.model)
    } else {
      res = await this.$http.post('/rest/items',this.model)
    }
    this.$router.push('/items/list')
    this.$message({
      type: 'success',
      message: '保存成功'
    })
  },
  async fetch() {
    const res = await this.$http.get(`/rest/items/${this.id}`)
    this.model = res.data
  },
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
  width: 88px;
  height: 88px;
  line-height: 88px;
  text-align: center;
}
.avatar {
  width: 88px;
  height: 88px;
  display: block;
}
</style>