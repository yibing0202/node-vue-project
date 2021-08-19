<template>
  <m-card :icon="icon" :title="title">
     <div class="card-body mt-3">
      <div class="nav d-flex jc-between">
        <div class="nav-item" :class="{active: active === i}" v-for="(item,i) in categories" :key="i" @click="$refs.list.swiper.slideTo(i)">
          <div class="nav-link" @click="active = i">{{item.name}}</div>
        </div>
      </div>

      <!-- <div class="block">
    <el-carousel height="160px" indicator-position="none" arrow="hover" :autoplay="false">
      <el-carousel-item v-for="(item, i) in categories" :key="i" class="mt-3 font-size-lg">
      <slot name="items" :category="item"></slot>
      </el-carousel-item>
    </el-carousel>
  </div> -->
   <swiper :options="{autoHeight: true}" ref="list" @slide-change="() => active = $refs.list.swiper.realIndex">
    <swiper-slide v-for="(item, i) in categories" :key="i" class="mt-3 font-size-lg">
      <slot name="items" :category="item"></slot>
    </swiper-slide>
    
  </swiper>
    </div>
  </m-card>
</template>

<script>
export default {
props: {
  icon: {type: String, required: true },
  title: {type: String, required: true },
  categories: {type: Array, required: true },
},
data() {
  return {
    active: 0
  }
},
}
</script>

<style>

</style>