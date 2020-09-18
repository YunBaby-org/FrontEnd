<template>
    <div class="app-container">
        <el-card shadow="hover" id="tracker_add">
            <div slot="header" style="text-align:center;">
                <h1>新增追蹤目標</h1>
            </div>
            <el-row :gutter="10" justify="center" type="flex" style="align-items: center;display: flex;">
                <el-col :xs="10" :sm="6" :md="6" :lg="4" :xl="2">目標名稱(trackername)</el-col>
                <el-col :xs="14" :sm="6" :md="9" :lg="9" :xl="9">
                    <el-input v-model="target_form.name" placeholder="enter tracker's name"></el-input>
                </el-col>
            </el-row>
            <el-row :gutter="10" justify="center" type="flex" style="align-items: center;display: flex;">
                <el-col :xs="10" :sm="6" :md="6" :lg="4" :xl="2">目標手機</el-col>
                <el-col :xs="14" :sm="6" :md="9" :lg="9" :xl="9">
                    <el-input v-model="target_form.phone" placeholder="enter tracker's phone"></el-input>
                </el-col>
            </el-row>
            <el-button @click="AddTracker" style="margin:0 auto;display:block; width:100px;" type="primary" plain>新增</el-button>        

        </el-card>
        <el-card shadow="hover" id="tracker_table">
            <div slot="header" style="text-align:center;">
                <h1>追蹤清單</h1>
            </div>
            <el-button @click="UpdateTrackers" type="primary" icon="el-icon-refresh" circle style="margin-bottom:15px;"></el-button>
            <el-table
                style="width:100%"
                :data="trackersInfo"
                height="250"
                border>
                <el-table-column
                    prop="name"
                    label="姓名">
                </el-table-column>

                <el-table-column
                    prop="phone"
                    label="手機號碼">
                </el-table-column>

                <el-table-column fixed="right" label='QRCODE'>
                    <template slot-scope="scope"> 
                        <el-button @click="CreateQrcode(scope.$index, scope.row)" type="primary" size="mini">QRCODE</el-button>
                    </template>                   
                </el-table-column>

                <el-table-column fixed="right" label="操作" width="150">
                    <template slot-scope="scope"> 
                        <el-button @click="DeleteTracker(scope.$index, scope.row)" type="danger" size="mini" >刪除</el-button>
                    </template>
                </el-table-column>

            </el-table>      

        </el-card>

        <!-- QRCODE diaglog -->
        <el-dialog title="請掃描QRCODE" :visible.sync="dialog_qrcode" width="80%" @close="DialogClose">
            <center v-loading="loading">
                <qrcode v-if="dialog_qrcode_ok" :value="dialog_qrcode_data" :options="{ width: QrcodeWidth }"></qrcode>
            </center>        
        </el-dialog>

        <!-- setting boundary dialog  -->
        <el-dialog title="設置電子圍籬" :visible.sync="dialog_boundary" width="85%" @close="DialogClose">
            <h2>目標: {{temp_marker_userinfo.username}}</h2>
            <el-input-number v-model="temp_marker_radius" placeholder="請輸入電子圍籬半徑" style="margin-bottom:5px; width:100%;"></el-input-number>
            
        
            <GmapMap
                ref="map"
                @click="ClickEvent"
                :zoom="15"
                :center="map_default_center"
                style="width: 100%; height:700px">

                <div v-if="marker_clicked">
                    <GmapMarker
                        :position="temp_marker_position">
                    </GmapMarker>
                    <GmapCircle
                        :options="{fillColor:'#0000ff',fillOpacity:0.4,strokeColor:'#0000ff',strokeOpacity:0.4}"
                        :center="temp_marker_position"
                        :radius="temp_marker_radius">
                    </GmapCircle>
                </div>

            </GmapMap>
        </el-dialog>
    </div>
</template>

<script>
import {gmapApi} from 'vue2-google-maps'
import {UpdateAllTrackers,AddTracker,DelTracker,GetAuthcode} from '@/apis/tracker.js'



export default {
    data:function(){
        return {
            loading:false,
            target_form:{"name":'',"phone":''},        
            map_default_center:{lat:23.696413,lng:120.532343},
            
            dialog_boundary:false,
            dialog_delete:false,

            // QRCODE data 
            dialog_qrcode:false,
            dialog_qrcode_ok:false,
            dialog_qrcode_data:'',

            
            marker_clicked:false,
            temp_marker_position:null, //選擇boundary所在位置的那個marker
            temp_marker_radius:0, //選擇boundary的半徑   
            temp_marker_userinfo:{}
        }
    },
    computed:{
        google:gmapApi,
        trackersInfo:function(){
            /*  return all trackers information from vuex   */
            return Object.values(this.$store.getters.trackersInfo)
        },
        QrcodeWidth:function(){
            if(document.body.clientWidth > 1000)
                return 600 
            
            return document.body.clientWidth - 100 
        },
        tracker_map:function(){
            return this.$store.getters.trackerMap
        },
    },
    methods:{
        DialogClose:function(){
            //close dialog 
            //reset some attribute  
            this.marker_clicked = false 
            this.temp_marker_position = null 
            this.temp_marker_radius = 0
            this.temp_marker_userinfo = {}
            this.dialog_boundary = false 

            // reset QRCODE status 
            this.dialog_qrcode_ok = false 
            this.dialog_qrcode = false 
        },
        ClickEvent:function(event){
            console.log(this.google)
            this.$refs.map.$mapPromise.then((map)=>{
                let click_position = {
                    lat:event.latLng.lat(),
                    lng:event.latLng.lng()
                }
                /*  會移動到所點的位置   */
                map.panTo(click_position)
                this.marker_clicked = true 
                this.temp_marker_position = click_position
            })
        },

        /*  tracker's function   */
        AddTracker:async function(){

            // send tracker info to REST API 
            let form_data = new FormData()
            await form_data.append('name',this.target_form.name)
            await form_data.append('phone',this.target_form.phone)
            let tracker_id = ''

            await AddTracker(form_data).then(res=>{
                tracker_id = res.data.tracker_id
                this.$message("新增tracker成功")
            }).catch(err=>{
                this.$message('新增tracker失敗'+err.response)
            })

            if(tracker_id!==''){
                this.loading = true
                this.dialog_qrcode = true 
                GetAuthcode(tracker_id).then(res=>{
                    console.log('auth code = '+res.data.payload.authentication_code)
                    this.dialog_qrcode_data = res.data.payload.authentication_code
                    this.loading = false 
                    this.dialog_qrcode_ok = true
                }).catch(err=>{
                    this.$message('get auth code error '+err.response)
                })               
            }

            /*  auto update al trakcers ,after adding new tracker   */
            UpdateAllTrackers(this.$store)

            
        },
        DeleteTracker:async function(index, row) {

            await DelTracker({"id":row.trackerid}).then(()=>{
                this.$message("刪除目標！")
            }).catch(err=>{
                console.log(err)
                this.$message("刪除目標失敗")
            })
            this.dialog_delete = true
            UpdateAllTrackers(this.$store)
        },
        UpdateTrackers:function(){
            console.log('update trackers')
            //GetAllTrackers again 
            UpdateAllTrackers(this.$store)
        },
        CreateQrcode:function(index,row){
            this.loading = true
            this.dialog_qrcode = true 
            GetAuthcode(row.trackerid).then(res=>{
                console.log('auth code = '+res.data.payload.authentication_code)
                this.dialog_qrcode_data = res.data.payload.authentication_code
                this.loading = false 
                this.dialog_qrcode_ok = true
            }).catch(err=>{
                this.$message('get auth code error '+err.response)
            })      
        }


    }
    
}
</script>
<style>
  #tracker_table{
    font-family: Microsoft YaHei;
    color: #2c3e50;
    margin-top: 25px;
  }
  #tracker_add{
    font-family: Microsoft YaHei;
    color: #2c3e50;
  }
  .el-row {
    margin-bottom: 20px;

  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>