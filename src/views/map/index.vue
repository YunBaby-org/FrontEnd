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

    <div v-if="select_value!==''" style="margin-bottom:5px;">
      <transition name="el-zoom-in-top">
        <el-card shadow="hover">
   
          <el-row type="flex" style="margin-bottom:5px;">
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

          <el-row type="flex" class="row-bg" :gutter="10">
            <el-col :span="8"><el-button @click='SendRequest("GetPowerStatus")' type="info" style="width:100%;">目標手機電力 {{target_power}}%</el-button></el-col>
            <el-col :span="8"><el-button @click='SendRequest("ScanWifiSignal")' type="info" style="width:100%;">啟用wifi定位</el-button></el-col>
            <el-col :span="8"><el-button @click='SendRequest("ScanGPS")' type="info" style="width:100%;">啟用GPS定位</el-button></el-col>
          </el-row>
          <el-row>
            <el-button :type="trakcer_btn_type" :disabled="select_value===''" style="width:100%;margin-top:5px;" @click="tracker_btn_function">{{tracking_btn_text[tracking_btn_status]}}</el-button>
          </el-row>
          <el-row>
            <el-button  style="width:100%;margin-top:5px;" @click="ClearPolyline()" >清除軌跡</el-button>
          </el-row>  
        </el-card>
      </transition>
    </div>
    <gmap-autocomplete 
      style="width:100%;height:30px;border:0px #ccc solid;border-radius:10px;margin-bottom:10px;" 
      :options="{fields: ['geometry']}"
      class="introInput" 
      placeholder="請輸入地址" 
      @place_changed="setPlace">
    </gmap-autocomplete>
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

        <GmapPolyline 
            :path="roads"
            v-bind:options="{ 
              strokeColor:'#00ff00',
              strokeWeight:8,
              strokeOpacity:0.8,
              icons:[{
                icon:{
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
  import {gmapApi} from 'vue2-google-maps'
  import webstomp from 'webstomp-client'
  import {GetBoundaryPosition} from '@/apis/boundary.js'
  import {SendToPhone} from '@/apis/phone.js'


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
      },
      tracker_btn_function:function(){
        if (this.tracking_btn_status ===0)
          return this.StartTracking

        return this.StopTracking

      },
      trakcer_btn_type:function(){
        if(this.tracking_btn_status === 0)
          return "primary"
        
        return "danger"
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

        /*  開關參數  */
        auto_report:true,//自動回報開關
        power_mode:false,//省電模式開關

        /* tracking button 參數 */
        tracking_btn_text:{0:"開啟追蹤",1:"停止追蹤"},
        tracking_btn_status:0//0--->start tracking  1--->stop tracking
      }
    },
    methods:{
      setPlace:function(place){
        this.map_default_center.lat = place.geometry.location.lat()
        this.map_default_center.lng = place.geometry.location.lng()
      },
      ClearPolyline:function(){
        this.roads = []
      },
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
        this.StopTracking()


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
      /*  tracking function */
      StartTracking:function(){
        /*subscribe tracker-event(exchange)*/
        console.log("START TRACKING")
        this.tracking_btn_status = 1
        let destination = `/exchange/tracker-event/tracker.${this.tracker_map[this.select_value]}.notification.respond`
        let retv = this.stomp_client.subscribe(destination,this.StompMessageCallback)
        this.subscribe_id = retv.id 
        console.log('subscribe id is ',this.subscribe_id)
 
      },
      StopTracking:function(){
        console.log("STOP TRACKING "+this.subscribe_id)
        this.tracking_btn_status = 0
        if(this.stomp_client&&this.subscribe_id){
          this.stomp_client.unsubscribe(this.subscribe_id)
          this.target = null 
          this.map_default_center.lat = 23.696413
          this.map_default_center.lng = 120.532343
        }
      },
      /*  stomp function  */
      StompCreate:function(){
        this.stomp_client = webstomp.over(new WebSocket('ws://'+location.hostname+':15674/ws'))
        this.stomp_client.connect(process.env.VUE_APP_AMQP_USER,process.env.VUE_APP_AMQP_PASSWORD,this.StompSuccessCallback,this.StompFailureCallback)
      },
      /*  stomp callback  */
      StompSuccessCallback:function(){
        console.log("STOMP SUCCESS CALLBACK")

        if(this.select_value!==''&&this.tracking_btn_status===1){//代表有選擇AND有按下追蹤按鈕
          let destination = `/exchange/tracker-event/tracker.${this.tracker_map[this.select_value]}.notification.respond`
          let retv = this.stomp_client.subscribe(destination,this.StompMessageCallback)
          this.subscribe_id = retv.id 
          console.log("RESUBSCRIBE")
        }
      },
      StompFailureCallback:function(error){
        console.log("STOMP FAILURE CALLBACK "+error)
        setTimeout(this.StompCreate,10000)//重新建立STOMP連線
        console.log("STOMP: AUTO　RECONNECT IN 10s")
      },
      StompMessageCallback:function(msg){
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
            this.roads.push(this.target)
            /* update polyline */
            break;
          case 'ScanWifiSignal':
            console.log('ScanWifiSignal Response')
            break;
        }
      },


    },
    created(){
      /*  create stomp connection */ 
      this.StompCreate()
    }
  }
</script>
