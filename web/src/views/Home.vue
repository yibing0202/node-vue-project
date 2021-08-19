<template>
  <div>
    <div class="block">
      <el-carousel height="164px">
        <el-carousel-item>
          <img
            src="../assets/img/735b9ff4f494bef7e7ef75a0a870b76b.jpeg"
            alt=""
            class="h-100"
          />
        </el-carousel-item>
        <el-carousel-item>
          <img
            src="../assets/img/9809fa647d514579fcfc3c90d75fa8d0.jpeg"
            alt=""
            class="h-100"
          />
        </el-carousel-item>
        <el-carousel-item>
          <img
            src="../assets/img/cc1ecd960280bceb871baaaeaab5e9ea.jpeg"
            alt=""
            class="h-100"
          />
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="nav-icon mt-3 pt-4 bg-white">
      <div class="d-flex fl-warp">
        <div class="nav-item text-center mb-4">
          <i class="sprite sprite-news mb-1"></i>
          <p class="m-0">爆料站</p>
        </div>
        <div class="nav-item text-center mb-4">
          <i class="sprite sprite-story mb-1"></i>
          <p class="m-0">故事站</p>
        </div>
        <div class="nav-item text-center mb-4">
          <i class="sprite sprite-shop mb-1"></i>
          <p class="m-0 p-shop">周边商城</p>
        </div>
        <div class="nav-item text-center mb-4">
          <i class="sprite sprite-test mb-1"></i>
          <p class="m-0">体验服</p>
        </div>
        <div class="nav-item text-center mb-4">
          <i class="sprite sprite-new mb-1"></i>
          <p class="m-0">新人专区</p>
        </div>
        <div class="nav-item text-center mb-4">
          <i class="sprite sprite-inherit mb-1"></i>
          <p class="m-0">荣耀 传承</p>
        </div>
        <div class="nav-item text-center mb-4">
          <i class="sprite sprite-home mb-1"></i>
          <p class="m-0 p-home">王者营地</p>
        </div>
        <div class="nav-item text-center mb-4">
          <i class="sprite sprite-number mb-1"></i>
          <p class="m-0">公众号</p>
        </div>
        <div class="nav-item text-center mb-4">
          <img
            src="../assets/img/version-icon.png"
            height="20"
            class="mb-1"
            alt=""
          />
          <p class="m-0">版本介绍</p>
        </div>
        <div class="nav-item text-center mb-4">
          <img src="../assets/img/djhj.png" height="20" class="mb-1" alt="" />
          <p class="m-0">对局环境</p>
        </div>
        <div class="nav-item text-center mb-4">
          <img src="../assets/img/ipgc.png" height="20" class="mb-1" alt="" />
          <p class="m-0">IP共创计划</p>
        </div>
        <div class="nav-item text-center mb-4">
          <img src="../assets/img/cyhdy.png" height="20" class="mb-1" alt="" />
          <p class="m-0">创意互动营</p>
        </div>
      </div>
      <div class="bg-grey-6 py-2 text-center font-size-sm">
        <i class="sprite sprite-up"></i>
        <span>收起</span>
      </div>
    </div>

    <m-list-card icon="menu" title="新闻资讯" :categories="newCats">
      <template #items="{ category }">
        <router-link tag="div" :to="`/articles/${item._id}`"
          v-for="(item, i) in category.newsList"
          :key="i"
          class="mb-3 mt-3 d-flex"
        >
          <span class="hot-card mr-1 font-size-sm">{{
            item.categoryName
          }}</span>
          <span class="flex-1 box">{{ item.title }}</span>
          <span class="ml-1">{{ item.createdAt | data }}</span>
        </router-link>
      </template>
    </m-list-card>

    <m-list-card icon="a-Alien2" title="英雄列表" :categories="heroCats">
      <template #items="{ category }">
        <div 
        class="d-flex fl-warp pb-2" style="margin: 0 -0.5rem">
          <router-link tag="div" :to="`/heroes/${item._id}`"
            v-for="(item, i) in category.heroList"
            :key="i"
            style="width: 20%"
            class="p-2"
          >
            <div class="text-center">
              <img :src="item.avatar" alt="" class="w-100" />
              <p class="font-size-md m-0 mt-1">{{ item.name }}</p>
            </div>
          </router-link>
        </div>
      </template>
    </m-list-card>
    <m-list-card icon="Video" title="精彩视频" :categories="videoCats">
      <template #items="{ category }">
        <div class="mb-3 mt-2 d-flex fl-warp">
          <div
            v-for="(item, i) in category.videoList"
            :key="i"
            style="width: 47%"
            class="ml-2"
          >
            <div class="">
              <img :src="item.avatar" style="width: 100%" />
              <p class="font-size-md box2" style="height: 30px">
                {{ item.title }}
              </p>
              <div class="d-flex font-size-sm text-grey-4" style="margin-top: -0.5rem; margin-bottom: 1.5rem">
                <span class="v-num"><i class="el-icon-view mr-1"></i>{{item.num}}</span>
                <span class="flex-1"></span>
                <span class="v-time">{{item.createdAt | data}}</span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </m-list-card>

  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  filters: {
    data(val) {
      return dayjs(val).format("MM/DD");
    },
  },
  methods: {
    async fecthNewsCats() {
      const res = await this.$http.get("news/list");
      this.newCats = res.data;
    },
    async fecthHeroCats() {
      const res = await this.$http.get("heroes/list");
      this.heroCats = res.data;
    },
    async fecthVideoCats() {
      const res = await this.$http.get("videos/list");
      this.videoCats = res.data;
    },
  },
  created() {
    this.fecthNewsCats();
    this.fecthHeroCats();
    this.fecthVideoCats();
  },
  data() {
    return {
      newCats: [],
      heroCats: [],
      videoCats: [],
    };
  },
};
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";

.nav-icon {
  .nav-item {
    width: 25%;
    border-left: 2px solid $bd-color;
    &:nth-child(4n + 1) {
      border-left: none;
    }
  }
}
.p-shop {
  margin-top: -2px;
}
.p-home {
  margin-top: -4px;
}
.box {
  white-space:nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.box2 {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.card-body {
  .hot-card {
    padding: 1px;
    color: map-get($map: $colors, $key: "red");
    border: 1px solid map-get($map: $colors, $key: "red");
    border-radius: 0.230769rem;
  }
}
</style>