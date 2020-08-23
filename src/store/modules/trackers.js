const state = {

    trackers_list:null

}

const mutations = {
    UPDATE_TRACKER_LIST:function(state,new_track_list){
        console.log('update tracker list (mutation)')
        state.trackers_list = new_track_list
    }
}


const actions = {
    UpdateTrackerList:function({commit},data){
        console.log('update tracker list (action)')
        commit("UPDATE_TRACKER_LIST",data)
    }
}



export default {
    state,mutations,actions,
    namespaced: true,//note it 
}