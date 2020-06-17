<template>
  <div>
    <el-tabs v-model="editableTabsValue" @tab-remove="removeTab" @tab-click="handleClick">
      <el-tab-pane v-for="item in editableTabs" :key="item.name" :closable="item.closable" :label="item.title" :name="item.name">
        {{ item.content }}
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        editableTabsValue: 'index',
        editableTabs: [
          {
            title: '首页',
            name: 'index',
            path: '/home',
            closable: false,
          },
        ],
        tabIndex: 1,
      }
    },
    mounted() {
      this.addTab(this.$route)
    },
    methods: {
      addTab(data) {
        let tabObj = this.editableTabs.find((o) => {
          return o.name === data['params']['code']
        })
        if (data['path'] === '/home') {
          this.editableTabsValue = 'index'
          return
        }
        if (!tabObj) {
          this.editableTabs.push({
            title: this.$store.state.instanceMap.get(data['params']['code']),
            name: data['params']['code'],
            path: data['path'],
            closable: true,
          })
        }
        if (tabObj && tabObj.path !== data['path']) {
          this.editableTabs.forEach((tab, index) => {
            if (tab.name === tabObj.name) {
              tab.path = data['path']
            }
          })
        }

        this.editableTabsValue = data['params']['code']
      },
      removeTab(targetName) {
        let tabs = this.editableTabs
        let activeName = this.editableTabsValue
        let path
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) {
                activeName = nextTab.name
                path = nextTab.path
              }
            }
          })

          this.$router.push({ path: path })
        }

        this.editableTabsValue = activeName

        this.editableTabs = tabs.filter((tab) => tab.name !== targetName)
      },
      handleClick(tab, event) {
        let activeData = this.editableTabs[tab['index']]
        this.$router.push({ path: activeData['path'] })
      },
    },
    watch: {
      $route: {
        handler(val, oldval) {
          this.addTab(val)
          //console.log(val) //新路由信息
          // console.log(oldval) //老路由信息
        },
        // 深度观察监听
        deep: true,
      },
    },
  }
</script>
