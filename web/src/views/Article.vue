<template>
  <div class="page-artivle" v-if="model">
    <div class="d-flex ai-center py-3 header">
     <span class="el-icon-arrow-left text-blue"></span>
     <strong class="flex-1 text-blue font-size-lg">{{model.title}}</strong>
     <span class="font-size-xs text-grey-4">{{model.createdAt | data}}</span>
    </div>
    <div v-html="model.body" class="p-2 bodys font-size-xl"></div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
   filters: {
    data(val) {
      return dayjs(val).format("20YY-MM-DD");
    },
  },
props: {
  id: {
   required: true
  }
},
data() {
  return {
    model: null
  }
},
methods: {
 async fecth() {
   const res = await this.$http.get(`articles/${this.id}`) 
   this.model = res.data
  }
},
created() {
  this.fecth()
}
}
</script>

<style lang="scss">
.header {
border-bottom: 1px solid #d4d4d5;
}
.bodys {
  p {
    line-height: 1.5em;
  }
  img {
    width: 100%;
    height: auto;
  }
  iframe {
    width: 100% ;
    height: auto;
  }
  h1 {
    font-size: 1.538462rem;
  }
  h2 {
    font-size: 1.384615rem;
  }
}
</style>