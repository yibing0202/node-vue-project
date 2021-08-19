<template>
  <div class="catedit">
    <h2 class="header">{{ id ? "编辑" : "新建" }}英雄</h2>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs value="message" type="border-card">
        <el-tab-pane name="message" label="基础信息">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :show-file-list="false"
              :headers="getHeadersAuthor()"
              :on-success="res => $set(model,'avatar', res.url)"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="背景图" class="banner">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :show-file-list="false"
              :headers="getHeadersAuthor()"
              :on-success="res => $set(model, 'banner', res.url)"
            >
              <img v-if="model.banner" :src="model.banner" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple placeholder="请选择">
              <el-option
                v-for="item in categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上手难度">
            <el-rate
              style="margin-top: 0.8rem"
              :max="10"
              show-score
              v-model="model.scores.difficult"
            ></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate
              style="margin-top: 0.8rem"
              :max="10"
              show-score
              v-model="model.scores.skill"
            ></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate
              style="margin-top: 0.8rem"
              :max="10"
              show-score
              v-model="model.scores.attack"
            ></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate
              style="margin-top: 0.8rem"
              :max="10"
              show-score
              v-model="model.scores.exist"
            ></el-rate>
          </el-form-item>
         <el-form-item label="皮肤数">
            <el-input v-model="model.skinNum"></el-input>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.item1" multiple placeholder="请选择">
              <el-option
                v-for="item in items"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.item2" multiple placeholder="请选择">
              <el-option
                v-for="item in items"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="主升">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :show-file-list="false"
              :headers="getHeadersAuthor()"
              :on-success="res => $set(model,'upMain', res.url)"
            >
              <img v-if="model.upMain" :src="model.upMain" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
               <el-form-item label="副升">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :show-file-list="false"
              :headers="getHeadersAuthor()"
              :on-success="res => $set(model,'upLess', res.url)"
            >
              <img v-if="model.upLess" :src="model.upLess" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
               <el-form-item label="召唤师技能">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :show-file-list="false"
              :headers="getHeadersAuthor()"
              :on-success="res => $set(model,'sumSkills', res.url)"
            >
              <img v-if="model.sumSkills" :src="model.sumSkills" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.useTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.resistTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="inscription" label="铭文推荐">
          <el-button class="el-icon-plus" @click="model.inscription.push({})"
            >添加铭文</el-button
          >
          <el-row>
            <el-col :md="12" v-for="(item, index) in model.inscription" :key="index">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="铭文图标">
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL + '/upload'"
                  :headers="getHeadersAuthor()"
                  :show-file-list="false"
                  :on-success="res => $set(item, 'icon', res.url)"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="铭文描述">
                <el-input type="textarea" v-model="item.descriptions"></el-input>
              </el-form-item>
              <el-form-item>
                 <el-button type="danger" @click="model.inscription.splice(index, 1)" style="float: right">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane name="skill" label="技能">
          <el-button class="el-icon-plus" @click="model.skills.push({})"
            >添加技能</el-button
          >
          <el-row>
            <el-col :md="12" v-for="(item, index) in model.skills" :key="index">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="技能图片">
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL + '/upload'"
                  :headers="getHeadersAuthor()"
                  :show-file-list="false"
                  :on-success="res => $set(item, 'icon', res.url)"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="消耗">
                <el-input type="text" v-model="item.deplete"></el-input>
              </el-form-item>
              <el-form-item label="冷却值">
                <el-input type="text" v-model="item.CD"></el-input>
              </el-form-item>
              <el-form-item label="技能描述">
                <el-input type="textarea" v-model="item.descriptions"></el-input>
              </el-form-item>
              <el-form-item>
                 <el-button type="danger" @click="model.skills.splice(index, 1)" style="float: right">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane name="partners" label="最佳搭档">
          <el-button class="el-icon-plus" @click="model.partners.push({})"
            >添加英雄</el-button
          >
          <el-row>
            <el-col :md="12" v-for="(item, index) in model.partners" :key="index">
              <el-form-item label="英雄名称">
                <el-select filterable  v-model="item.hero">
                  <el-option
                v-for="hero in heroes"
                :key="hero._id"
                :label="hero.name"
                :value="hero._id"
              >
              </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="英雄描述">
                <el-input type="textarea" v-model="item.descriptions"></el-input>
              </el-form-item>
              <el-form-item>
                 <el-button type="danger" @click="model.partners.splice(index, 1)" style="float: right">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane name="reRestrained" label="被谁克制">
          <el-button class="el-icon-plus" @click="model.reRestrained.push({})"
            >添加英雄</el-button
          >
          <el-row>
            <el-col :md="12" v-for="(item, index) in model.reRestrained" :key="index">
              <el-form-item  label="英雄名称">
                <el-select filterable v-model="item.hero">
                  <el-option
                v-for="hero in heroes"
                :key="hero._id"
                :label="hero.name"
                :value="hero._id"
              >
              </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="英雄描述">
                <el-input type="textarea" v-model="item.descriptions"></el-input>
              </el-form-item>
              <el-form-item>
                 <el-button type="danger" @click="model.reRestrained.splice(index, 1)" style="float: right">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane name="restrained" label="克制谁">
          <el-button class="el-icon-plus" @click="model.restrained.push({})"
            >添加英雄</el-button
          >
          <el-row>
            <el-col :md="12" v-for="(item, index) in model.restrained" :key="index">
              <el-form-item  label="英雄名称">
                <el-select filterable v-model="item.hero">
                  <el-option
                v-for="hero in heroes"
                :key="hero._id"
                :label="hero.name"
                :value="hero._id"
              >
              </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="英雄描述">
                <el-input type="textarea" v-model="item.descriptions"></el-input>
              </el-form-item>
              <el-form-item>
                 <el-button type="danger" @click="model.restrained.splice(index, 1)" style="float: right">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top: 1rem">
        <el-button type="primary" native-type="submit" class="new-btn"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      categories: [],
      items: [],
      heroes: [],
      model: {
        scores: {
          difficult: 0,
          skill: 0,
          attack: 0,
          exist: 0,
        },
        skills: [],
        inscription: [],
        partners: [],
        restrained: [],
        reRestrained: []
      },
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`/rest/heroes/${this.id}`, this.model);
      } else {
        res = await this.$http.post("/rest/heroes", this.model);
      }
      this.$router.push("/heroes/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    async fetch() {
      const res = await this.$http.get(`/rest/heroes/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    },
    async fetchCategory() {
      const res = await this.$http.get(`/rest/category`);
      this.categories = res.data;
    },
    async fetchItems() {
      const res = await this.$http.get(`/rest/items`);
      this.items = res.data;
    },
    async fetchHeroes() {
      const res = await this.$http.get(`/rest/heroes`);
      this.heroes = res.data;
    }
  },
  created() {
    this.fetchItems();
    this.fetchCategory();
    this.fetchHeroes();

    this.id && this.fetch();
  },
};
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
.banner .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
 .banner .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
 .banner .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 375px;
    height: 165px;
    line-height: 165px;
    text-align: center;
  }
 .banner .avatar {
    width: 375px;
    height: 165px;
    display: block;
  }
</style>