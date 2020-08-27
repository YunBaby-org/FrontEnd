<template>
    <div class="app-container">
        <h1>this is stomp</h1>
        <el-row>
            <el-col :span="6">
                <el-input v-model="send_msg"></el-input>
            </el-col>
            <el-col :span="6">
                <el-button @click="SendToQueue(send_msg)">send</el-button>                 
            </el-col>
       
        </el-row>

        <el-row>
            <el-col :span="6">
                <el-button @click="StartSubscribe">subscribe</el-button>
            </el-col>
        </el-row>
        <h1>{{message}}</h1>

    </div>
</template>



<script>
import webstomp from 'webstomp-client';
export default {
    data(){
        return {
            ws:null,
            client:null,
            send_msg:null,
            message:null,
        }
    },
    methods:{
        StompConnect:function(){
            
            this.ws = new WebSocket('ws://127.0.0.1:15674/ws')
            this.client = webstomp.over(this.ws)
            this.client.connect('guest','guest',this.on_connect,this.on_error)
        },
        on_connect:function(){
            console.log('connected..........')
        },
        on_error:function(){
            console.log('error.........')
        },
        on_message:function(msg){
            this.message = msg.body 
            console.log('message is '+msg.body)
        },
        StartSubscribe:function(){
            this.client.subscribe('/queue/tracker.aaa96148.requests',this.on_message)
        },
        SendToQueue:function(msg){
            this.client.send('/queue/tracker.aaa96148.requests',msg,{})
        },
        SendToTopic:function(msg){
            this.client.send('/topic/monitor.boundary',msg,{})
        }
    },
    computed:{

    },
    created(){
        this.StompConnect()
    }
}
</script>