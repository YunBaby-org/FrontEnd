<template>
    <el-card style="width:100%" shadow="hover"> 
        <div slot="header" class="clearfix">
            <span>協尋機關資訊</span>
        </div>
        <div class="agency">
          <div class="agency-card">
            <el-card>
              <el-row :gutter="10">
                <el-col :span="8">
                  <el-image style="width:100%;" :src="yuntech_pic"></el-image>
                </el-col>
                <el-col :span="16">
                  <div style="width:100%">
                    <p style="padding-bottom:5px;border-bottom: 1px solid #dfe6ec;font-weight:bold;">國立雲林科技大學</p>
                    <p>聯絡電話: </p>
                    <p>地址: 64002雲林縣斗六市大學路三段123號</p>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </div>
          <div class="agency-card">
            <el-card>
              <el-row :gutter="10">
                <el-col :span="8">
                  <el-image style="width:100%;" :src="police_pic"></el-image>
                </el-col>
                <el-col :span="16">
                  <div style="width:100%">
                    <p style="padding-bottom:5px;border-bottom: 1px solid #dfe6ec;font-weight:bold;">雲林縣警察局</p>
                    <p>聯絡電話: 05 532 2042</p>
                    <p>地址: 640雲林縣斗六市大學路三段100號</p>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </div>
          <div class="agency-card">
            <el-card>
              <el-row :gutter="10">
                <el-col :span="8">
                  <el-image style="width:100%;" :src="hospital_pic"></el-image>
                </el-col>
                <el-col :span="16">
                  <div style="width:100%">
                    <p style="padding-bottom:5px;border-bottom: 1px solid #dfe6ec;font-weight:bold;">台大醫院斗六分院</p>
                    <p>聯絡電話: 05 532 3911</p>
                    <p>地址: 640雲林縣斗六市雲林路二段579號</p>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </div>
        </div>
    </el-card>
</template>
<script>
import yuntech_pic from '@/assets/agency/yuntech.jpg'
import police_pic from '@/assets/agency/police.jpg'
import hospital_pic from '@/assets/agency/hospital.jpg'
export default {
    data:function(){
      return {
        yuntech_pic,
        police_pic,
        hospital_pic
      }
    }
}
</script>
<style lang="scss">
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
  .agency{
    color: #606266;
    .agency-card{
      margin-bottom: 15px;;
    }
  }
</style>