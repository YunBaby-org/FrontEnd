<template>
    <div class="app-container">
        <h2>{{len2}}</h2>
        <el-select placeholder="目標" v-model="select_value" @change="SelectChange" style="width:100%; margin-bottom:10px;">
            <el-option
                v-for="(m,index) in tracker_list"
                :label="m"
                :value="m"
                :key="index">
            </el-option>
            
        </el-select>
        <boundarytable :title="select_value"></boundarytable>

    </div>
</template>



<script>
import boundarytable from '@/components/boundarytable/index.vue'
import {UpdateAllBoundarys} from '@/apis/boundary.js'
export default {
    data:function(){
        return {
            select_value : '',
            
        }
    },
    methods:{
        SelectChange:function(){
            console.log(this.tracker_map[this.select_value])
            UpdateAllBoundarys(this.tracker_map[this.select_value],0,this.$store)
        }
    },
    components:{
        boundarytable
    },
    computed:{
        len2:function(){
            console.log(this.$store.getters.boundarysList)
            return (this.$store.getters.boundarysList).length
        },
        tracker_list:function(){
            return this.$store.getters.trackerList
        },
        tracker_map:function(){
            return this.$store.getters.trackerMap
        },
    },
    created(){

    }
}
</script>










