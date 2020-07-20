const state = {
    app_name:"final project",
    sidebar:{
        open:true,
        withoutAnimation: false 
    },
    device:"desktop"
}

//會有一個固定的參數state 
const mutations = {
    TOOGLE_SIDEBAR:(state)=>{
        state.sidebar.open = !state.sidebar.open
    }
}

//會有一個固定的參數 commit 
const actions = {
    toggleSideBar:function({ commit }){
        commit("TOOGLE_SIDEBAR")
    }
}



export default {
    state,mutations,actions,
    namespaced: true,//note it 
}