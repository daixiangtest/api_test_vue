"use strict";(self["webpackChunkapi_test_vue"]=self["webpackChunkapi_test_vue"]||[]).push([[824],{1241:function(e,s){s.A=(e,s)=>{const a=e.__vccOpts||e;for(const[l,r]of s)a[l]=r;return a}},6146:function(e,s,a){a.r(s),a.d(s,{default:function(){return v}});a(4114);var l=a(6768),r=a.p+"img/login_left4.145c9b34.png",t=a.p+"img/logo.86894e27.png",o=a(144),n=a(1552),i=a(1219),u=a(1387),d=a(8457);const c={class:"login_page"},p={class:"login_box"},m={class:"right_box"},g={class:"login_form"};var f={__name:"LoginView",setup(e){const s=(0,o.Kh)({username:"",password:""}),a=(0,u.rd)(),f=(0,d.L)(),k=(0,o.KR)();function _(e){e.validate((async function(l){if(!l)return;const r=await n.A.loginApi(s);200==r.status?((0,i.nk)({message:"登录成功",type:"success"}),f.saveToken(r.data.token),f.saveUserName(s.username),a.push({name:"project"})):(i.nk.error("登录失败"),e.resetFields())}))}function v(e){e.resetFields()}const b=(0,o.Kh)({username:[{required:!0,message:"用户名不能为空",trigger:"blur"}],password:[{required:!0,message:"密码不能为空",trigger:"blur"},{min:6,max:10,message:"密码长度在6到10为之间",trigger:"blur"}]});return(e,a)=>{const o=(0,l.g2)("el-input"),n=(0,l.g2)("el-form-item"),i=(0,l.g2)("el-button"),u=(0,l.g2)("el-form");return(0,l.uX)(),(0,l.CE)("div",c,[(0,l.Lk)("div",p,[a[7]||(a[7]=(0,l.Lk)("div",{class:"left_box"},[(0,l.Lk)("img",{src:r,class:"login_img"})],-1)),(0,l.Lk)("div",m,[a[6]||(a[6]=(0,l.Lk)("div",{class:"header"},[(0,l.Lk)("div",{class:"logo"},[(0,l.Lk)("img",{src:t})]),(0,l.Lk)("div",{class:"title"},"自动化测试平台")],-1)),(0,l.Lk)("div",g,[(0,l.bF)(u,{model:s,"label-width":"auto",style:{"max-width":"600px"},rules:b,ref_key:"loginRef",ref:k},{default:(0,l.k6)((()=>[(0,l.bF)(n,{prop:"username"},{default:(0,l.k6)((()=>[(0,l.bF)(o,{modelValue:s.username,"onUpdate:modelValue":a[0]||(a[0]=e=>s.username=e),placeholder:"请输入用户名","prefix-icon":"Avatar"},null,8,["modelValue"])])),_:1}),(0,l.bF)(n,{prop:"password"},{default:(0,l.k6)((()=>[(0,l.bF)(o,{modelValue:s.password,"onUpdate:modelValue":a[1]||(a[1]=e=>s.password=e),type:"password",placeholder:"请输入密码","prefix-icon":"Lock"},null,8,["modelValue"])])),_:1}),(0,l.bF)(n,null,{default:(0,l.k6)((()=>[(0,l.bF)(i,{onClick:a[2]||(a[2]=e=>v(k.value)),style:{width:"185px"},round:""},{default:(0,l.k6)((()=>a[4]||(a[4]=[(0,l.eW)("重置")]))),_:1}),(0,l.bF)(i,{onClick:a[3]||(a[3]=e=>_(k.value)),type:"primary",style:{width:"185px"},round:""},{default:(0,l.k6)((()=>a[5]||(a[5]=[(0,l.eW)("登录")]))),_:1})])),_:1})])),_:1},8,["model","rules"])])])])])}}},k=a(1241);const _=(0,k.A)(f,[["__scopeId","data-v-b36759fe"]]);var v=_}}]);
//# sourceMappingURL=824.e76ea394.js.map