<template>
  <div class="hero">
   <div class="topbar bg-dark py-2 px-3 d-flex ai-center text-white">
      <img src="../assets/img/logo.png" alt="" height="30" class="mr-3">
      <div class="flex-1">
        <span class="m-0 mr-3">王者荣耀</span>
        <span class="m-0">攻略站</span>
      </div>
      <div>更多英雄 &gt;</div>
    </div>
    <div class="top"  
    :style="{'background-image': `url(${model.banner})`}">
      <div class="info text-white ">
        <p class="py-1">{{model.title}}</p>
        <h2 class="pb-2 name" >{{model.name}}</h2>
        <p class="pb-1">{{model.categories.map(v => v.name).join('/')}}</p>
        <div class="scores" v-if="model.scores">
        <span>难度</span>
        <i class="bg-orange">{{model.scores.difficult}}</i>
        <span>技能</span>
        <i class="bg-blue">{{model.scores.skill}}</i>
        <span>攻击</span>
        <i class="bg-red">{{model.scores.attack}}</i>
        <span>生存</span>
        <i class="bg-dark-4">{{model.scores.exist}}</i>
        </div>
        <div class="skin text-grey-3">
          <span >皮肤：</span> <i>{{model.skinNum}} &gt;</i>
        </div>
      </div>
    </div>
    <div class="main ">
     <div class="d-flex jc-around py-3 bd-bottom bg-white">
        <div class="nav-item" :class="{active: active === i}" v-for="(item, i) in title" :key="i" @click="$refs.list.swiper.slideTo(i)">
          <div class="item-link" @click="active = i">{{item}}</div>
        </div>
        
     </div>
       <swiper ref="list" @slide-change="() => active = $refs.list.swiper.realIndex">
          <swiper-slide>
           <div class="skill bg-white p-2">
             <div class="other d-flex jc-around pt-2">
               <div class="d-flex ai-center jc-center bg-grey-8 bd">
                 <img src="../assets/img/icon_06.png" alt="" class="mr-2">
                <p > 英雄介绍视频</p>
                 </div>
             <div class="d-flex ai-center jc-center  bg-grey-8 bd">
               <img src="../assets/img/icon_07.png" alt="" class="mr-3">
               <p>一图识英雄</p>
               </div>
             </div>  
             <div class="icon d-flex jc-around pt-3">
               <img :src="item.icon"
               @click="currentSkillIndex = i"
               :class="{active: currentSkillIndex === i}"
               v-for="(item, i) in model.skills" :key="i">
               </div>  
               <div class="skill-content mt-4">
                 <div class="mb-4">
                   <span style="font-weight: 900" class="font-size-xl mr-4">{{currentSkill.name}}</span>
                 <span class="font-size-sm text-grey-4">(冷却值：{{currentSkill.CD}} 消耗：{{currentSkill.deplete}})</span>
                 </div>
                 <p>{{currentSkill.descriptions}}</p>
               </div>
           </div>
            <hero-card title="加点建议" :icon="imgs[0]">
              <div class="d-flex upRecom jc-around">
                <div class="main">
                  <p class="text-center">主升</p>
                  <img :src="model.upMain" alt="">
                 
                </div>
                <div class="less">
                   <p class="text-center">副升</p>
                  <img :src="model.upLess" alt="">
                </div>
                <div class="sumSkill">
                   <p>召唤师技能</p>
                  <img :src="model.sumSkills" alt="">
                </div>
              </div>
            </hero-card>
            <hero-card title="出装顺序" :icon="imgs[5]">
           <div class="itemRecom">
              <div class="good bd-bottom pb-2">
               <p class="font-size-lg pb-3">顺风出装</p>
            <div class="d-flex jc-around">
               <div v-for="(item, i) in model.item1" :key="i" >
               <img :src="item.icon" alt="">
               <p class="text-center">{{item.name}}</p>
                </div>
            </div>
            </div>
             <div class="bad bd-bottom pb-2">
               <p class="font-size-lg pb-3">逆风出装</p>
            <div class="d-flex jc-around">
               <div v-for="(item, i) in model.item2" :key="i" >
               <img :src="item.icon" alt="">
               <p class="text-center">{{item.name}}</p>
                </div>
            </div>
            </div>
           </div>
            </hero-card>
            <hero-card title="铭文推荐" :icon="imgs[4]">
           <div class="d-flex jc-around">
              <div v-for="(item,i) in model.inscription" :key="i">
               <img :src="item.icon" alt="">
              <p class="font-size-xl">{{item.name}}</p>
              <p>{{item.descriptions}}</p>
            </div>
           </div> 
            </hero-card>
            <hero-card title="使用技巧" :icon="imgs[3]">
             <p>{{model.useTips}}</p>
            </hero-card>
             <hero-card title="对抗技巧" :icon="imgs[2]">
              <p>{{model.resistTips}}</p>
            </hero-card>
             <hero-card title="团战思路" :icon="imgs[1]">
               <p>{{model.teamTips}}</p>
            </hero-card>
            <hero-card title="英雄关系" :icon="imgs[6]">
            <div class="relation">
              <div class="partners bd-bottom">
              <p class="pb-2 font-size-xl">最佳搭档</p>
              <div v-for="(item, i) in model.partners" :key="i" class="d-flex mb-3">
            <img :src="item.hero.avatar" alt="" class="mr-3">
            <p>{{item.descriptions}}</p>
            </div>
            </div>
             <div class="reRestrained bd-bottom">
              <p class="pb-2 font-size-xl">被谁克制</p>
              <div v-for="(item, i) in model.reRestrained" :key="i" class="d-flex mb-3">
            <img :src="item.hero.avatar" alt="" class="mr-3">
            <p>{{item.descriptions}}</p>
            </div>
            </div>
             <div class="restrained bd-bottom">
              <p class="pb-2 font-size-xl">克制谁</p>
              <div v-for="(item, i) in model.restrained" :key="i" class="d-flex mb-3">
            <img :src="item.hero.avatar" alt="" class="mr-3">
            <p>{{item.descriptions}}</p>
            </div>
            </div>
            </div>
            </hero-card>
          </swiper-slide>
          <swiper-slide>2</swiper-slide>
        </swiper>
    </div>
  </div>
</template>

<script>
export default {
props: {
  id: { 
    required: true
  }
},
data() {
  return {
    model: null,
    title: ['英雄初识','进阶攻略'],
    active: 0,
    currentSkillIndex: 0,
    imgs: [{
      "imgPath": require('../assets/img/icon_16.png')
    },
    {
      "imgPath": require('../assets/img/icon_15.png')
    },
    {
      "imgPath": require('../assets/img/icon_14.png')
    },
    {
      "imgPath": require('../assets/img/icon_13.png')
    },
    {
      "imgPath": require('../assets/img/icon_12.png')
    },
    {
      "imgPath": require('../assets/img/icon_11.png')
    },
    {
      "imgPath": require('../assets/img/icon_08.png')
    }
    ] 
  }
},
computed: {
  currentSkill() {
   return this.model.skills[this.currentSkillIndex]
  }
},
created() {
  this.fetch()
},
methods: {
  async fetch() {
    const res = await this.$http.get(`/heroes/${this.id}`)
    this.model = res.data
  }
},
}
</script>

<style lang="scss">
@import '../assets/scss/variables.scss';
.hero {
  .top {
    position: relative;
    height: 50vw;
    background: #fff no-repeat top center;
    background-size: auto 100% ;
    .name {
      font-size: 18px;
    }
    .scores {
     i {
       display: inline-block;
       width: 16px;
       height: 16px;
       line-height: 16px;
       text-align: center;
      font-size: 8px !important;
       border-radius: 8px;
       margin: 0 .769231rem;
     }
    }
    .skin {
      position: absolute;
      bottom: .769231rem;
      right: 0;
    }
  }
  p {
    margin: 0;
    line-height: 1.5em;
  }
  h2 {
    margin: 0;
  }
  .info {

    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding-bottom: .769231rem;
    padding-left: .769231rem;
    background-image: linear-gradient(to top, rgba(0,0,0,1), rgba(255,255,255,0))
  }
  .main {
    .other {
      height: 60px;
      .bd {
        border: 1px solid #eceef0;
      }
      div {
        width: 172px;
        height: 39px;
        img {
          width: 20px;
          height: 20px;
        }
      }
    }
    .skill {
      .icon {
        width: 100%;
        img {
        width: 65px;
        height: 65px;
        }
        .active {
          border-radius: 30px;
          border: 3px solid map-get($map: $colors, $key: "primary");
        }
      }
    }
  }
  .upRecom {
    img {
      width: 60px;
    }
    .sumSkill {
      img {
        border-radius: 30px;
      }
    }
  } 
  .itemRecom {
    img {
      width: 46px;
      border-radius: 23px;
    }
  }
  .relation {
    img {
      width: 48px;
      height: 48px;
    }
  }
}
</style>