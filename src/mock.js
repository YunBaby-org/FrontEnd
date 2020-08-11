const Mock = require('mockjs')


Mock.mock('/user/locations','get',()=>{
    return {
        "markers":[
            {   
                "user":{
                    "userid":"test1id",
                    "name":"test1"
                },
                "current_position":{
                    "lat":23.693979,
                    "lng":120.530708
                },
                "fences_position":{
                    "lat":23.693979,
                    "lng":120.530708
                },
                "radius":20,
                "f_radius":30

            },
            {
                "user":{
                    "userid":"test2id",
                    "name":"test2"
                },
                "current_position":{
                    "lat":23.696344,
                    "lng":120.532068
                },
                "fences_position":{
                    "lat":23.696344,
                    "lng":120.532068
                },
                "radius":20,
                "f_radius":50
            }
        ]
    }
})

