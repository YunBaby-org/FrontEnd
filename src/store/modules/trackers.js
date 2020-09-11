const state = {

    trackers:{},//tracker's information 
    tracker_list:[], //tracker list ["test1id","test2id",.....]
    id_map:{}// name to trackerid map 
}

const mutations = {
    UPDATE_TRACKERS:function(state,new_trackers){
        console.log('update tracker list (mutation)')
        state.trackers = new_trackers
    },
    UPDATE_TRACKER_LIST:function(state,new_tracker_list){
        console.log('update tracker list (mutation)')
        state.tracker_list = new_tracker_list
    },
    UPDATE_ID_MAP:function(state,new_map){
        console.log('update id map (mutation)')
        state.id_map = new_map
    }
}


const actions = {
    /*  用來更新所有tracker的個人資訊   */
    UpdateTrackers:function({commit},data){
        console.log('update tracker list (action)')
        commit("UPDATE_TRACKERS",data)
    },

    /*  更新該user所追蹤的tracker (list)  */
    UpdateTrackerList:function({commit},data){
        console.log('update tracker list (action)')
        commit("UPDATE_TRACKER_LIST",data)
    },


    UpdateIdMap:function({commit},data){
        console.log('update id_map (action)')
        let temp = {}
        for(let key in data){
            temp[data[key].name] = key 
        }
        commit("UPDATE_ID_MAP",temp)
        commit("UPDATE_TRACKER_LIST",Object.keys(temp))
    }
}



export default { 
    state,mutations,actions,
    namespaced: true,//note it 
}