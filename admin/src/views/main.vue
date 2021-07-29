<template>
  <el-container style="height: 100vh;">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu router :default-openeds="openeds" unique-opened default-active="$route.path" active-text-color="skyblue">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>内容管理</template>
         <el-menu-item-group>
          <template slot="title">物品</template>
          <el-menu-item index="/items/new">新建物品</el-menu-item>
          <el-menu-item index="/items/list">物品管理</el-menu-item>
        </el-menu-item-group>
         <el-menu-item-group>
          <template slot="title">英雄</template>
          <el-menu-item index="/heroes/new">新建英雄</el-menu-item>
          <el-menu-item index="/heroes/list">英雄管理</el-menu-item>
        </el-menu-item-group>
         <el-menu-item-group>
          <template slot="title">文章</template>
          <el-menu-item index="/articles/new">新建文章</el-menu-item>
          <el-menu-item index="/articles/list">文章管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-message"></i>运营管理</template>
         <el-menu-item-group>
          <template slot="title">广告位</template>
          <el-menu-item index="/ads/new">新建广告位</el-menu-item>
          <el-menu-item index="/ads/list">广告位管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-message"></i>系统设置</template>
        <el-menu-item-group>
          <template slot="title">分类</template>
          <el-menu-item index="/category/new">新建分类</el-menu-item>
          <el-menu-item index="/category/list">分类管理</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">管理员</template>
          <el-menu-item index="/admin_user/new">新建管理员</el-menu-item>
          <el-menu-item index="/admin_user/list">管理员管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown"> 
        </el-dropdown-menu>
      </el-dropdown>
      <span>yibing</span>
    </el-header>
  <router-view/>
  </el-container>
</el-container>
</template>

<script>
 export default {
   data() {
     return {
       openeds: ['1']
     }
   },
    components: {
    }
  };
</script>

<style>
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>