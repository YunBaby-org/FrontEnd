const Mock = require('mockjs')

// Mock.mock('/user/locations','get',()=>{

//     return {
//         "markers":[
//             {
//                 'position':{
//                     'lat':23.696413,
//                     'lng':120.532343
//                   },
//                   'r':80,
//                   'backcolor':'#FF0000',
//                   'icon':{
//                     'url':require('@/assets/person1.jpg'),
//                     'size': {width: 40, height: 40, f: 'px', b: 'px',},
                  
//                   }
//             },
//             {
//                 'position':{
//                     'lat':23.696344,
//                     'lng':120.532068
//                   },
//                   'r':80,
//                   'backcolor':'#FF0000',
//                   'icon':{
//                     'url':require('@/assets/person2.jpg'),
//                     'size': {width: 40, height: 40, f: 'px', b: 'px',},
                  
//                   }
//             }
//         ]
//     }
// })
//23.693979, 120.530708

Mock.mock('/user/locations','get',()=>{
    return {
        "markers":[
            {   
                "user":{
                    "userid":"test1id",
                    "name":"test1"
                },
                "position":{
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
                "position":{
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

Mock.mock('/user/fences','get',()=>{
    // return all user's fences lat lng and radius
    return {
        "fences":[
            {
                "userid":"test1id",
                "fences_position":{
                    "lat":23.693979,
                    "lng":120.530708
                },
                "fences_radius":80
            },
            {
                "userid":"test2id",
                "fences_position":{
                    "lat":23.696344,
                    "lng":120.532068
                },
                "fences_radius":80
            }
        ]
    }
})