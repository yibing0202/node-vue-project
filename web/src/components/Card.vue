<template>
  <div class="card mt-3 bg-white p-3">
    <div class="card-header d-flex pb-4">
      <i class="iconfont" :class="`icon-${icon}`"></i>
      <span class="flex-1 ml-2 font-size-xl">{{title}}</span>
      <i class="iconfont icon-more"></i>
    </div>
     <div class="card-body mt-3">
     <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
   title: {type: String, required: true},
   icon: {type: String, required: true}
  }

}
</script>

<style lang="scss">
@import '../assets/scss/variables.scss';
.card-header {
  border-bottom: 1px solid $bd-color;
}
.card {
  border-top: 1px solid $bd-color;
  border-bottom: 1px solid $bd-color;
}
</style>
