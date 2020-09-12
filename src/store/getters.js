const getters = {
    sidebar:(state)=>state.app.sidebar,
    userinfo:(state)=>state.user.userinfo,
    trackerList:(state)=>state.trackers.tracker_list,
    trackersInfo:(state)=>state.trackers.trackers,
    trackerMap:(state)=>state.trackers.id_map,
    boundarysList:(state)=>state.boundary.boundarys
}

export default getters