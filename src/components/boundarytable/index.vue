<template>
    <div>
        <transition appear enter-active-class="animate__animated animate__fadeInTopLeft"  mode="out-in">
            <el-card shadow="hover" id="tracker_table" :key="title">
                <div slot="header" style="text-align:center;">
                    <h1>{{title}}</h1>
                </div>
                <el-table style="width:100%;">
                        
                </el-table>
            </el-card>
        </transition>
    </div>
</template>




<script>
export default {
    props:{
        title:String
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