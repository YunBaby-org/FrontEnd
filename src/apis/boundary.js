import request from '../utils/request'



/*
Get current boundary
*/
export function GetBoundaryPosition(tracker_id,mode_num){
    let api_url = '/api/v1/resources/users/boundary'
    let config = {
        url:api_url,
        method:'GET',
        params:{
            tracker:tracker_id,
            mode:mode_num
        }
    }

    return request(config)
}



/*
    Get All boundary
*/
export function GetAllBoundarys(tracker_id,mode_num){
    let api_url = '/api/v1/resources/users/boundary'
    let config = {
        url:api_url,
        method:'GET',
        params:{
            tracker:tracker_id,
            mode:mode_num
        }
    }

    return request(config)
}

/*
    update all boundary in VUEX
*/
export function UpdateAllBoundarys(tracker_id,mode_num,store){
    GetAllBoundarys(tracker_id,mode_num).then(res=>{
        console.log(res)
        store.dispatch("boundary/UpdateBoundarys",res.data)
    }).catch(err=>{
        console.log(err)
        store.dispatch("boundary/UpdateBoundarys",[])
        window.alert('update boundary error')
    })
}

/*
    update certain boundary (call restful)
*/
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


export function AddBoundary(data){
    let api_url = '/api/v1/resources/users/boundary'
    let config = {
        url:api_url,
        method:'POST',
        data
    }
    return request(config)
}
export function DelBoundary(data){
    let api_url = '/api/v1/resources/users/boundary'
    let config = {
        url:api_url,
        method:'DELETE',
        data
    }
    return request(config)
}
export function UpdateBoundary(data){
    let api_url = '/api/v1/resources/users/boundary'
    let config = {
        url:api_url,
        method:'PUT',
        data
    }
    return request(config)
}