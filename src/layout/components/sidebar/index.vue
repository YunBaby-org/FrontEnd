<template>
    <div :class="{'has-logo':test}">
        <el-scrollbar wrap-class="scrollbar-wrapper">
   
        </el-scrollbar>
    </div>
</template>

<script>

export default {
    data:function(){
        return {
            test:false
        }
    }
}
</script>