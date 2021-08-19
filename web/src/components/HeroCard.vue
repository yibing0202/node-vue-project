<template>
<div class="bg-white mt-3 p-3">
  <div class="card-head mb-3 d-flex ai-center" >
 
 <img :src="icon.imgPath" width="15px" class="mr-2">
 <h2 class="font-size-xl">{{title}}</h2>
  </div>
  <div class="card-body">
    <slot></slot>
  </div>
</div>
  
</template>

<script>
export default {
props: {
  icon: {type: String, required: true},
  title: {type: String, required: true}
}
}
</script>

<style>

</style>