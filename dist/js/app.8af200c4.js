(function(e){function t(t){for(var r,i,s=t[0],c=t[1],u=t[2],d=0,l=[];d<s.length;d++)i=s[d],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&l.push(o[i][0]),o[i]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);f&&f(t);while(l.length)l.shift()();return a.push.apply(a,u||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,i=1;i<n.length;i++){var s=n[i];0!==o[s]&&(r=!1)}r&&(a.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},i={app:0},o={app:0},a=[];function s(e){return c.p+"js/"+({}[e]||e)+"."+{"chunk-2d0d6ad5":"a240203e","chunk-2f01ec93":"bf98ef21","chunk-5c6818b6":"b3f6aaf7","chunk-71304131":"b019107c","chunk-f7e79dc8":"4dfa40b0"}[e]+".js"}function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n={"chunk-2f01ec93":1,"chunk-5c6818b6":1,"chunk-71304131":1,"chunk-f7e79dc8":1};i[e]?t.push(i[e]):0!==i[e]&&n[e]&&t.push(i[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-2d0d6ad5":"31d6cfe0","chunk-2f01ec93":"8d5e9e9c","chunk-5c6818b6":"7673280e","chunk-71304131":"32aac7fa","chunk-f7e79dc8":"7d092be3"}[e]+".css",o=c.p+r,a=document.getElementsByTagName("link"),s=0;s<a.length;s++){var u=a[s],d=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(d===r||d===o))return t()}var l=document.getElementsByTagName("style");for(s=0;s<l.length;s++){u=l[s],d=u.getAttribute("data-href");if(d===r||d===o)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var r=t&&t.target&&t.target.src||o,a=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");a.code="CSS_CHUNK_LOAD_FAILED",a.request=r,delete i[e],f.parentNode.removeChild(f),n(a)},f.href=o;var p=document.getElementsByTagName("head")[0];p.appendChild(f)})).then((function(){i[e]=0})));var r=o[e];if(0!==r)if(r)t.push(r[2]);else{var a=new Promise((function(t,n){r=o[e]=[t,n]}));t.push(r[2]=a);var u,d=document.createElement("script");d.charset="utf-8",d.timeout=120,c.nc&&d.setAttribute("nonce",c.nc),d.src=s(e);var l=new Error;u=function(t){d.onerror=d.onload=null,clearTimeout(f);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),i=t&&t.target&&t.target.src;l.message="Loading chunk "+e+" failed.\n("+r+": "+i+")",l.name="ChunkLoadError",l.type=r,l.request=i,n[1](l)}o[e]=void 0}};var f=setTimeout((function(){u({type:"timeout",target:d})}),12e4);d.onerror=d.onload=u,document.head.appendChild(d)}return Promise.all(t)},c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/",c.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],d=u.push.bind(u);u.push=t,u=u.slice();for(var l=0;l<u.length;l++)t(u[l]);var f=d;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"0cf0":function(e,t,n){"use strict";var r=n("2a25"),i=n.n(r);i.a},1602:function(e,t,n){"use strict";n.d(t,"b",(function(){return d})),n.d(t,"a",(function(){return l}));n("d3b7");var r=n("bc3a"),i=n.n(r),o=n("5c96");i.a.defaults.withCredentials=!0;var a=function(e){o["Message"].error(e)},s=i.a.create({baseURL:Object({NODE_ENV:"production",VUE_APP_BASE_URL:"http://140.125.205.78",BASE_URL:"/"}).BASE_API_URL,timeout:5e3});s.interceptors.request.use((function(e){return e}),(function(e){return console.log("ERRROR in request interceptors"),Promise.reject(e)})),s.interceptors.response.use((function(e){return e}),(function(e){return console.log("response攔截"),console.log(e.response),a(e.response.data.error),new Promise.reject(e)}));var c=s,u="http://140.125.205.78";function d(e){var t={url:u+":5001/auth/login",method:"POST",data:e};return console.log("data",e),c(t)}function l(e){console.log("api = "+e);var t={url:u+"/user/info",method:"GET",params:{token:e,name:"eric",age:18}};return c(t)}},"236b":function(e,t,n){},"2a25":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},o=[],a={components:{},data:function(){return{}},methods:{},mounted:function(){}},s=a,c=n("2877"),u=Object(c["a"])(s,i,o,!1,null,null,null),d=u.exports,l=(n("d3b7"),n("8c4f")),f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-wrapper",class:e.ResizeSidebar},["mobile"===e.device&&e.sidebar.open?n("div",{staticClass:"drawer-bg",on:{click:e.handleClickOutside}}):e._e(),n("sidebar",{staticClass:"sidebar-container"}),n("div",{staticClass:"main-container"},[n("div",{class:{"fixed-header":e.fixedheader}},[n("navbar")],1),n("MainContent")],1)],1)},p=[],m=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:{"has-logo":e.test}},[n("el-scrollbar",{attrs:{"wrap-class":"scrollbar-wrapper"}},[n("el-menu",{attrs:{"default-active":e.active_index,"background-color":e.variables.menuBg,"text-color":e.variables.menuText,"active-text-color":e.variables.menuActiveText,"collapse-transition":!1,collapse:!e.sidebar.open,"unique-opened":!1,mode:"vertical"}},e._l(e.routes,(function(e,t){return n("sidebaritem",{key:e.path,attrs:{item:e,base_path:e.path,item_index:t+""}})})),1)],1)],1)},h=[],b=n("cf1e"),v=n.n(b),g=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.item.hidden?e._e():n("div",[n("el-menu-item",{attrs:{index:e.item_index},on:{click:e.push}},[n("i",{class:e.item.meta.icon}),n("span",{attrs:{slot:"title"},slot:"title"},[e._v(e._s(e.item.meta.title))])])],1)},_=[],w={props:{item:{type:Object,required:!0},base_path:{type:String},item_index:{required:!0}},methods:{push:function(){this.$router.push(this.item.path+"/index"),"mobile"===this.$store.state.app.device&&this.$store.dispatch("app/closeSideBar",{withoutAnimation:!1})}}},E=w,S=Object(c["a"])(E,g,_,!1,null,null,null),k=S.exports,x={components:{sidebaritem:k},data:function(){return{test:!1,array:[1,2,3,4,5,6],test_close:!1,active_index:"1"}},computed:{variables:function(){return v.a},routes:function(){return this.$router.options.routes},testing:function(){return[1,2,3,4,5,6]},sidebar:function(){return this.$store.state.app.sidebar}},mounted:function(){}},y=x,A=Object(c["a"])(y,m,h,!1,null,null,null),O=A.exports,T=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"navbar"},[n("hamburger",{staticClass:"hamburger-container",attrs:{isActive:e.sidebar.open},on:{toggleClick:e.toggleSideBar}}),n("div",{staticClass:"right-menu"},[n("el-dropdown",{staticClass:"avatar-container",attrs:{trigger:"click"}},[n("div",{staticClass:"avatar-wrapper"},[n("el-avatar",{attrs:{src:e.userinfo.userimg}}),n("i",{staticClass:"el-icon-arrow-down"})],1),n("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[n("el-dropdown-item",[e._v("test1")]),n("el-dropdown-item",[e._v("test2")]),n("el-dropdown-item",[e._v("test3")])],1)],1)],1)],1)},C=[],B=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticStyle:{padding:"0 15px"},on:{click:e.toggleClick}},[n("svg",{staticClass:"hamburger",class:{"is-active":e.isActive},attrs:{viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg",width:"64",height:"64"}},[n("path",{attrs:{d:"M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"}})])])},M=[],$={methods:{toggleClick:function(){this.$emit("toggleClick")}},props:{isActive:{type:Boolean,default:!1}}},j=$,R=(n("65c2"),Object(c["a"])(j,B,M,!1,null,"3bbf4dcb",null)),L=R.exports,P={components:{hamburger:L},methods:{toggleSideBar:function(){this.$store.dispatch("app/toggleSideBar")}},computed:{sidebar:function(){return this.$store.getters.sidebar},userinfo:function(){return this.$store.getters.userinfo}}},z=P,H=(n("7e96"),Object(c["a"])(z,T,C,!1,null,"d0a4df88",null)),D=H.exports,I=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-main"},[n("transition",{attrs:{name:"fade-transform",mode:"out-in"}},[n("router-view")],1)],1)},G=[],U={computed:{key:function(){return this.$route.path}}},N=U,q=(n("c34f"),n("0cf0"),Object(c["a"])(N,I,G,!1,null,"63387c6e",null)),J=q.exports,V=n("2f62"),K={sidebar:function(e){return e.app.sidebar},userinfo:function(e){return e.user.userinfo}},W=K,F=n("a78e"),Q=n.n(F),Z={app_name:"final project",sidebar:{open:!Q.a.get("sidebarStatus")||!!+Q.a.get("sidebarStatus"),withoutAnimation:!1},device:"desktop"},X={TOOGLE_SIDEBAR:function(e){e.sidebar.open=!e.sidebar.open,e.sidebar.withoutAnimation=!1,1==e.sidebar.open?Q.a.set("sidebarStatus",1):Q.a.set("sidebarStatus",0)},CLOSE_SIDEBAR:function(e,t){Q.a.set("sidebarStatus",0),e.sidebar.open=!1,e.sidebar.withoutAnimation=t},TOGGLE_DEVICE:function(e,t){e.device=t}},Y={toggleSideBar:function(e){var t=e.commit;t("TOOGLE_SIDEBAR")},closeSideBar:function(e,t){var n=e.commit,r=t.withoutAnimation;n("CLOSE_SIDEBAR",r)},toggleDevice:function(e,t){var n=e.commit;n("TOGGLE_DEVICE",t)}},ee={state:Z,mutations:X,actions:Y,namespaced:!0},te=n("1602"),ne="token";function re(){return Q.a.get(ne)}function ie(){return Q.a.remove(ne)}var oe={userinfo:{token:re(),username:"",userimg:"https://i.imgur.com/4cBfkJM.png"}},ae={SET_TOKEN:function(e,t){console.log("set token"),e.userinfo.token=t},SET_USERNAME:function(e,t){e.userinfo.username=t},SET_USERIMG:function(e,t){e.userinfo.userimg=t},RESET_STATE:function(e){e.userinfo.token=re(),e.userinfo.userimg="https://i.imgur.com/4cBfkJM.png",e.userinfo.username="default"}},se={GetUserInfo:function(e){var t=e.commit,n=e.state;return new Promise((function(e,r){Object(te["a"])(n.userinfo.token).then((function(n){var r=n.data,i=r.username,o=r.userimg;t("SET_USERNAME",i),t("SET_USERIMG",o),e(r)})).catch((function(e){console.lg("GetUserInfo error :"+e),r(e)}))}))},Login:function(e){var t=e.commit;console.log("Login action"),t("SET_TOKEN","default-token")},ResetToken:function(e){var t=e.commit;return new Promise((function(e){ie(),t("RESET_STATE"),e()}))}},ce={state:oe,mutations:ae,actions:se,namespaced:!0};r["default"].use(V["a"]);var ue=new V["a"].Store({modules:{app:ee,user:ce},getters:W}),de=document,le=de.body,fe=992,pe={watch:{$route:function(){"mobile"===this.device&&this.sidebar.opened&&ue.dispatch("app/closeSideBar",{withoutAnimation:!1})}},beforeMount:function(){window.addEventListener("resize",this.$_resizeHandler)},beforeDestroy:function(){window.removeEventListener("resize",this.$_resizeHandler)},mounted:function(){var e=this.$_isMobile();e&&(ue.dispatch("app/toggleDevice","mobile"),ue.dispatch("app/closeSideBar",{withoutAnimation:!0}))},methods:{$_isMobile:function(){var e=le.getBoundingClientRect();return e.width-1<fe},$_resizeHandler:function(){if(!document.hidden){var e=this.$_isMobile();ue.dispatch("app/toggleDevice",e?"mobile":"desktop"),e&&ue.dispatch("app/closeSideBar",{withoutAnimation:!0})}}}},me={name:"layout",mixins:[pe],data:function(){return{show:!1}},components:{sidebar:O,navbar:D,MainContent:J},computed:{device:function(){return this.$store.state.app.device},sidebar:function(){return this.$store.state.app.sidebar},fixedheader:function(){return!0},ResizeSidebar:function(){return{hideSidebar:!this.sidebar.open,openSidebar:this.sidebar.open,withoutAnimation:this.sidebar.withoutAnimation,mobile:"mobile"===this.device}}},methods:{handleClickOutside:function(){this.$store.dispatch("app/closeSideBar",{withoutAnimation:!1})}}},he=me,be=(n("fa50"),Object(c["a"])(he,f,p,!1,null,"72f3905c",null)),ve=be.exports;r["default"].use(l["a"]);var ge=[{path:"/",name:"/",component:ve,hidden:!0},{path:"/home",component:ve,children:[{path:"index",name:"Home",component:function(){return n.e("chunk-2f01ec93").then(n.bind(null,"7abe"))}}],meta:{title:"Home",icon:"el-icon-s-home"}},{path:"/setting",component:ve,children:[{path:"index",name:"Setting",component:function(){return n.e("chunk-2d0d6ad5").then(n.bind(null,"7424"))}}],meta:{title:"Setting",icon:"el-icon-setting"}},{path:"/map",component:ve,meta:{title:"Map",icon:"el-icon-map-location"},children:[{path:"index",name:"Map",component:function(){return n.e("chunk-f7e79dc8").then(n.bind(null,"8d76"))}}]},{path:"/login",name:"Login",component:function(){return n.e("chunk-5c6818b6").then(n.bind(null,"9ed6"))},hidden:!0},{path:"/register",name:"Register",component:function(){return n.e("chunk-71304131").then(n.bind(null,"d5c2"))},hidden:!0}],_e=new l["a"]({base:"/",routes:ge}),we=_e,Ee=n("5c96"),Se=n.n(Ee),ke=(n("0fae"),n("b20f"),n("f5df1"),n("755e"));r["default"].config.productionTip=!1,r["default"].use(Se.a),r["default"].use(ke,{load:{key:"AIzaSyAzCmhQf0yflZJWG3FbMbv0gwjop0qBVrE",libraries:"places"}}),new r["default"]({router:we,store:ue,render:function(e){return e(d)}}).$mount("#app")},"65c2":function(e,t,n){"use strict";var r=n("7eef"),i=n.n(r);i.a},"7e96":function(e,t,n){"use strict";var r=n("f616"),i=n.n(r);i.a},"7eef":function(e,t,n){},b20f:function(e,t,n){e.exports={menuText:"#bfcbd9",menuActiveText:"#409eff",subMenuActiveText:"#f4f4f5",menuBg:"#304156",menuHover:"#263445",subMenuBg:"#1f2d3d",subMenuHover:"#001528",sideBarWidth:"210px"}},c34f:function(e,t,n){"use strict";var r=n("e73e"),i=n.n(r);i.a},cf1e:function(e,t,n){e.exports={menuText:"#bfcbd9",menuActiveText:"#409eff",subMenuActiveText:"#f4f4f5",menuBg:"#304156",menuHover:"#263445",subMenuBg:"#1f2d3d",subMenuHover:"#001528",sideBarWidth:"210px"}},e73e:function(e,t,n){},f616:function(e,t,n){},fa50:function(e,t,n){"use strict";var r=n("236b"),i=n.n(r);i.a}});
//# sourceMappingURL=app.8af200c4.js.map