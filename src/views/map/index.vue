<template>
  <div class="app-container" style="height:100%" >
    <div class="color-mark">
      
      <el-row>
        <el-col>
          <div style="width:15px; height:15px; background-color: #FF6666;display: inline-block;" ></div>
          Geo-fence
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <div style="width:15px; height:15px; background-color: #B266FF;display: inline-block;" ></div>
          User-position
        </el-col>
      </el-row>
    </div>
    <el-select placeholder="目標" v-model="select_value" @change="SelectChange" style="width:100%; margin-bottom:10px;">
      <el-option
        v-for="(m,index) in tracker_list"
        :label="m"
        :value="m"
        :key="index">
      </el-option>
    </el-select>


    <GmapMap
      ref="map"
      :center="MapCenter"
      :zoom="18"
      map-type-id="terrain"
      style="width: 100%; height:700px"
      :options="{mapTypeControl:false}">
      <div v-if="marker_loading">
        <gmap-custom-marker 
          
          :marker="CurrentMarker.current_position" 
          alignment="center" 
          @click.native="MarkerEvent"
          :class="pulse_animation" >
          <el-avatar :size="50">123</el-avatar>
        </gmap-custom-marker>  
    
        <GmapCircle 
          :options="{fillColor:'#ff0000',fillOpacity:0.4,strokeColor:'#ff0000',strokeOpacity:0.4}"
          :center="CurrentMarker.fence_position"
          :class="pulse_animation"
          :radius="CurrentMarker.fence_radius">
        </GmapCircle>
  
        <GmapCircle
          :options="{fillColor:'#0000ff',fillOpacity:0.4,strokeColor:'#0000ff',strokeOpacity:0.4}"
          :center="CurrentMarker.current_position"
          :radius="CurrentMarker.radius">
        </GmapCircle>
      </div>
      <!-- <GmapPolyline 
          v-if="smoth_road"
          :path.sync="smoth_road"
          v-bind:options="{ 
            strokeColor:'#00ff00',
            strokeWeight:8,
            strokeOpacity:0.8,
            icons:[{
              icon:{
                path:google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                fillColor: '#22bf15',
                strokeColor: '#22bf15',
                scale:4,
                fillOpacity:1
                },
                
              }]
            }">
      </GmapPolyline> -->
    </GmapMap>
  </div>
</template>
  



<script>
  import GmapCustomMarker from 'vue2-gmap-custom-marker';
  import axios from 'axios'
  import {gmapApi} from 'vue2-google-maps'
  import {GetAllMarkers} from '@/apis/map.js'

  export default {
    components:{
      'gmap-custom-marker': GmapCustomMarker
    },
    computed:{
      google:gmapApi,
      CurrentMarker:function(){
        return this.markers[this.select_value]
      },
      MapCenter:function(){
        if (this.marker_loading == null)
          return this.map_default_center 
        
        return this.markers[this.select_value].fence_position
      },
      tracker_list:function(){
        return this.$store.getters.trackerList
      }
    },
    data() {
      return {
        map_default_center:{
          lat:23.696413,
          lng:120.532343
        },
        select_value:'請選擇目標',
        markers:null,
        marker_loading:null,
        roads:null,
        marker_animation:'animate__animated animate__bounce animate__infinite	infinite',
        pulse_animation:'animate__animated animate__pulse animate__infinite	infinite',
      }
    },
    methods:{
      GetRoad:function(){
        axios.get('/user/path/toby5500').then(res=>{
          this.roads = res.data.path
          console.log(this.roads)
          this.RoadApi()
        }).catch(err=>{
          console.log(err)
        })
      },
      MarkerEvent:function(){
        window.alert('click marker')
      },
      SelectChange:function(){
        console.log('selection change')
        /*
          selection被選到特定的trakcer時
          向後端請求該trakcer的電子圍籬資訊
        */
        this.marker_loading = true
      }
    },
    created(){
      /* just need tracker's boundary position */
      GetAllMarkers().then(res=>{ 
        this.markers = res.data.markers 
      }).catch(err=>{
        console.log(err)
      })
      console.log(null||"asd")
    },
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