<template>
  <div class="app-container" style="height:100%" >
    <div class="color-mark">
      
      <div style="margin-bottom:5px;">
        <div style="width:15px; height:15px; background-color: #FF6666;display: inline-block;" >
        </div>
        Geo-fence
      </div>

      <div>
        <div style="width:15px; height:15px; background-color: #B266FF;display: inline-block;" >
        </div>
        User-position
      </div>
    </div>

    <GmapMap
      :center="{lat:23.696413, lng:120.532343}"
      :zoom="18"
      map-type-id="terrain"
      style="width: 100%; height:700px"
      :options="{mapTypeControl:false}">

      <div v-for="(m,index) in markers" :key="index">
        <gmap-custom-marker :marker="m.current_position" alignment="center" :class="circle_animation" >
          <el-avatar :size="50">{{m.user.name}}</el-avatar>
        </gmap-custom-marker>
        

        <!-- Gmap circle(fences) -->
        <GmapCircle
          :options="{fillColor:'#ff0000',fillOpacity:0.4,strokeColor:'#ff0000',strokeOpacity:0.4}"
          :center="m.fences_position"
          :class="circle_animation"
          :radius="m.f_radius">
        </GmapCircle>
        <!-- Gmap circle(user position) -->
        <GmapCircle
          :options="{fillColor:'#0000ff',fillOpacity:0.4,strokeColor:'#0000ff',strokeOpacity:0.4}"
          :center="m.current_position"
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
        markers:null,
        marker_animation:'animate__animated animate__bounce animate__infinite	infinite',
        circle_animation:'animate__animated animate__pulse animate__infinite	infinite'
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
  .color-mark{
    width: 30%;
    margin-bottom: 15px;
    
  }
</style>