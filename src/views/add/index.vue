<template>
    <div class="app-container">
        <el-card shadow="hover" id="tracker_add">
            <div slot="header" style="text-align:center;">
                <h1>新增追蹤目標</h1>
            </div>
            <el-row :gutter="10" justify="center" type="flex" style="align-items: center;display: flex;">
                <el-col :xs="10" :sm="6" :md="6" :lg="4" :xl="2">目標信箱</el-col>
                <el-col :xs="14" :sm="6" :md="9" :lg="9" :xl="9">
                    <el-input v-model="target_form.email" placeholder="enter tracker's email"></el-input>
                </el-col>
            </el-row>
            <el-row :gutter="10" justify="center" type="flex" style="align-items: center;display: flex;">
                <el-col :xs="10" :sm="6" :md="6" :lg="4" :xl="2">目標密碼</el-col>
                <el-col :xs="14" :sm="6" :md="9" :lg="9" :xl="9">
                    <el-input v-model="target_form.password" placeholder="enter tracker's email"></el-input>
                </el-col>
            </el-row>
            <el-button round style="margin:0 auto;display:block; width:100px;" type="primary" plain>新增</el-button>        

        </el-card>
        <!-- 
            lg = 一般大型螢幕
            md = 中型螢幕
            sm = 小型設備
            xs = 超小型設備
         -->
        <el-card shadow="hover" id="tracker_table">
            <div slot="header" style="text-align:center;">
                <h1>追蹤清單</h1>
            </div>
            <el-button @click="refresh" type="primary" icon="el-icon-refresh" circle style="margin-bottom:15px;"></el-button>
            <el-table
                :data="trackerList"
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

                <el-table-column
                    prop="email"
                    label="信箱">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                <template>
                    <el-button type="text" size="small">刪除</el-button>
                </template>
                </el-table-column>
            </el-table>      

        </el-card>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data:function(){
        return {
            target_form:{
                "email":null,
                "password":null
            }
        }
    },
    computed:{
        trackerList:function(){
            return this.$store.getters.trackerList
        }
    },
    methods:{
        refresh:function(){
            axios.get('/api/v2/resources/users/trackers').then(res=>{
                
                console.log(res.data['trackers'])
                let tracker_list = res.data['trackers']
                //this.trackerList = tracker_list
                this.$store.dispatch("trackers/UpdateTrackerList",tracker_list)
            }).catch(err=>{
                console.log(err)
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