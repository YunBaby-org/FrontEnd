import webstomp from 'webstomp-client'
//const url = 'ws://localhost:15674/ws'
const url = 'ws://'+location.hostname+':15674/ws'
function on_connect(){
    console.log('on connect')
}
function on_error(){
    console.log('on error')
}
export function CreateStompClient(){
    let client = webstomp.over(new WebSocket(url))
    client.connect(process.env.VUE_APP_AMQP_USER,process.env.VUE_APP_AMQP_PASSWORD,on_connect,on_error)
    return client
}