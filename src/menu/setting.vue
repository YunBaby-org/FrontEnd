<template>
  <div class="test">
    <h1 v-for="t in testdata" :key="t">{{t}}</h1>
  </div>
</template>
<script>
export default {
  data:function(){
    return{
      testdata:[1,2,3,4,5,6,7]
    }
  }
}
</script>