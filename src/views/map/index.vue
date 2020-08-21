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
      <el-button @click="GetRoad">road</el-button>
      <el-button @click="push">push</el-button>
    </div>

    <GmapMap
      ref="map"
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
      <GmapPolyline 
          
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
      </GmapPolyline>
    </GmapMap>
  </div>
</template>
  



<script>
  import GmapCustomMarker from 'vue2-gmap-custom-marker';
  import axios from 'axios'
  import {gmapApi} from 'vue2-google-maps'
  export default {
    components:{
      'gmap-custom-marker': GmapCustomMarker
    },
    computed:{
      google:gmapApi
    },
    data() {
      return {
        markers:null,
        roads:null,
        smoth_road:null,
        marker_animation:'animate__animated animate__bounce animate__infinite	infinite',
        circle_animation:'animate__animated animate__pulse animate__infinite	infinite',
        path2:[
          {"lat": 23.690079, "lng": 120.535701},{"lat": 23.690023, "lng": 120.535427}
        ],
        test123:'#0000ff'
      }
    },
    methods:{
      push:function(){
        this.smoth_road.push({"lat":23.689459,"lng":120.534424})
      },
      GetRoad:function(){
        axios.get('/user/path/toby5500').then(res=>{
          this.roads = res.data.path
          console.log(this.roads)
          this.RoadApi()
        }).catch(err=>{
          console.log(err)
        })
      },
      RoadApi:function(){
        let data = ''
        let api_key = ''
        for(let i = 0;i<this.roads.length;i++){
   
          data = data + this.roads[i]['lat']+','+this.roads[i]['lng']
          if(!(i==this.roads.length-1))
            data+='|'
            
        }
        let url = 'https://roads.googleapis.com/v1/snapToRoads?path='+data+'&interpolate=true&key='+api_key
        console.log(url)
        axios.get(url).then(res=>{
          let smooth = []
          console.log('google api')
          console.log(res)
          console.log(res.data.snappedPoints)
          let retv = res.data.snappedPoints
          for(let i = 0;i<retv.length;i++){
            let temp = retv[i].location
            smooth.push({"lat":temp['latitude'],"lng":temp['longitude']})
          }
          this.smoth_road = smooth
          console.log(this.smoth_road)
        }).catch(err=>{
          console.log('google api error')
          console.log(err)
        })
      },
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
      // this.$refs.map.$mapPromise.then(map=>{
      //   console.log(map)
      //   console.log(this.google.maps.SymbolPath.FORWARD_CLOSED_ARROW)
      // })

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