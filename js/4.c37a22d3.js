(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{"713b":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-layout",{attrs:{view:"hHh lpR fFf"}},[a("q-header",{staticClass:"bg-transparent text-primary",attrs:{elevated:"",reveal:"","reveal-offset":300}},[a("q-toolbar",["/"!==this.$route.path?a("q-btn",{attrs:{flat:"",round:"",dense:"",icon:"arrow_back"},on:{click:function(e){return t.$router.back(-1)}}}):t._e(),a("q-toolbar-title",[t._v("\n        "+t._s(t.$t("title"))+"\n      ")]),a("q-space"),a("q-btn",{staticClass:"q-ml-md",attrs:{color:"white","text-color":"primary",round:"",ripple:"",icon:"settings"},on:{click:function(e){t.right=!t.right}}},[a("q-tooltip",{attrs:{"content-class":"bg-primary"}},[t._v("\n          "+t._s(t.$t("setting.settingsDesc"))+"\n        ")])],1)],1)],1),a("q-drawer",{attrs:{elevated:"",side:"right"},model:{value:t.right,callback:function(e){t.right=e},expression:"right"}},[a("q-scroll-area",{staticClass:"fit",attrs:{"thumb-style":t.thumbStyle,"bar-style":t.barStyle}},[a("q-list",[a("q-item-label",{attrs:{header:""}},[t._v("\n          "+t._s(t.$t("setting.settings"))+"\n        ")]),a("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:"",tabindex:"1"},on:{click:t.toggleDarkMode}},[a("q-item-section",{attrs:{avatar:""}},[a("q-avatar",{attrs:{icon:"lightbulb_outline",color:"secondary","text-color":"white"}})],1),a("q-item-section",[a("q-item-label",[t._v(t._s(t.$q.dark.isActive?t.$t("setting.dayMode"):t.$t("setting.nightMode")))]),a("q-item-label",{attrs:{caption:""}},[t._v("\n              "+t._s(t.$t("setting.currentlyIn"))+" "+t._s(t.$q.dark.isActive?t.$t("setting.nightMode"):t.$t("setting.dayMode"))+"\n            ")])],1)],1),a("q-separator",{attrs:{inset:"",spaced:""}}),a("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:"",tabindex:"2"},on:{click:function(e){return t.$q.fullscreen.toggle()}}},[a("q-item-section",{attrs:{avatar:""}},[a("q-avatar",{attrs:{icon:t.$q.fullscreen.isActive?"fullscreen_exit":"fullscreen",color:"primary","text-color":"white"}})],1),a("q-item-section",[a("q-item-label",[t._v(t._s(t.$q.fullscreen.isActive?t.$t("setting.normalMode"):t.$t("setting.fullScreenMode")))]),a("q-item-label",{attrs:{caption:""}},[t._v("\n              "+t._s(t.$t("setting.currentlyIn"))+" "+t._s(t.$q.fullscreen.isActive?t.$t("setting.fullScreenMode"):t.$t("setting.normalMode"))+"\n            ")])],1)],1),a("q-separator",{attrs:{inset:"",spaced:""}}),a("q-item-label",{attrs:{header:""}},[t._v("\n          "+t._s(t.$t("setting.language"))+"\n        ")]),a("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{tag:"label",tabindex:"3"}},[a("q-item-section",{attrs:{avatar:""}},[a("q-radio",{attrs:{val:"en-us",color:"accent","text-color":"white"},model:{value:t.lang,callback:function(e){t.lang=e},expression:"lang"}})],1),a("q-item-section",[a("q-item-label",[t._v(t._s(t.$t("setting.enUs")))]),a("q-item-label",{attrs:{caption:""}},[t._v("\n              "+t._s(t.$t("setting.currentlyIn"))+" "+t._s(t.$t("setting.enUs"))+"\n            ")])],1)],1),a("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{tag:"label",tabindex:"4"}},[a("q-item-section",{attrs:{avatar:""}},[a("q-radio",{attrs:{val:"zh-hans",color:"negative","text-color":"white"},model:{value:t.lang,callback:function(e){t.lang=e},expression:"lang"}})],1),a("q-item-section",[a("q-item-label",[t._v(t._s(t.$t("setting.zhSimple")))]),a("q-item-label",{attrs:{caption:""}},[t._v("\n              "+t._s(t.$t("setting.currentlyIn"))+" "+t._s(t.$t("setting.zhSimple"))+"\n            ")])],1)],1)],1)],1)],1),a("q-page-container",[a("router-view")],1)],1)},n=[],i=(a("d3b7"),a("e6cf"),a("9224")),r={name:"MainLayout",data:function(){return{title:i["a"],searchText:"",lang:this.$i18n.locale,right:!1}},computed:{thumbStyle:function(){return{right:"4px",borderRadius:"5px",backgroundColor:"#369cf5",width:"8px"}},barStyle:function(){return{right:"2px",borderRadius:"9px",backgroundColor:"#369cf598",width:"9px",opacity:.2}}},watch:{"$q.dark.isActive":function(t){this.$q.localStorage.set("dark",t),this.right=!this.right},"$q.fullscreen.isActive":function(t){this.right=!this.right},lang:function(t){var e=this;this.$q.localStorage.set("lang",t),a("8488")("./"+t).then((function(t){e.$i18n.locale=t.default.isoName})),this.right=!this.right}},created:function(){this.lang=this.$i18n.locale,this.query=this.$route.query},mounted:function(){},methods:{toggleDarkMode:function(){this.$q.dark.toggle()}}},c=r,o=a("2877"),l=a("4d5a"),u=a("e359"),d=a("65c6"),f=a("9c40"),b=a("6ac5"),p=a("2c91"),g=a("05c0"),h=a("9404"),m=a("4983"),v=a("1c1c"),j=a("0170"),q=a("66e5"),k=a("4074"),$=a("cb32"),_=a("eb85"),x=a("3786"),w=a("09e3"),y=a("7f67"),Q=a("eebe"),S=a.n(Q),M=Object(o["a"])(c,s,n,!1,null,"64716b2e",null);e["default"]=M.exports;S()(M,"components",{QLayout:l["a"],QHeader:u["a"],QToolbar:d["a"],QBtn:f["a"],QToolbarTitle:b["a"],QSpace:p["a"],QTooltip:g["a"],QDrawer:h["a"],QScrollArea:m["a"],QList:v["a"],QItemLabel:j["a"],QItem:q["a"],QItemSection:k["a"],QAvatar:$["a"],QSeparator:_["a"],QRadio:x["a"],QPageContainer:w["a"]}),S()(M,"directives",{ClosePopup:y["a"]})},8488:function(t,e,a){var s={"./":["a6d8",3,0],"./ar":["13ef",9,0],"./ar.js":["13ef",9,0],"./bg":["a6b2",9,0],"./bg.js":["a6b2",9,0],"./ca":["8378",9,0],"./ca.js":["8378",9,0],"./cs":["5ddc",9,0],"./cs.js":["5ddc",9,0],"./da":["d3e4",9,0],"./da.js":["d3e4",9,0],"./de":["215a",9,0],"./de.js":["215a",9,0],"./el":["83bc",9,0],"./el.js":["83bc",9,0],"./en-gb":["17f5",9,0],"./en-gb.js":["17f5",9,0],"./en-us":["1f91",9],"./en-us.js":["1f91",9],"./eo":["b25b",9,0],"./eo.js":["b25b",9,0],"./es":["df1a",9,0],"./es.js":["df1a",9,0],"./et":["c3ad",9,0],"./et.js":["c3ad",9,0],"./fa":["a0f3",9,0],"./fa-ir":["b67a",9,0],"./fa-ir.js":["b67a",9,0],"./fa.js":["a0f3",9,0],"./fi":["10c0",9,0],"./fi.js":["10c0",9,0],"./fr":["34fe",9,0],"./fr.js":["34fe",9,0],"./gn":["3c87",9,0],"./gn.js":["3c87",9,0],"./he":["36eb",9,0],"./he.js":["36eb",9,0],"./hr":["007f",9,0],"./hr.js":["007f",9,0],"./hu":["a9af",9,0],"./hu.js":["a9af",9,0],"./id":["7e40",9,0],"./id.js":["7e40",9,0],"./index":["a6d8",3,0],"./index.json":["a6d8",3,0],"./it":["a745",9,0],"./it.js":["a745",9,0],"./ja":["5521",9,0],"./ja.js":["5521",9,0],"./km":["726e",9,0],"./km.js":["726e",9,0],"./ko-kr":["187f",9,0],"./ko-kr.js":["187f",9,0],"./kur-ckb":["d9db",9,0],"./kur-ckb.js":["d9db",9,0],"./lu":["1ee2",9,0],"./lu.js":["1ee2",9,0],"./lv":["004e",9,0],"./lv.js":["004e",9,0],"./ml":["c454",9,0],"./ml.js":["c454",9,0],"./ms":["bf26",9,0],"./ms.js":["bf26",9,0],"./nb-no":["dacc",9,0],"./nb-no.js":["dacc",9,0],"./nl":["8cf4",9,0],"./nl.js":["8cf4",9,0],"./pl":["700f",9,0],"./pl.js":["700f",9,0],"./pt":["37ed",9,0],"./pt-br":["f476",9,0],"./pt-br.js":["f476",9,0],"./pt.js":["37ed",9,0],"./ro":["fecf",9,0],"./ro.js":["fecf",9,0],"./ru":["14c0",9,0],"./ru.js":["14c0",9,0],"./sk":["15e6",9,0],"./sk.js":["15e6",9,0],"./sl":["5e5a",9,0],"./sl.js":["5e5a",9,0],"./sr":["78dc",9,0],"./sr.js":["78dc",9,0],"./sv":["7107",9,0],"./sv.js":["7107",9,0],"./ta":["3572",9,0],"./ta.js":["3572",9,0],"./th":["c9b0",9,0],"./th.js":["c9b0",9,0],"./tr":["c1a5",9,0],"./tr.js":["c1a5",9,0],"./ug":["c290",9,0],"./ug.js":["c290",9,0],"./uk":["6464",9,0],"./uk.js":["6464",9,0],"./vi":["1fb0",9,0],"./vi.js":["1fb0",9,0],"./zh-hans":["bf69",9,0],"./zh-hans.js":["bf69",9,0],"./zh-hant":["db10",9,0],"./zh-hant.js":["db10",9,0]};function n(t){if(!a.o(s,t))return Promise.resolve().then((function(){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}));var e=s[t],n=e[0];return Promise.all(e.slice(2).map(a.e)).then((function(){return a.t(n,e[1])}))}n.keys=function(){return Object.keys(s)},n.id="8488",t.exports=n},9224:function(t){t.exports=JSON.parse('{"a":"ViToAu App"}')}}]);