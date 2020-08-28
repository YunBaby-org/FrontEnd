import request from '../utils/request'

//const base_url = process.env.VUE_APP_BASE_URL

export function GetAllTrackers(){
    let api_url = '/api/v2/resources/users/trackers'
    let config = {
        url:api_url,
        method:'GET'
    }
    return request(config)
}
export function AddTracker(){


}

export function UpdateTracker(){

}