<template>
  <div class="app-container" style="height:100%" >
    <div class="color-mark" style="width:100%">
      <el-row >
        <div style="width:15px; height:15px; background-color: #FF6666;display: inline-block; margin-right:10px;" ></div>電子圍籬範圍 

        <div style="width:15px; height:15px; background-color: #B266FF;display: inline-block; margin-right:10px;" ></div>目標誤差半徑
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

    <div v-if="select_value!==''">
      <transition appear enter-active-class="animate__animated animate__fadeInTopLeft"  mode="out-in">
          <div>
          <el-row type="flex" style="margin-bottom:10px;">
            <el-col>
              <el-switch
                @change="SendRequest('SetAutoReport')"
                style="display: block"
                v-model="auto_report"
                active-color="#13ce66"
                inactive-color="#ff4949"
                inactive-text="自動回報">
              </el-switch>
            </el-col>
            <el-col>
              <el-switch
                @change="SendRequest('SetPowerSaving')"
                style="display: block"
                v-model="power_mode"
                active-color="#13ce66"
                inactive-color="#ff4949"
                inactive-text="省電模式">
              </el-switch>
            </el-col>
          </el-row>

          <el-row>
            <el-button @click='SendRequest("GetPowerStatus")' type="primary" >目標手機電力 {{target_power}}%</el-button>
            <el-button @click='SendRequest("ScanWifiSignal")' type="primary" >啟用wifi定位</el-button>
            <el-button @click='SendRequest("ScanGPS")' type="primary" >啟用GPS定位</el-button>
          </el-row>
          </div>
      </transition>
    </div>

    <el-row>
      <el-button type="primary" style="width:100%; margin-bottom:10px;margin-top:10px;" @click="StartTracking">開啟追蹤</el-button>
    </el-row>
  
    <GmapMap
      ref="map"
      :center="map_default_center"
      :zoom="18"
      map-type-id="terrain"
      style="width: 100%; height:700px"
      :options="{mapTypeControl:false}">
      
        <GmapMarker
          v-if="target!==null"
          @click="MarkerEvent"
          :position="target">

        </GmapMarker>
        <GmapInfoWindow
          v-if="target!==null"
          :opened="info_window"
          @closeclick="InfoWindowClose"
          :position="target">
          lat: {{target.lat}} lng: {{target.lng}}
        </GmapInfoWindow>



        <!-- boundary circle -->
        <GmapCircle 
          v-if="current_boundary!==null"
          :options="{fillColor:'#ff0000',fillOpacity:0.4,strokeColor:'#ff0000',strokeOpacity:0.4}"
          :center="current_boundary"
          :radius="boundary_radius">
        </GmapCircle>

        <!-- <GmapPolyline 
            :path="roads"
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
  import {gmapApi} from 'vue2-google-maps'
  import {GetBoundaryPosition} from '@/apis/boundary.js'
  import {SendToPhone} from '@/apis/phone.js'
  import {CreateStompClient} from '@/utils/stompclient.js'

  export default {
    computed:{
      google:gmapApi,
      CurrentMarker:function(){
        return this.markers[this.select_value]
      },
      /* get trakcer list */
      tracker_list:function(){
        return this.$store.getters.trackerList
      },
      tracker_map:function(){
        return this.$store.getters.trackerMap
      },
      /*  get current tracker */ 
      tracker:function(){
        return this.$store.getters.trackersInfo[this.select_value] 
      }
    },
    data() {
      return {
        map_default_center:{lat:23.696413,lng:120.532343},
        info_window:false,
        select_value:'',//tracker NAME
        target:null,
        target_power:0,//target's phone power %
        current_boundary:null,
        boundary_radius:0,

        stomp_client:null,//stomp connection 
        subscribe_id:null,//stomp current subscription's id

        markers:null,
        roads:[],

        auto_report:true,//自動回報開關
        power_mode:false,//省電模式開關
      }
    },
    methods:{
      /* 傳送命令------->Rest---------->手機 */
      SendRequest:function(action){
        let data = {"Request":action,"tracker_id":this.tracker_map[this.select_value]}
        switch(action){
          case 'SetAutoReport':
            data["Payload"] = {"Enable": this.auto_report}
            break
          case 'SetPowerSaving':
            data["Payload"] = {"Enable":this.power_mode}
            break
          default:
            break 
        }

        SendToPhone(data)
      },
      /*  marker click event  */
      MarkerEvent:function(){
        this.info_window = true
      },

      /*  select event  */
      SelectChange:async function(){
    
        this.current_boundary = null
        console.log('selection change')

        /*  每次切換追蹤目標時 取消訂閱上個追蹤者 */
        if(this.stomp_client&&this.subscribe_id){
          this.stomp_client.unsubscribe(this.subscribe_id)
          this.target = null 
          this.map_default_center.lat = 23.696413
          this.map_default_center.lng = 120.532343
        }


        /*  function parms is trakcer id (mode_num=1,get current boundary)*/
        GetBoundaryPosition(this.tracker_map[this.select_value],1).then(res=>{
          this.current_boundary = {lat:parseFloat(res.data.boundarys[0].lat),lng:parseFloat(res.data.boundarys[0].lng)}
          this.boundary_radius = res.data.boundarys[0].radius
        }).catch(err=>{
          console.log(err)
        })
      },

      
      InfoWindowClose:function(){
        /*  marker infowindow close event */
        this.info_window = false
      },

      StartTracking:function(){
        /*subscribe tracker-event(exchange)*/
        console.log(this.stomp_client)
        let destination = `/exchange/tracker-event/tracker.${this.tracker_map[this.select_value]}.notification.respond`
        let retv = this.stomp_client.subscribe(destination,this.on_message)
        this.subscribe_id = retv.id 
        console.log('subscribe id is ',this.subscribe_id)
 
      },

      /*  stomp on_message callback */
      on_message:function(msg){
        console.log('message is '+msg.body)
        let retv = JSON.parse(msg.body)

        switch (retv.Response){
          case 'GetPowerStatus':
            console.log('GetPowerStatus Response')
            this.target_power = retv.Result.CapacityLevel
            break 
          case 'GetDeviceStatus':
            console.log('GetDeviceStatus Response')
            break;
          case 'GetVersion':
            console.log('GetVersion Response')
            break;
          case 'ScanGPS':
            console.log('ScanGPS Response')
            this.target = {"lat":retv.Result.Latitude,"lng":retv.Result.Longitude}
            this.map_default_center.lat = retv.Result.Latitude
            this.map_default_center.lng = retv.Result.Longitude
            break;
          case 'ScanWifiSignal':
            console.log('ScanWifiSignal Response')
            break;
        }
      },

    },
    created(){
      /*  create stomp connection */ 
      this.stomp_client = CreateStompClient()
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