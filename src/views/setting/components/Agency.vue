<template>
    <el-card style="width:100%" shadow="hover"> 
        <div slot="header" class="clearfix">
            <span>協尋機關資訊</span>
        </div>
    </el-card>
</template>
<script>
export default {
    
}
</script>
<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
  .el-card__header{
      background-color: #2286c3;
      color: white;
  }
</style>