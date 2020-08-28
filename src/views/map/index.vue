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

    <el-row>
      <el-col>
        <el-select placeholder="目標" v-model="select_value">
          <el-option
            v-for="(m,index) in trackers"
            :label="m"
            :value="m"
            :key="index">
          </el-option>
        </el-select>
      </el-col>
    </el-row>

    <GmapMap
      ref="map"
      :center="{lat:23.696413, lng:120.532343}"
      :zoom="18"
      map-type-id="terrain"
      style="width: 100%; height:700px"
      :options="{mapTypeControl:false}">
      <div v-if="marker_load">
        <gmap-custom-marker 
          
          :marker="CurrentMarker.current_position" 
          alignment="center" 
          @click.native="MarkerEvent"
          :class="circle_animation" >
          <el-avatar :size="50">123</el-avatar>
        </gmap-custom-marker>  
    
        <GmapCircle 
          :options="{fillColor:'#ff0000',fillOpacity:0.4,strokeColor:'#ff0000',strokeOpacity:0.4}"
          :center="CurrentMarker.fence_position"
          :class="circle_animation"
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
      }
    },
    created(){
      GetAllMarkers().then(res=>{ 
        this.markers = res.data.markers 
        this.trackers = Object.keys(res.data.markers)  
        this.select_value = this.trackers[0]
        this.marker_load = true
      }).catch(err=>{
        console.log(err)
      })
      
    },
    data() {
      return {
        select_value:'',
        markers:null,
        marker_load:null,
        trackers:null,
        roads:null,
        smoth_road:null,
        marker_animation:'animate__animated animate__bounce animate__infinite	infinite',
        circle_animation:'animate__animated animate__pulse animate__infinite	infinite',
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
      }
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