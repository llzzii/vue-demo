<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="pd24">
      <el-breadcrumb-item>{{ $store.state.instanceMap.get($route.params.code) }}</el-breadcrumb-item>
      <el-breadcrumb-item>列表页面</el-breadcrumb-item>
    </el-breadcrumb>

    <el-alert type="info" title="通过'管理'进入产品控制台前，请参照'更多-配置hosts'配置本地hosts文件" show-icon :closable="false">
    </el-alert>
    <el-row :gutter="20"
      ><el-col :span="18"
        ><el-button type="primary">创建</el-button> <el-button>开机</el-button><el-button>关机</el-button><el-button>重启</el-button
        ><el-button>删除</el-button>
      </el-col>
      <el-col :span="6"
        ><el-input placeholder="请输入名称/ID/IP" v-model="input3" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
          <el-button class="border-left" slot="append" icon="el-icon-refresh-left"></el-button> </el-input
      ></el-col>
    </el-row>
    <el-table :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column fixed label="ID/名称">
        <template slot-scope="scope">
          <el-popover class="block" placement="top-start" trigger="hover" :content="scope.row.id">
            <router-link slot="reference" :to="{ path: 'detail/' + scope.row.id }">{{ scope.row.id }}</router-link>
          </el-popover>
          <el-popover placement="top-start" trigger="hover" :content="scope.row.name">
            <span slot="reference">{{ scope.row.name }}</span>
          </el-popover>
        </template></el-table-column
      >
      <el-table-column prop="runStatus" label="状态" width="120"> </el-table-column>
      <el-table-column prop="productSpecName" label="规格信息" width="120"> </el-table-column>
      <el-table-column prop="vpcName" label="虚拟私有网络" width="120"> </el-table-column>
      <el-table-column prop="subnetName" label="子网" width="300"> </el-table-column>
      <el-table-column prop="consoleAddr" label="IP地址" width="120"> </el-table-column>
      <el-table-column prop="createdTime" label="创建时间" width="220"
        ><template slot-scope="scope">{{ scope.row.createdTime | timestampToTime }} </template></el-table-column
      >
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style scoped>
  .pd24 {
    padding: 24px 0;
  }
  .block {
    display: block;
  }
  a {
    text-decoration: none;
    color: #36b3df;
  }
  .el-row {
    margin: 20px 0;
  }
  .border-left {
    border-left: 1px solid #aaa;
  }
</style>

<script>
  import Moment from 'moment'
  export default {
    data() {
      return {
        tableData: [],
        input3: '',
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
        this.$axios
          .get('/security/v1/product-insts/0/10', {
            params: {
              categoryCode: this.$route.params.code.toLocaleUpperCase(),
              queryData: '',
            },
          })
          .then((res) => {
            this.tableData = res.data.data || []
          })
      },
      handleClick(row) {
        console.log(row)
      },
      handleSelectionChange(val) {},
    },
    filters: {
      timestampToTime(time) {
        let date = new Date(time)
        return Moment(date).format('YYYY-MM-DD HH:mm:ss')
      },
    },
  }
</script>
