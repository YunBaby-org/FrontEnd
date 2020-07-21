import router from './router'
//import store from './store'
//import {Message} from 'element-ui'
import NProgress from 'nprogress'
import {getToken} from '@/utils/auth'
import store from './store'
NProgress.configure({showSpinner:false})

const whiteList = ['/login'] // no redirect whitelist

/* 
    router beforeeach，簡單講就是導航守衛，可以用來
    做一些保護，例如未拿到驗證token，就不能往下
*/
router.beforeEach(async(to,from,next)=>{
    /*
        每次要切換route的時候，先去取得token 
        然後nprogress開始跑
        若你沒有token，就把你push到/login這個route 
    */
    NProgress.start()
    const token = getToken()
    console.log("token: "+token)
    console.log('to-path:  '+to.path)
    if(token){
        //如果你已經有token了(登陸驗證過)，就要防止你再次回到login page 
        if(to.path === '/login'){
            next('/')
            NProgress.done()
        }
        else{
            //拿到token後，往下做的時候要先fetch userinfo ，如果沒有使用者資訊，就可能有問題
            const userinfo = store.getters.userinfo
            if(userinfo.name){
                next()
            }
            else{
                try{
                    await store.dispatch('user/GetUserInfo') 
                    next()
                }catch(err){
                    await store.dispatch('user/ResetToken')//reset token and states
                    next(`/login?redirect=${to.path}`)
                    NProgress.done()
                }
                /*
                    放一個try===>重新取得userinfo一次(可能是剛登入)
                    catch ===>如果中途發生錯誤，沒有取得，reset cookie，然後請你重新登入
                */
            } 
        }
    }
    else{
        
        if (whiteList.indexOf(to.path) !== -1) {
            // in the free login whitelist, go directly(一些不需要login的頁面)
            next()
        } else {
            // other pages that do not have permission to access are redirected to the login page.
            //沒有token就把你丟回去login 
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }
    }
    ///login
    next()
})

router.afterEach(()=>{
    //到了目的地後，nprogess結束
    NProgress.done()
})