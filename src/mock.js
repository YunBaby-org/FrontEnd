const Mock = require('mockjs-async')



Mock.mock('/api/v1/resources/users/me','get',async()=>{

    return{
        "message":"fucking error",
    }
})
Mock.mock('/api/v1/resources/users/information','get',async()=>{
    await new Promise(resolve=>{
        setTimeout(()=>{
            console.log('timeout')
            resolve()
        },3000)
    })
    return {
        "name":"邱品峰",
        "email":"azsx26735546@gmail.com"
    }
})
// Mock.mock('/api/v2/resources/users/trackers','get',async()=>{
//     await new Promise(resolve=>{
//         setTimeout(()=>{
//             console.log('timeout')
//             resolve()
//         },3000)
//     })
//     return {
//         "trackers":[
//             {
//                 "name":"邱品峰",
//                 "email":"azsx26735546@gmail.com",
//                 "phone":"0905579955"
//             },
//             {
//                 "name":"安安安",
//                 "email":"azsx26735546@gmail.com",
//                 "phone":"0905579947"
//             }
//         ]
//     }
// })
// Mock.mock('/api/v1/resources/users/trackers','get',async()=>{
//     await new Promise(resolve=>{
//         setTimeout(()=>{
//             console.log('timeout')
//             resolve()
//         },3000)
//     })
//     return {
//         "trackers":[
//             {
//                 "name":"邱品峰",
//                 "email":"azsx26735546@gmail.com",
//                 "phone":"0905579955"
//             },
//             {
//                 "name":"邱品峰2",
//                 "email":"azsx26735546@gmail.com",
//                 "phone":"0905579947"
//             },
//             {
//                 "name":"邱品峰3",
//                 "email":"azsx26735546@gmail.com",
//                 "phone":"0905579956"
//             },
//             {
//                 "name":"邱品峰4",
//                 "email":"azsx26735546@gmail.com",
//                 "phone":"0905579978"
//             },
//             {
//                 "name":"邱品峰5",
//                 "email":"azsx26735546@gmail.com",
//                 "phone":"0905579912"
//             }
//         ]
//     }
// })
Mock.mock('/user/path/toby5500','get',()=>{
    return {
        "path":[
            {
                "lat":23.690079,
                "lng":120.535701
            },
            {
                "lat":23.690023,
                "lng":120.535427
            },
            {
                "lat":23.689959,
                "lng":120.534982
            },
            {
                "lat":23.689885,
                "lng":120.534558
            },
            {
                "lat":23.689853,
                "lng":120.534333
            },
            {
                "lat":23.689686,
                "lng":120.534365
            }
        ]
    }
})
Mock.mock('/api/v2/resources/users/trackers','get',()=>{
    return {
        "trackers":{
            "test1id":{   
                "userid":"test1id",
                "name":"name1",
                "email":"azsx26735546@gmail.com",
                "phone":"0905579955"
            },
            "test2id":{   
                "userid":"test2id",
                "name":"name2",
                "email":"azsx26735546@gmail.com",
                "phone":"0905579947"
            },
            "test3id":{   
                "userid":"test3id",
                "name":"name3",
                "email":"azsx26735546@gmail.com",
                "phone":"0905579955"
            },
            "test4id":{   
                "userid":"test4id",
                "name":"name4",
                "email":"azsx26735546@gmail.com",
                "phone":"0905579947"
            },
        }
    }
})
Mock.mock('/user/locations','get',()=>{
    return {
        "markers":{
            "test1id":{
                "name":"name1",
                "current_position":{
                    "lat":23.693979,
                    "lng":120.530708
                },
                "radius":20,
                "fence_position":{
                    "lat":23.693979,
                    "lng":120.530708
                },
                "fence_radius":30
            },
            "test2id":{
                "name":"name2",
                "current_position":{
                    "lat":23.696344,
                    "lng":120.532068
                },
                "radius":20,
                "fence_position":{
                    "lat":23.696344,
                    "lng":120.532068
                },
                "fence_radius":50
            },            
        }
    }
})
// Mock.mock('/user/locations','get',()=>{
//     return {
//         "markers":[
//             {   
//                 "user":{
//                     "userid":"test1id",
//                     "name":"name1"
//                 },
//                 "current_position":{
//                     "lat":23.693979,
//                     "lng":120.530708
//                 },
//                 "fences_position":{
//                     "lat":23.693979,
//                     "lng":120.530708
//                 },
//                 "radius":20,
//                 "f_radius":30

//             },
//             {
//                 "user":{
//                     "userid":"test2id",
//                     "name":"name2"
//                 },
//                 "current_position":{
//                     "lat":23.696344,
//                     "lng":120.532068
//                 },
//                 "fences_position":{
//                     "lat":23.696344,
//                     "lng":120.532068
//                 },
//                 "radius":20,
//                 "f_radius":50
//             }
//         ]
//     }
// })

