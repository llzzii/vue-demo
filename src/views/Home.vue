<template>
  <div>
    <el-container :style="{ height: screenHeight + 'px' }">
      <el-aside width="200px"><asideCom></asideCom></el-aside>
      <el-container>
        <el-header> <headerCom></headerCom></el-header>
        <el-main>
          <transition name="fade" mode="out-in">
            <keep-alive>
              <router-view>
                <!-- 这里是会被缓存的视图组件 -->
              </router-view>
            </keep-alive>
          </transition>
          <!-- <transition name="fade" mode="out-in">
            <router-view>
              这里是不被缓存的视图组件
            </router-view>
          </transition> -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  // @ is an alias to /src
  import headerCom from '@/components/header.vue'
  import asideCom from '@/components/aside.vue'

  export default {
    name: 'Home',
    components: {
      headerCom,
      asideCom,
    },
    data() {
      return {
        screenHeight: document.body.clientHeight,
        timer: true,
      }
    },
    watch: {
      screenHeight: () => {
        // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
        if (!this.timer) {
          // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
          this.screenHeight = val
          this.timer = true
          let that = this
          setTimeout(function() {
            // 打印screenWidth变化的值
            console.log(that.screenHeight)
            that.timer = false
          }, 400)
        }
      },
    },
    mounted() {
      const that = this
      window.onresize = () => {
        return (() => {
          window.screenHeight = document.body.clientHeight
          that.screenHeight = window.screenHeight
        })()
      }
    },
    methods: {},
  }
</script>
<style scoped>
  .el-header,
  .el-footer {
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    float: none;
    padding-top: 8px;
    width: 210px;
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 995;
    background: #323b44;
  }

  .el-main {
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
