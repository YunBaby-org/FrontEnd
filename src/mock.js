const Mock = require('mockjs')

Mock.mock('/user/locations','get',()=>{

    return {
        "markers":[
            {
                'position':{
                    'lat':23.696413,
                    'lng':120.532343
                  },
                  'r':80,
                  'backcolor':'#FF0000',
                  'icon':{
                    'url':require('@/assets/person1.jpg'),
                    'size': {width: 40, height: 40, f: 'px', b: 'px',},
                  
                  }
            },
            {
                'position':{
                    'lat':23.696344,
                    'lng':120.532068
                  },
                  'r':80,
                  'backcolor':'#FF0000',
                  'icon':{
                    'url':require('@/assets/person2.jpg'),
                    'size': {width: 40, height: 40, f: 'px', b: 'px',},
                  
                  }
            }
        ]
    }
})
//23.693979, 120.530708
Mock.mock('/user/locations2','get',()=>{

    return {
        "markers":[
            {
                'position':{
                    'lat':23.693979,
                    'lng':120.530708
                  },
                  'r':80,
                  'backcolor':'#FF0000',
                  'icon':{
                    'url':require('@/assets/person1.jpg'),
                    'size': {width: 40, height: 40, f: 'px', b: 'px',},
                  
                  }
            },
            {
                'position':{
                    'lat':23.696344,
                    'lng':120.532068
                  },
                  'r':80,
                  'backcolor':'#FF0000',
                  'icon':{
                    'url':require('@/assets/person2.jpg'),
                    'size': {width: 40, height: 40, f: 'px', b: 'px',},
                  
                  }
            }
        ]
    }
})