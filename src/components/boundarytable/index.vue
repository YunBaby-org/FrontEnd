<template>
    <div>
        <transition appear enter-active-class="animate__animated animate__fadeInTopLeft"  mode="out-in">
            <el-card shadow="hover" id="tracker_table" :key="title">
                <div slot="header" style="text-align:center;">
                    <h1>{{title}}的所有圍籬</h1>
                </div>
                <el-button @click="AddBoundary" type="primary" icon="el-icon-plus" circle style="margin-bottom:15px;"></el-button>
                <el-table style="width:100%;" :data="boundarylist" highlight-current-row>
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column label="起始時間">
                        <template slot-scope="props">
                            星期{{ props.row.weekday_start }} {{props.row.time_start}}
                        </template>
                    </el-table-column>

                    <el-table-column label="結束時間">
                        <template slot-scope="props">
                            星期{{ props.row.weekday_end }} {{props.row.time_end}}
                        </template>
                    </el-table-column>
                    
                    <el-table-column label="位置">
                        <template slot-scope="scope">
                            <el-button type="primary" icon="el-icon-map-location" @click="ShowBoundary(scope.$index, scope.row)"></el-button>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作">
                        <template slot-scope="scope"> 
                            <el-button @click="ChangeBoundary(scope.$index, scope.row)" size="mini">修改</el-button>
                            <el-button @click="DeleteBoundary(scope.$index, scope.row)" type="danger" size="mini" >刪除</el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </el-card>
        </transition>
        <el-dialog title="設置電子圍籬" :visible.sync="dialog_boundary" width="85%" @close="DialogClose">
            <div v-if="dialog_mode!==0">
                <el-input-number v-model="dialog_marker_radius" placeholder="請輸入電子圍籬半徑" style="margin-bottom:5px; width:100%;"></el-input-number>
          
                <el-row>
                <div>
                    <el-select v-model="weekday.start" placeholder="请选择">
                        <el-option
                            v-for="(day,index) in weekdayList"
                            :key="index"
                            :label="day"
                            :value="day">
                        </el-option>
                    </el-select>
                    <el-time-picker>

                    </el-time-picker>
                </div>
                <div>
                    <el-select v-model="weekday.end" placeholder="请选择">
                        <el-option
                            v-for="(day,index) in weekdayList"
                            :key="index"
                            :label="day"
                            :value="day">
                        </el-option>
                    </el-select>
                    <el-time-picker>
                        
                    </el-time-picker>
                </div>
                </el-row>
        
                <el-button v-if="dialog_mode===1" type="primary" @click="UpdateBoundary" style="margin-bottom:5px; width:100%;">更新</el-button>
                <el-button v-else type="info" @click="UpdateBoundary" style="margin-bottom:5px; width:100%;">新增</el-button>
            </div>
            <GmapMap
                ref="map"
                @click="ClickEvent"
                :zoom="15"
                :center="map_default_center"
                style="width: 100%; height:700px">

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
export default {
    data:function(){
        return {
            map_default_center:{lat:23.696413,lng:120.532343},
            dialog_mode:-1,   //0 just see boundary location , 1 change(update) boundary position and set radius , 2 add new boundary
            dialog_boundary:false,
            dialog_marker:{lat:0,lng:0},
            dialog_marker_radius:0,
            dialog_marker_clicked:false,
            weekday:{start:'星期一',end:'星期一'},
            weekdayList:['星期一','星期二','星期三','星期四','星期五','星期六','星期日',]
        }
    },
    computed:{
        google:gmapApi,
    },
    props:{
        title:String,
        boundarylist:Array
    },
    methods:{
        ChangeBoundary:function(index, row){
            this.dialog_mode = 1 
            this.dialog_boundary = true 
            console.log(index,row)
        },
        AddBoundary:function(){
            this.dialog_mode = 2
            this.dialog_boundary = true
        },
        DeleteBoundary:function(index, row){
            console.log(index,row)
        },
        ShowBoundary:function(index,row){
            console.log(index,row)
            this.dialog_mode = 0 
            this.dialog_boundary = true 
            this.dialog_marker = {lat:row.lat,lng:row.lng}
            this.dialog_marker_radius = row.radius
            this.map_default_center = this.dialog_marker
            // this.$refs.map.$mapPromise.then((map)=>{
            //     map.panTo(this.dialog_marker)
            // })
        },
        DialogClose:function(){
            this.dialog_mode = -1
            this.dialog_boundary = false 
            this.dialog_marker_clicked = false
            this.map_default_center = {lat:23.696413,lng:120.532343}
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
                this.dialog_marker_clicked = true 
                this.dialog_marker = click_position
            })
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

</style>