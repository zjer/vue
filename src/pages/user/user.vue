<template>
  <el-container>
    <el-header>
      <header-top></header-top>
    </el-header>
    <el-main>
      <el-table
        :data="tableData"
        border
        :row-key="row => row.index"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="用户名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="nick"
          label="昵称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          width="180">
        </el-table-column>
        <el-table-column
          prop="birth"
          label="生日"
          width="180">
        </el-table-column>
        <el-table-column
          prop="place"
          label="所在地">
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count">
      </el-pagination>
    </el-main>
    <el-footer>
      <footer-bottom></footer-bottom>
    </el-footer>
  </el-container>
</template>

<script>
  import HeaderTop from "../../components/headerTop";
  import FooterBottom from "../../components/footerBottom";
  export default {
    name: "user",
    components: {FooterBottom, HeaderTop},
    data() {
      return {
        tableData: [],
        currentPage: 1,
        pageSize: 10,
        count: 0
      }
    },
    created() {
      this.getAllUser();
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      getAllUser() {
        this.$ajax.get('api/user/findAll.do').then((res) => {
          this.tableData = res.data;
          console.log(res.data[0]);
          this.count = res.data.length;
        })
      }
    }
  }
</script>
