<template>
    <div class="app-container">
      
        <el-select placeholder="目標" v-model="select_value" @change="SelectChange" style="width:100%; margin-bottom:10px;">
            <el-option
                v-for="(m,index) in tracker_list"
                :label="m"
                :value="m"
                :key="index">
            </el-option>
            
        </el-select>
        <boundarytable v-if="select_value!==''" :title="select_value" :boundarylist="boundary_list" :trackerId="tracker_map[select_value]"></boundarytable>

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
        boundary_list:function(){
            return this.$store.getters.boundarysList
        }
    },
    created(){

    }
}
</script>










