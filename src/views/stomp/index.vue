<template>
    <div class="app-container">
        <el-input v-model="target_id" style="margin-bottom:30px;" placeholder="please enter target's id "></el-input>
        <el-button style="width:100%;margin-bottom:30px;" @click="StartSubscribe">subscribe</el-button>
        <h1>{{status}}</h1>
        <h1>{{target}}</h1>
        <!-- <el-button @click="test_axios">test axios </el-button>
        <el-button @click="test_axios2">test axios </el-button> -->
        <GmapMap
            :center="map_default_center"
            :zoom="18"
            map-type-id="terrain"
            style="width: 100%; height:700px"
            :options="{mapTypeControl:false}"
            ref="map">
            <GmapMarker
                :position='target'>
            </GmapMarker>
        </GmapMap>

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
            status:"",
            d:"none",
            map_default_center:{
                lat:23.696413,
                lng:120.532343
            },
            target_id:"",
            target:{
                lat:0,
                lng:0
            }
        }
    },
    methods:{
        // test_axios:function(){
        //     let path = '/api/v1/resource/'
        //     axios.get(path).then((res)=>{
        //         console.log(path)
        //         console.log('test axios is ok ')
        //         console.log(res)
        //         window.alert(res.data)
        //     })
        // },
        // test_axios2:function(){
        //     let path = 'api/v1/auth/'
        //     axios.get(path).then(res=>{
        //         console.log(path)
        //         console.log(res.data)
        //         window.alert(res.data)
        //     })
        // },
        StompConnect:function(){
            //this.ws = new WebSocket('ws://127.0.0.1:15674/ws')
            this.ws = new WebSocket('ws://'+location.hostname+':15674/ws')
            this.client = webstomp.over(this.ws)
            this.client.connect(process.env.VUE_APP_AMQP_USER,process.env.VUE_APP_AMQP_PASSWORD,this.on_connect,this.on_error)
        },
        on_connect:function(){
            console.log('connected..........')
            this.status = 'ok'
        },
        on_error:function(){
            console.log('error.........')
            this.status = 'error'

        },
        on_message:function(msg){
            this.message = msg.body 
            console.log('message is '+msg.body)
            let temp_position = JSON.parse(msg.body)
            console.log(temp_position)
            this.target.lat = temp_position.Result.Latitude
            this.target.lng = temp_position.Result.Longitude
        },
        StartSubscribe:function(){
            let destination = `/exchange/tracker-event/tracker.${this.target_id}.notification.respond`
            this.client.subscribe(destination,this.on_message)
        },
        SendToQueue:function(){
 
        },
        SendToTopic:function(){
    
        }
    },
    computed:{

    },
    created(){
        this.StompConnect()
        console.log('host = ')
        console.log(location.hostname)
    }
}
</script>