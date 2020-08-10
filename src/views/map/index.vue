<template>
  <div class="app-container" style="height:100%" >
    <button @click="test">test mock </button>
 
    <GmapMap
      :center="{lat:23.696413, lng:120.532343}"
      :zoom="17"
      map-type-id="terrain"
      style="width: 100%; height:700px"
      :options="{mapTypeControl:false}"
      
      
    >

      
      <GmapMarker
        
        :key="index"
        v-for="(m,index) in markers"
        :position="m.position"
        :icon="m.icon"
        :animation="1"
      >
      </GmapMarker>
      <!-- <GmapCircle
        v-for="(m,index) in markers"
        :options="{fillColor:'#ff0000',fillOpacity:0.4,strokeColor:'#00ff00',strokeOpacity:0.4}"
        :key="index"
        :center="m.position"
        :radius="m.r"
      >

      </GmapCircle> -->
    </GmapMap>
  </div>
</template>
  



<script>
  import axios from 'axios'
  export default {
    components:{
  
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
      // axios.get('/user/locations').then(res=>{
      //   console.log(res)
        
      //   console.log(res.data.markers)
      //   this.markers = res.data.markers
      // })
      setInterval(()=>{
        console.log('every 10s')
        axios.get('/user/locations').then(res=>{
          console.log(res)
          console.log(res.data.markers)
          this.markers = res.data.markers
        })
      },10000)
    }
  }
</script>
<style scoped>
  .mymap{
    width: 85%;
    height: 700px;
  }
</style>