<template>
  <el-container>
    <el-header>
      <header-top></header-top>
    </el-header>
    <el-main></el-main>
    <el-footer>
      <footer-bottom></footer-bottom>
    </el-footer>
  </el-container>
</template>

<script>
  import HeaderTop from "../components/headerTop";
  import FooterBottom from "../components/footerBottom";
  export default {
    name: "index",
    components: {FooterBottom, HeaderTop},
    data() {
      return {}
    }
  }
</script>
