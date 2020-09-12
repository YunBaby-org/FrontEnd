const state = {
    boundarys:[]
 
}

const mutations = {
    UPDATE_BOUNDARYS:function(state,new_boundarys){
        state.boundarys = new_boundarys
    }
}


const actions = {
    UpdateBoundarys:function({commit},data){
        /*
            data parms 
            [
                {
                    id: "ad1d4884-f51d-11ea-8925-53dafed1ba3f"
                    lat: 1.111
                    lng: 22.22
                    radius: 150
                    time_end: "03:30:30"
                    time_start: "02:29:00"
                    weekday_end: 7
                    weekday_start: 4
                },
                {
                    .......
                }
            ]
        */
        commit("UPDATE_BOUNDARYS",data.boundarys)
    }
}



export default { 
    state,mutations,actions,
    namespaced: true,//note it 
}