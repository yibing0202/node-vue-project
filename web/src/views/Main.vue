<template>
  <div>
    <div class="topbar bg-dark-2 py-2 px-3 d-flex ai-center">
      <img src="../assets/img/logo.png" alt="" height="30" class="mr-3">
      <div class="flex-1">
        <p class="m-0 text-white">王者荣耀</p>
        <p class="m-0 text-grey-1 mt-1">团队成就更多</p>
      </div>
      <button class="btn">立即下载</button>
    </div>
    <div class=" bg-primary pt-3 pb-2">
     <div class="nav d-flex jc-around text-white text-center">
       <div class="nav-item active nav-reverse">
         <router-link tag="div" to="/1" class="mb-1">首页</router-link>
       </div>
       <div class="nav-item">
         <router-link  tag="div" to="/2">攻略中心</router-link>
       </div>
       <div class="nav-item">
         <router-link  tag="div" to="/3">赛事中心</router-link>
       </div>
       <div class="nav-item">
         <router-link  tag="div" to="/4">IP新游</router-link>
       </div>
     </div>
    </div>
    <router-view></router-view>

  </div>
</template>

<script>
export default {

}
</script>

<style>
.topbar {
  position: sticky;
  top: 0;
  z-index: 9;
}
</style>