<template>
  <div class="app-container" style="height:100%" >
    <button @click="test">test mock </button>
 
    <GmapMap
      :center="{lat:23.696413, lng:120.532343}"
      :zoom="17"
      map-type-id="terrain"
      style="width: 100%; height:700px"
      :options="{mapTypeControl:false}">

      <div v-for="(m,index) in markers" :key="index">
        <gmap-custom-marker :marker="m.position" alignment="center">
          <el-avatar :size="50">{{m.user.name}}</el-avatar>
        </gmap-custom-marker>
        

        <!-- Gmap circle(fences) -->
        <GmapCircle
          :options="{fillColor:'#ff0000',fillOpacity:0.4,strokeColor:'#ff0000',strokeOpacity:0.4}"
          :center="m.fences_position"
          :radius="m.f_radius">
        </GmapCircle>
        <!-- Gmap circle(user position) -->
        <GmapCircle
          :options="{fillColor:'#0000ff',fillOpacity:0.4,strokeColor:'#0000ff',strokeOpacity:0.4}"
          :center="m.position"
          :radius="m.radius">
        </GmapCircle>

      </div>

    </GmapMap>
  </div>
</template>
  



<script>
  import GmapCustomMarker from 'vue2-gmap-custom-marker';
  import axios from 'axios'
  export default {
    components:{
      'gmap-custom-marker': GmapCustomMarker
    },
    data() {
      return {
        redColor:"#FF0000",
        getans:false,
        markers:null
      }
    },
    methods:{
      test:function(){
        axios.get('/user/locations2').then(res=>{
          console.log(res)
          console.log(res.data.markers)
          this.markers = res.data.markers
        })
      },
      timer:function(){

      }
    },
    mounted(){

      setInterval(()=>{
        console.log('every 10s')
        axios.get('/user/locations').then(res=>{
          console.log(res.data.markers)
          this.markers = res.data.markers
        })
      },3000)
    }
  }
</script>
<style scoped>
  .mymap{
    width: 85%;
    height: 700px;
  }
</style>