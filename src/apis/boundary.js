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
function FormatTime(t){
    t = new Date(t)
    let year = t.getFullYear()
    let month = t.getMonth()+1
    let date = t.getDate()<10?('0'+t.getDate()):t.getDate()
    let hour = t.getHours()<10?('0'+t.getHours()):t.getHours()
    let minute = t.getMinutes()<10?('0'+t.getMinutes()):t.getMinutes()
    let second = t.getSeconds()<10?('0'+t.getSeconds()):t.getSeconds()
    //2020-09-16 00:00:00
    return year+'-'+month+'-'+date+' '+hour+':'+minute+':'+second
}
export function UpdateAllBoundarys(tracker_id,mode_num,store){
    GetAllBoundarys(tracker_id,mode_num).then(res=>{
        console.log(res)
        if(res.data['boundarys']!=null){
            for(let i = 0; i<Object.keys(res.data['boundarys']).length; i++){
                res.data['boundarys'][i]['time_end'] = FormatTime(res.data['boundarys'][i]['time_end'])
                res.data['boundarys'][i]['time_start'] =FormatTime(res.data['boundarys'][i]['time_start'])
            }
            store.dispatch("boundary/UpdateBoundarys",res.data)
        }

        
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