import request from '../utils/request'

//const base_url = process.env.VUE_APP_BASE_URL
//api_url = base_url + .......
export function GetAllTrackers(){
    let api_url = '/api/v2/resources/users/trackers'
    let config = {
        url:api_url,
        method:'GET'
    }
    return request(config)
}
export function AddTracker(){
    let api_url = '/api/v2/resources/'

}
export function UpdateBoundary(){
    let api_url = '/api/v1/resources/users/boundary'
    let config = {
        url:api_url,
        method:'PUT'
    }
}
export function UpdateTracker(){

}