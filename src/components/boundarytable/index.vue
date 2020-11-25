<template>
    <div>
        <el-collapse-transition>
            <el-card shadow="hover" id="tracker_table" :key="title">
                <div slot="header" style="text-align:center;">
                    <h1>{{title}}的所有圍籬</h1>
                </div>
                <el-button @click="Add" type="primary" icon="el-icon-plus" circle style="margin-bottom:15px;"></el-button>
                <el-table style="width:100%;" :data="boundarylist" highlight-current-row>
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column label="起始時間">
                        <template slot-scope="props">
                            {{props.row.time_start}}
                        </template>
                    </el-table-column>

                    <el-table-column label="結束時間">
                        <template slot-scope="props">
                            {{props.row.time_end}}
                        </template>
                    </el-table-column>
                    
                    <el-table-column label="位置">
                        <template slot-scope="scope">
                            <el-button type="primary" icon="el-icon-map-location" @click="ShowBoundary(scope.$index, scope.row)"></el-button>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作">
                        <template slot-scope="scope"> 
                            <el-button @click="Change(scope.$index, scope.row)" size="mini">修改</el-button>
                            <el-button @click="Delete(scope.$index, scope.row)" type="danger" size="mini" >刪除</el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </el-card>
        </el-collapse-transition>
     
        <el-dialog title="設置電子圍籬" :visible.sync="dialog_boundary" width="85%" @close="DialogClose">
            <div v-if="dialog_mode!==0">
                <gmap-autocomplete 
                    style="width:95%;height:30px;border:0px #ccc solid;border-radius:10px;margin-bottom:10px;" 
                    :options="{fields: ['geometry']}"
                    class="pac-container" 
                    placeholder="請輸入地址" 
                    @place_changed="setPlace">
                </gmap-autocomplete>
                <el-input-number v-model="dialog_marker_radius" placeholder="請輸入電子圍籬半徑" style="margin-bottom:5px;margin-top:35px; width:100%;"></el-input-number>

                <el-date-picker
                    size="mini"
                    style="width:100%;margin-bottom:15px"
                    v-model="time"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="開始日期"
                    end-placeholder="結束日期">
                </el-date-picker>
            
                <el-button v-if="dialog_mode===1" type="primary" @click="BoundaryAction(1)" style="margin-bottom:5px; width:100%;">更新</el-button>
                <el-button v-else type="info" @click="BoundaryAction(2)" style="margin-bottom:5px; width:100%;">新增</el-button>
            </div>

            <GmapMap
                ref="map"
                @click="ClickEvent"
                :zoom="15" 
                :center="map_default_center"
                style="width: 100%; height:700px;margin-top:10px;">

                <div>
                    <GmapMarker
                        :position="dialog_marker">
                    </GmapMarker>
                   <GmapCircle
                        :options="{fillColor:'#0000ff',fillOpacity:0.4,strokeColor:'#0000ff',strokeOpacity:0.4}"
                        :center="dialog_marker"
                        :radius="dialog_marker_radius">
                    </GmapCircle>
                </div>
            </GmapMap>
        </el-dialog>
    </div>
</template>




<script>
import {gmapApi} from 'vue2-google-maps'
import {UpdateAllBoundarys} from '@/apis/boundary.js'
import {AddBoundary,UpdateBoundary,DelBoundary} from '@/apis/boundary.js'
export default {
    data:function(){
        return {
            map_default_center:{lat:23.696413,lng:120.532343},
            dialog_mode:-1,   //0 just see boundary location , 1 change(update) boundary position and set radius , 2 add new boundary
            dialog_boundary:false,
            dialog_marker:{lat:0,lng:0},
            dialog_marker_radius:0,
            dialog_marker_clicked:false,
            current_btnId:'',
            time:''
        }
    },
    computed:{
        google:gmapApi,
    },
    props:{
        title:String,
        trackerId:String,
        boundarylist:Array
    },
    methods:{
        setPlace:function(place){
            this.map_default_center.lat = place.geometry.location.lat()
            this.map_default_center.lng = place.geometry.location.lng()
        },
        FormatTime:function(t){
            let year = t.getFullYear()
            let month = t.getMonth()+1
            let date = t.getDate()<10?('0'+t.getDate()):t.getDate()
            let hour = t.getHours()<10?('0'+t.getHours()):t.getHours()
            let minute = t.getMinutes()<10?('0'+t.getMinutes()):t.getMinutes()
            let second = t.getSeconds()<10?('0'+t.getSeconds()):t.getSeconds()
            //2020-09-16 00:00:00
            return year+'-'+month+'-'+date+' '+hour+':'+minute+':'+second+'+0800'
        },
        Change:function(index, row){/*  change boundary button  */
            this.dialog_mode = 1 
            this.dialog_boundary = true 
            this.current_btnId = row.id
            
        },
        Add:function(){/*  add boundary button  */
            this.dialog_mode = 2
            this.dialog_boundary = true
        },
        Delete:async function(index, row){/*  delete boundary button  */
            
            await DelBoundary({"id":row.id}).then(()=>{
                this.$message("刪除圍籬成功")
            }).catch(err=>{
                console.log(err)
                this.$message("刪除圍籬失敗")
            })
            console.log(index,row)
            UpdateAllBoundarys(this.trackerId,0,this.$store)
        },
        ShowBoundary:function(index,row){
            console.log(index,row)
            this.dialog_mode = 0 
            this.dialog_boundary = true 
            this.dialog_marker = {lat:row.lat,lng:row.lng}
            this.dialog_marker_radius = row.radius
            this.map_default_center = this.dialog_marker

        },
        DialogClose:function(){
            this.dialog_mode = -1
            this.dialog_boundary = false 
            this.dialog_marker_clicked = false
            this.dialog_marker_radius = 0
            this.dialog_marker = {lat:0,lng:0}
            this.map_default_center = {lat:23.696413,lng:120.532343}
            this.time = ''
        },
        /*  boundary click event    */
        ClickEvent:function(event){
            if(this.dialog_mode===0)/*  dialog_mode=0,no troggle map click event */
                return ;
            
            console.log(this.google)
            this.$refs.map.$mapPromise.then((map)=>{
                let click_position = {
                    lat:event.latLng.lat(),
                    lng:event.latLng.lng()
                }
                /*  會移動到所點的位置   */
                map.panTo(click_position)
                console.log(click_position)
                this.dialog_marker_clicked = true 
                this.dialog_marker = click_position
            })
        },
        BoundaryAction:async function(mode){
            let time_start = this.FormatTime(this.time["0"])
            let time_end = this.FormatTime(this.time["1"])

            let boundary_data = {
                "boundary":{
                    "lat":this.dialog_marker.lat,
                    "lng":this.dialog_marker.lng,
                    "radius":this.dialog_marker_radius,
                    "time_start":time_start,
                    "time_end":time_end,
                },
            }
            if(mode==2){    /*  add boundary    */
                boundary_data["tkr_id"] = this.trackerId
                await AddBoundary(boundary_data).then(res=>{
                    console.log(res)
                    this.$message("新增圍籬成功")
                }).catch(err=>{
                    console.log(err)
                    this.$message("新增圍籬失敗")
                })
            }
            else if(mode==1){   /*  update boundary */
                boundary_data["bnd_id"] = this.current_btnId
                await UpdateBoundary(boundary_data).then(res=>{
                    console.log(res)
                    this.$message("更新圍籬成功")
                }).catch(err=>{
                    console.log(err)
                    this.$message("更新圍籬失敗")
                })
            }
            UpdateAllBoundarys(this.trackerId,0,this.$store)

        },

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
  .pac-container {
    z-index: 9999;
   }
</style>