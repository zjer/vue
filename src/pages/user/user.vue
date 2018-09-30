<template>
  <el-container>
    <el-header>
      <header-top></header-top>
    </el-header>
    <el-main class="user-container">
      <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="80px">
        <el-form-item label="用户名" prop="name">
          <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nick">
          <el-input type="text" v-model="ruleForm.nick" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="ruleForm.sex" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生日" prop="birth">
          <el-date-picker
            v-model="ruleForm.birth"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="所在地" prop="place">
          <el-input type="text" v-model="ruleForm.place" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitSearchForm()">搜索</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="tableData"
        border
        v-loading="loading"
        element-loading-background="rgba(0, 0, 0, 0.6)"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="用户名"
          width="150">
        </el-table-column>
        <el-table-column
          prop="nick"
          label="昵称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          width="150">
        </el-table-column>
        <el-table-column
          prop="birth"
          label="生日"
          width="150">
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
        options: [{
          label: '男',
          value: '男'
        }, {
          label: '女',
          value: '女'
        }],
        ruleForm: {
          name: '',
          nick: '',
          sex: '',
          birth: '',
          place: ''
        },
        loading: false,
        tableData: [],
        currentPage: 1,
        pageSize: 10,
        count: 0
      }
    },
    created() {
      this.getAllUser(this.currentPage, this.pageSize);
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.getAllUser(1, this.pageSize);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.getAllUser(this.currentPage, this.pageSize);
      },
      getAllUser(cur, page) {
        this.$ajax.get('api/user/findAll.do').then((res) => {
          this.loading = true;
          this.tableData = [];
          this.count = res.data.length;
          if (res.data) {
            setTimeout(() => {
              this.loading = false;
            }, 1000);
            res.data.forEach((item, index) => {
              const tableData = {};
              const startPage = (cur - 1) * page + 1;
              const endPage = cur * page > this.count ? this.count : cur * page;
              // console.log(startPage, endPage);
              if (startPage <= item.id && item.id <= endPage) {
                tableData.name = item.name;
                tableData.nick = item.nick;
                tableData.sex = item.sex;
                tableData.birth = item.birth;
                tableData.place = item.place;
                tableData.index = index;
                console.log(index);
                this.tableData.push(tableData);
              }
            });
          }
        })
      },
      submitSearchForm() {
        this.$ajax.get('api/user/findAll.do').then((res) => {
          this.tableData = [];
          if (res.data) {
            res.data.forEach((item, index) => {
              const tableData = {};
              const name = this.ruleForm.name;
              const nick = this.ruleForm.nick;
              const sex = this.ruleForm.sex;
              const birth = this.ruleForm.birth;
              const place = this.ruleForm.place;
              if (startPage <= item.id && item.id <= endPage) {
                tableData.index = index;
                console.log(index);
                this.tableData.push(tableData);
              }
            });
          }
        })
      }
    }
  }
</script>
