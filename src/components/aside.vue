<template>
  <div>
    <div class="logo-title">
      <i :class="'icon iconfont ' + asideList.icon"></i>
      <span>{{ asideList.label }}</span>
    </div>
    <el-menu class="sidebar-nav" default-active="1" background-color="#323b44" text-color="#fff" :unique-opened="true">
      <el-submenu class="first-li side-li" v-for="(item, i) in asideList.sideLists" :key="i" :index="i + ''">
        <template slot="title">
          <router-link :to="{ path: '/' + item.link, params: { userId: 123 } }">
            <i :class="'icon iconfont ' + item.icon"></i> <span>{{ item.label }}</span></router-link
          >
        </template>
        <el-menu-item-group v-if="item.children.length > 0" class="nav-second-level">
          <el-menu-item v-for="(item2, i2) in item.children" :key="i2" :index="i2 + ''">
            <router-link :to="{ path: '/' + item2.link, params: { userId: 123 } }">
              <i :class="'icon iconfont ' + item2.icon"></i> <span>{{ item2.label }}</span></router-link
            ></el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<style lang="scss" scoped>
  .logo-title {
    height: 150px;
    margin-top: -8px;
    padding: 45px 0 0;
    color: #fff;
    i {
      height: 65px;
      line-height: 65px;
      font-size: 50px;
      text-align: center;
      display: block;
    }
    span {
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 16px;
      display: block;
    }
  }
  .sidebar-nav i {
    color: #fff;
  }
  .is-active {
    color: #fff !important;
    background-color: #36b3df !important;
  }
  li a {
    display: block;
    width: 100%;
    height: 100%;
    color: #fff;
    text-decoration: none;
  }
</style>
<style>
  .sidebar-nav .side-li i {
    color: #fff;
  }
  .el-aside::-webkit-scrollbar {
    width: 4px;

    background: #aaa;
  }

  .el-aside::-webkit-scrollbar-thumb {
    background: #aaa;

    border-top-right-radius: 10px;

    border-top-left-radius: 10px;

    border-bottom-right-radius: 10px;

    border-bottom-left-radius: 10px;
  }

  .el-main::-webkit-scrollbar {
    display: none;
  }

  .el-menu-item-group__title {
    display: none;
  }
</style>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    data() {
      return {
        asideList: [],
      }
    },
    mounted() {
      this.getData()
      console.log(this)
    },
    methods: {
      getData(): any {
        this.$axios.get('/assets/data/nav-aside.json?t=1591876788535').then((res: any) => {
          console.log(res)
          this.asideList = res.data || []
        })
      },
    },
  })
</script>
