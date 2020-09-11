(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c6379796"],{4069:function(t,e,a){"use strict";var n=a("c1dc"),r=a.n(n);r.a},"8d76":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container",staticStyle:{height:"100%"}},[a("div",{staticClass:"color-mark",staticStyle:{width:"100%"}},[a("el-row",[a("div",{staticStyle:{width:"15px",height:"15px","background-color":"#FF6666",display:"inline-block","margin-right":"10px"}}),t._v("電子圍籬範圍 "),a("div",{staticStyle:{width:"15px",height:"15px","background-color":"#B266FF",display:"inline-block","margin-right":"10px"}}),t._v("目標誤差半徑 ")])],1),a("el-select",{staticStyle:{width:"100%","margin-bottom":"10px"},attrs:{placeholder:"目標"},on:{change:t.SelectChange},model:{value:t.select_value,callback:function(e){t.select_value=e},expression:"select_value"}},t._l(t.tracker_list,(function(t,e){return a("el-option",{key:e,attrs:{label:t,value:t}})})),1),a("transition",{attrs:{appear:"","enter-active-class":"animate__animated animate__fadeInTopLeft",mode:"out-in"}},[t.function_enable?a("div",[a("el-row",{staticStyle:{"margin-bottom":"10px"},attrs:{type:"flex"}},[a("el-col",[a("el-switch",{staticStyle:{display:"block"},attrs:{"active-color":"#13ce66","inactive-color":"#ff4949","inactive-text":"自動回報"},on:{change:t.AutoReport},model:{value:t.auto_report,callback:function(e){t.auto_report=e},expression:"auto_report"}})],1),a("el-col",[a("el-switch",{staticStyle:{display:"block"},attrs:{"active-color":"#13ce66","inactive-color":"#ff4949","inactive-text":"省電模式"},on:{change:t.PowerSave},model:{value:t.power_mode,callback:function(e){t.power_mode=e},expression:"power_mode"}})],1)],1),a("el-row",[a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.SendRequest("GetPowerStatus")}}},[t._v("目標手機電力 "+t._s(t.target_power)+"%")]),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.SendRequest("ScanWifiSignal")}}},[t._v("啟用wifi定位")]),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.SendRequest("ScanGPS")}}},[t._v("啟用GPS定位")])],1)],1):t._e()]),a("el-row",[a("el-button",{staticStyle:{width:"100%","margin-bottom":"10px","margin-top":"10px"},attrs:{type:"primary"},on:{click:t.StartTracking}},[t._v("開啟追蹤")])],1),a("GmapMap",{ref:"map",staticStyle:{width:"100%",height:"700px"},attrs:{center:t.map_default_center,zoom:18,"map-type-id":"terrain",options:{mapTypeControl:!1}}},[t.marker_loading?a("div",[a("GmapMarker",{attrs:{position:t.target},on:{click:t.MarkerEvent}}),a("GmapInfoWindow",{attrs:{opened:t.info_window,position:t.target},on:{closeclick:t.InfoWindowClose}},[t._v(" lat: "+t._s(t.target.lat)+" lng: "+t._s(t.target.lng)+" ")]),a("GmapCircle",{attrs:{options:{fillColor:"#ff0000",fillOpacity:.4,strokeColor:"#ff0000",strokeOpacity:.4},center:t.current_boundary,radius:t.boundary_radius}})],1):t._e()])],1)},r=[],o=a("755e"),i=a("e7e3"),s=a("b775");function c(t){var e={url:"/api/v1/action/send-request",method:"POST",data:t};return Object(s["a"])(e)}var l=a("c6e1"),u=a.n(l),p="ws://"+location.hostname+":15674/ws";function d(){console.log("on connect")}function _(){console.log("on error")}function g(){var t=u.a.over(new WebSocket(p));return t.connect("guest","guest",d,_),t}var f={computed:{google:o["gmapApi"],CurrentMarker:function(){return this.markers[this.select_value]},tracker_list:function(){return this.$store.getters.trackerList},tracker_map:function(){return this.$store.getters.trackerMap},tracker:function(){return this.$store.getters.trackersInfo[this.select_value]}},data:function(){return{map_default_center:{lat:23.696413,lng:120.532343},info_window:!1,select_value:"請選擇目標",target:{lat:0,lng:0},target_power:0,current_boundary:{lat:0,lng:0},boundary_radius:0,stomp_client:null,subscribe_id:null,markers:null,marker_loading:!1,function_enable:!1,roads:[],auto_report:!0,power_mode:!1}},methods:{AutoReport:function(){var t={Request:"SetAutoReport",Payload:{Enable:this.auto_report},tracker_name:this.select_value};c(t)},PowerSave:function(){var t={Request:"SetPowerSaving",Payload:{Enable:this.power_mode},tracker_name:this.select_value};c(t)},SendRequest:function(t){var e={Request:t,tracker_name:this.select_value};c(e)},MarkerEvent:function(){this.info_window=!0},SelectChange:function(){var t=this;this.marker_loading=!0,this.function_enable=!0,console.log("selection change"),this.stomp_client&&this.subscribe_id&&(this.stomp_client.unsubscribe(this.subscribe_id),this.target.lat=0,this.target.lat=0,this.map_default_center.lat=23.696413,this.map_default_center.lng=120.532343),Object(i["a"])(this.tracker_map[this.select_value]).then((function(e){t.current_boundary={lat:parseFloat(e.data.boundary.lat),lng:parseFloat(e.data.boundary.lng)},t.boundary_radius=e.data.boundary.radius}))},InfoWindowClose:function(){this.info_window=!1},StartTracking:function(){console.log(this.stomp_client);var t="/exchange/tracker-event/tracker.".concat(this.select_value,".notification.respond"),e=this.stomp_client.subscribe(t,this.on_message);this.subscribe_id=e.id,console.log("subscribe id is ",this.subscribe_id)},on_message:function(t){console.log("message is "+t.body);var e=JSON.parse(t.body);switch(e.Response){case"GetPowerStatus":console.log("GetPowerStatus Response"),this.target_power=e.Result.CapacityLevel;break;case"GetDeviceStatus":console.log("GetDeviceStatus Response");break;case"GetVersion":console.log("GetVersion Response");break;case"ScanGPS":console.log("ScanGPS Response"),this.target.lat=e.Result.Latitude,this.target.lng=e.Result.Longitude,this.map_default_center.lat=e.Result.Latitude,this.map_default_center.lng=e.Result.Longitude;break;case"ScanWifiSignal":console.log("ScanWifiSignal Response");break}}},created:function(){this.stomp_client=g()}},h=f,m=(a("4069"),a("2877")),b=Object(m["a"])(h,n,r,!1,null,"f959f0ac",null);e["default"]=b.exports},c1dc:function(t,e,a){},e7e3:function(t,e,a){"use strict";a.d(e,"a",(function(){return r})),a.d(e,"b",(function(){return o}));var n=a("b775");function r(t){var e="/api/v1/resources/users/boundary",a={url:e,method:"GET",params:{tracker:t}};return Object(n["a"])(a)}function o(t,e){var a="/api/v1/resources/users/boundary",r={url:a,method:"PUT",params:{tracker:t},data:e};return Object(n["a"])(r)}}}]);
//# sourceMappingURL=chunk-c6379796.f6715c6a.js.map