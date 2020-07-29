<template>
  <div class="app-container" style="height:100%" >
    <el-button>Location</el-button>
    <div id="map">
      <GmapMap class="mymap"
        :center="{lat:23.695667, lng:120.533534}"
        :zoom="7"
      >
      </GmapMap>
    </div>
  </div>
</template>
  



<script>

  export default {
    data() {
      return {
        
      }
    },
    methods:{
      
    },
    mounted(){
 
    }
  }
</script>
<style scoped>
  .mymap{
    width: 85%;
    height: 700px;
  }
</style>