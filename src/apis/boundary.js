import request from '../utils/request'



export function GetBoundaryPosition(tracker_id){
    let api_url = '/api/v1/resources/users/boundary'
    let config = {
        url:api_url,
        method:'GET',
        params:{
            tracker:tracker_id
        }
    }

    return request(config)
}

export function UpdateBoundaryPosition(tracker_id,data){
    let api_url = '/api/v1/resources/users/boundary'
    let config = {
        url:api_url,
        method:'PUT',
        params:{
            tracker:tracker_id
        },
        data
    }

    return request(config)
}