<template>
  <el-container class="container" v-loading="" >
    <Aside></Aside>
    <el-container direction='vertical'>
      <Header></Header>
      <Content></Content>
    </el-container>
  </el-container>
</template>

<script>
import Aside from '../components/aside/index.vue'
import Header from '../components/header/index.vue'
import Content from '../components/content/index.vue'
export default {
  name: 'Home',
  components: {
    Aside,Header,Content
  }
}
</script>

<style>
.container{
  height: 100%;
}

</style>
