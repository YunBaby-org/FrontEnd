import request from '../utils/request'

//const base_url = process.env.VUE_APP_BASE_URL
export function GetAllTrackers(){
    let api_url = '/api/v1/resources/users/trackers'
    let config = {
        url:api_url,
        method:'GET'
    }
    return request(config)

}

export function UpdateAllTrackers(store){
    GetAllTrackers().then(res=>{
        if(res.data['trackers']){
            store.dispatch("trackers/UpdateTrackers",res.data['trackers'])
            store.dispatch("trackers/UpdateIdMap",res.data['trackers'])
        }
        else{
            store.dispatch("trackers/UpdateTrackers",{})
            store.dispatch("trackers/UpdateIdMap",{})
        }
    }).catch(err=>{
        console.log('-------Get all trackers Error-------')
        console.log(err)
    })
}
export function AddTracker(data){
    let api_url = '/api/v1/resources/users/trackers'
    let config = {
        url:api_url,
        method:'POST',
        data
    }
    
    return request(config)
}

export function DelTracker(data){
    let api_url = '/api/v1/resources/users/trackers'
    let config = {
        url:api_url,
        method:'DELETE',
        data
    }

    return request (config)
}
export function GetAuthcode(tracker_id){
    let api_url = '/api/v1/mobile/trackers/authentication-code'
    let data = {
        "trackerId":tracker_id
    }
    let config = {
        url:api_url,
        method:'POST',
        data
    }

    return request(config)
}
