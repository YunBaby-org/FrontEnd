import request from '../utils/request'

export function SendToPhone(data){
    /*
        data
        {
            Request:"GetPowerStatus",
            Payload:{
                "Enable":true
            }
        }
    */
    let config = {
        url:'/api/v1/action/send-request',
        method:'POST',
        data
    }

    return request(config)
}