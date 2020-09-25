<template>
  <div class="app-container" style="height:100%">
    <el-row :gutter="20" >
      <el-col :span="8" :xs="24" style="margin-bottom:10px;">
        <!-- Userprofile component -->
        <Userprofile></Userprofile>
      </el-col>

      <el-col :span="16" :xs="24" style="margin-bottom:10px;">
        <!-- Agency component -->
        <Agency></Agency>
      </el-col>
    </el-row>
  </div>
</template>


<script>
import Userprofile from './components/Userprofile'
import Agency from './components/Agency'
export default {
    components:{
      Userprofile,Agency
    }
}
</script>