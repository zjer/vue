<template>
  <el-container>
    <el-header>
      <header-top></header-top>
    </el-header>
    <el-main>
      <el-carousel :interval="5000" arrow="always">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </el-main>
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
