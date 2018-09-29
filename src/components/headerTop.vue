<template>
  <div class="header-container">
    <el-row :gutter="0">
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "headerTop",
    data() {
      return {
        user: ''
      }
    },
    mounted() {
      this.user = sessionStorage.getItem('cookie')
    },
    methods: {}
  }
</script>
