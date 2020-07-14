<template>
  <div class="admin">
    <Header>
    </Header>
    <h1>This is an admin page</h1>
  </div>
</template>
<script>
// @ is an alias to /src
import Header from '../components/header/index.vue'


export default {
  name: 'Home',
  components: {
    Header
  }
}
</script>
