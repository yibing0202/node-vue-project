<template>
  <div class="catedit">
   <h2 class="header">{{id ? "编辑" : "新建"}}广告位</h2>
   <el-form label-width="120px" @submit.native.prevent="save">
     <el-form-item label="名称" >
       <el-input v-model="model.name"></el-input>
     </el-form-item>
     <el-form-item label="广告详情">
        <el-button class="el-icon-plus" @click="model.items.push({})"
            style="margin-bottom: 2rem">添加广告</el-button
          >
          <el-row>
            <el-col :md="24" v-for="(item, index) in model.items" :key="index">
              <el-form-item label="跳转地址">
                <el-input v-model="item.url"></el-input>
              </el-form-item>
              <el-form-item label="详情图片" style="margin-top: 1.2rem">
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL + '/upload'"
                  :headers="getHeadersAuthor()"
                  :show-file-list="false"
                  :on-success="res => $set(item, 'image', res.url)"
                >
                  <img v-if="item.image" :src="item.image" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item>
                 <el-button type="danger" @click="model.items.splice(index, 1)" style="float: right; margin-bottom: 1rem">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
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
    items: []
    },
  }
},
methods: {
  async save() {
    let res
    if (this.id) {
      res = await this.$http.put(`/rest/ads/${this.id}`,this.model)
    } else {
      res = await this.$http.post('/rest/ads',this.model)
    }
    this.$router.push('/ads/list')
    this.$message({
      type: 'success',
      message: '保存成功'
    })
  },
  async fetch() {
    const res = await this.$http.get(`/rest/ads/${this.id}`)
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