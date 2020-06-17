<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="pd24">
      <el-breadcrumb-item>{{ $store.state.instanceMap.get($route.params.code) }}</el-breadcrumb-item>
      <el-breadcrumb-item>列表页面</el-breadcrumb-item>
      <el-breadcrumb-item>{{ detailData.name }}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row :gutter="20" type="flex">
      <el-col :span="12">
        <el-card class="height100" :body-style="{ padding: '0px' }">
          <el-form label-position="right" size="small" label-suffix=":" label-width="180px" v-for="(item, i) in detailDataLeft" :key="i">
            <el-form-item :label="i" v-if="item != null && item != ''">
              {{ item }}
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="height100" :body-style="{ padding: '0px' }">
          <el-form label-position="right" size="small" label-suffix=":" label-width="180px" v-for="(item, i) in detailDataRight" :key="i">
            <el-form-item :label="i" v-if="item != null && item != ''">
              {{ item }}
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        detailData: {},
        detailDataLeft: {},
        detailDataRight: {},
      }
    },
    mounted() {
      this.getData()
    },
    watch: {
      $route(to, from) {
        if (this.$route.params.code) {
          this.getData()
        }
      },
    },
    methods: {
      getData() {
        this.$axios.get('/security/v1/product-insts/' + this.$route.params.id).then((res) => {
          this.detailData = res.data || {}
          let count = 0
          let len = Object.keys(this.detailData).length / 2
          for (let key in this.detailData) {
            if (count < len) {
              this.detailDataLeft[key] = this.detailData[key]
            } else {
              this.detailDataRight[key] = this.detailData[key]
            }
            count++
          }
        })
      },
    },
  }
</script>

<style scoped>
  .el-row {
    margin: 20px 0;
  }
  .height100 {
    height: 100%;
  }
  .el-form-item--mini.el-form-item,
  .el-form-item--small.el-form-item {
    margin-bottom: 6px;
  }
</style>
