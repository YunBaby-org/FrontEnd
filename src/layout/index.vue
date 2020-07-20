<template>
    <div class="app-wrapper">

        <sidebar class="sidebar-container"></sidebar>
        <div class="main-container">
            <div :class="{'fixed-header':fixedheader}">
                <navbar></navbar>
            </div>
            <MainContent></MainContent>
        </div>
    </div>
</template>


<script>

import sidebar from './components/sidebar/index.vue'
import navbar from './components/navbar'
import MainContent from './components/MainContent'
export default {
    name:"layout",
    data:function(){
        return {
            show:false
        }
    },
    components:{
        sidebar,
        navbar,
        MainContent

    },
    computed:{
        fixedheader:function(){
            return true 
        }
    }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>