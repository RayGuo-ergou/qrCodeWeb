"use strict";(self["webpackChunkqrcode_frontend"]=self["webpackChunkqrcode_frontend"]||[]).push([[535],{7230:function(e,o,s){s.r(o),s.d(o,{default:function(){return C}});var a=s(3396),r=(s(7658),s(9242)),t=s(4870),n=s(7537),l=s(2483),c=s(4677);const u=e=>((0,a.dD)("data-v-e9cc16f0"),e=e(),(0,a.Cn)(),e),i={class:"container"},d=u((()=>(0,a._)("h1",null,"Login in",-1))),m=["onSubmit"],p={class:"form-group row"},g={for:"email",class:"col6"},v={class:"form-group row"},w={for:"password",class:"col6"},b=u((()=>(0,a._)("button",{type:"submit",class:"btn btn-primary"},"Submit",-1)));var _=(0,a.aZ)({__name:"LoginForm",setup(e){const o=(0,l.tv)(),s=(0,c.pm)(),u=(0,t.iH)(""),_=(0,t.iH)(""),f=async()=>{await n.Z.login({email:u.value,password:_.value}).then((e=>{const{data:a}=e;localStorage.setItem("username",a.username),localStorage.setItem("email",a.email),s.success("Login success, redirect to home page.",{timeout:3e3,closeOnClick:!0,pauseOnFocusLoss:!0,pauseOnHover:!0,draggable:!0,draggablePercent:.6,showCloseButtonOnHover:!1,hideProgressBar:!0,closeButton:"button",icon:!0,rtl:!1}),o.push("/")})).catch((e=>{console.log(e);let o="Server error, something went wrong";null!=e.response?.data?.error.message&&(o=e.response?.data?.error.message),s.error(o,{timeout:5e3,closeOnClick:!0,pauseOnFocusLoss:!0,pauseOnHover:!0,draggable:!0,draggablePercent:.6,showCloseButtonOnHover:!1,hideProgressBar:!0,closeButton:"button",icon:!0,rtl:!1})}))};return(e,o)=>((0,a.wg)(),(0,a.iD)("div",i,[d,(0,a._)("form",{onSubmit:(0,r.iM)(f,["prevent"])},[(0,a._)("div",p,[(0,a._)("label",g,[(0,a.Uk)(" Email address "),(0,a.wy)((0,a._)("input",{type:"email",class:"form-control",id:"email",placeholder:"Enter email","onUpdate:modelValue":o[0]||(o[0]=e=>u.value=e)},null,512),[[r.nr,u.value]])])]),(0,a._)("div",v,[(0,a._)("label",w,[(0,a.Uk)(" Password "),(0,a.wy)((0,a._)("input",{type:"password",class:"form-control",id:"password",placeholder:"Password","onUpdate:modelValue":o[1]||(o[1]=e=>_.value=e)},null,512),[[r.nr,_.value]])])]),b],40,m)]))}}),f=s(89);const h=(0,f.Z)(_,[["__scopeId","data-v-e9cc16f0"]]);var k=h,O=(0,a.aZ)({__name:"LoginView",setup(e){return(e,o)=>((0,a.wg)(),(0,a.j4)(k))}});const y=O;var C=y}}]);
//# sourceMappingURL=login.c3386a73.js.map