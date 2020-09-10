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

    <el-row :gutter="10" justify="center" type="flex" style="align-items: center;display: flex;margin-bottom:10px;">
      <el-col>
       <el-switch
          @change="AutoReport"
          style="display: block"
          v-model="auto_report"
          active-color="#13ce66"
          inactive-color="#ff4949"
      
          inactive-text="自動回報">
        </el-switch>
      </el-col>
      <el-col>
        <el-switch
          @change="PowerSave"
          style="display: block"
          v-model="power_mode"
          active-color="#13ce66"
          inactive-color="#ff4949"
          inactive-text="省電模式">
        </el-switch>
      </el-col>
    </el-row>

    <!-- GetPower SetAutoReport -->
    <el-row :gutter="10" justify="center" type="flex" style="align-items: center;display: flex;">
      <el-col >
        <el-button @click='SendRequest("GetPowerStatus")' type="primary" round>目標手機電力 {{target_power}}%</el-button>
      </el-col>
      
      <el-col >
        <el-button @click='SendRequest("ScanWifiSignal")' type="primary" round>啟用wifi定位</el-button>
      </el-col>

      <el-col >
        <el-button @click='SendRequest("ScanGPS")' type="primary" round>啟用GPS定位</el-button>
      </el-col>
      

    </el-row>

    <el-button type="primary" style="width:100%; margin-bottom:10px;margin-top:10px;" @click="StartTracking">開啟追蹤</el-button>

    <GmapMap
      ref="map"
      :center="map_default_center"
      :zoom="18"
      map-type-id="terrain"
      style="width: 100%; height:700px"
      :options="{mapTypeControl:false}">
      <div v-if="marker_loading">
        <GmapMarker
          @click="MarkerEvent"
          :position="target">

        </GmapMarker>
        <GmapInfoWindow
          :opened="info_window"
          @closeclick="InfoWindowClose"
          :position="target">
          lat: {{target.lat}} lng: {{target.lng}}
        </GmapInfoWindow>



        <!-- boundary circle -->
        <GmapCircle 
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
                  path:google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                  fillColor: '#22bf15',
                  strokeColor: '#22bf15',
                  scale:4,
                  fillOpacity:1
                  },
                  
                }]
              }">
        </GmapPolyline>
      </div>

    </GmapMap>
  </div>
</template>
  



<script>
  //import GmapCustomMarker from 'vue2-gmap-custom-marker';
  import {gmapApi} from 'vue2-google-maps'
  import {GetAllMarkers} from '@/apis/map.js'
  import {GetBoundaryPosition} from '@/apis/boundary.js'
  import {SendToPhone} from '@/apis/phone.js'
  import {CreateStompClient} from '@/utils/stompclient.js'

  export default {
    components:{
      //'gmap-custom-marker': GmapCustomMarker
    },
    computed:{
      google:gmapApi,
      CurrentMarker:function(){
        return this.markers[this.select_value]
      },
      /* get trakcer list */
      tracker_list:function(){
        //return this.$store.getters.trackerList
        return ['unknown']
      },
      /*  get current tracker */ 
      tracker:function(){
        return this.$store.getters.trackersInfo[this.select_value] 
      }
    },
    data() {
      return {
        map_default_center:{
          lat:23.696413,
          lng:120.532343
        },
        info_window:false,
        select_value:'請選擇目標',
        target:{
          lat:0,
          lng:0
        },
        target_power:0,//target's phone power %
        current_boundary:{
          lat:0,
          lng:0
        },
        boundary_radius:0,

        stomp_client:null,//stomp connection 
        subscribe_id:null,//stomp current subscription's id

        markers:null,
        marker_loading:false,
        roads:[],

        auto_report:true,//自動回報開關
        power_mode:false,//省電模式開關

      }
    },
    methods:{
      AutoReport:function(){
        let data = {
          "Request":"SetAutoReport",
          "Payload": { "Enable": this.auto_report },
          "tracker_name":this.select_value
        }
        SendToPhone(data)
        
      },
      PowerSave:function(){
        //call rest , and then rest publish "PowerSave" to rabbitmq
        let data = {
          "Request":"SetPowerSaving",
          "Payload":{ "Enable":this.power_mode},
          "tracker_name":this.select_value  
        }
        SendToPhone(data)
      },
      // 傳送命令------->Rest---------->手機
      SendRequest:function(action){
        let data = {
          "Request":action,
          "tracker_name":this.select_value
        }
        SendToPhone(data)
      },
      /*  marker click event  */
      MarkerEvent:function(){
        this.info_window = true
      },

      /*  select event  */
      SelectChange:function(){
        this.marker_loading = true
        console.log('selection change')

        /*  每次切換追蹤目標時 取消訂閱上個追蹤者 */
        if(this.stomp_client&&this.subscribe_id){
          this.stomp_client.unsubscribe(this.subscribe_id)
          this.target.lat = 0
          this.target.lat = 0
          this.map_default_center.lat = 23.696413
          this.map_default_center.lng = 120.532343
        }


        /*
          Todo: 
          selection被選到特定的trakcer時
          向後端請求該trakcer的電子圍籬資訊
        */
        GetBoundaryPosition(this.select_value).then(res=>{
          this.current_boundary = {lat:parseFloat(res.data.boundary.lat),lng:parseFloat(res.data.boundary.lng)}
          this.boundary_radius = res.data.boundary.radius
        })
      },

      /*  marker infowindow close event */
      InfoWindowClose:function(){
        this.info_window = false
      },
      /*  tracking target */
      StartTracking:function(){
        /*  
          start tracking target
          subscribe tracker-event(exchange)
        */
        console.log(this.stomp_client)
        let destination = `/exchange/tracker-event/tracker.${this.select_value}.notification.respond`
        let retv = this.stomp_client.subscribe(destination,this.on_message)
        this.subscribe_id = retv.id 
        console.log('subscribe id is ',this.subscribe_id)
 
      },

      /*  stomp on_message callback */
      on_message:function(msg){
        /*
          Response: "GetDeviceStatus", id: "123e4567-e89b-12d3-a456-426655440000", timestamp: 1599765528, Status: "Success
          判斷Response
        */
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
            this.target.lat = retv.Result.Latitude
            this.target.lng = retv.Result.Longitude
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
      /* just need tracker's boundary position */
      GetAllMarkers().then(res=>{ 
        this.markers = res.data.markers 
      }).catch(err=>{
        console.log(err)
      })

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