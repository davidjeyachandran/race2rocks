(this.webpackJsonprace2rocks=this.webpackJsonprace2rocks||[]).push([[0],{149:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(42),l=a.n(c),o=(a(50),a(4)),u=a(25),i=a.n(u);function s(e){var t=e.split(":"),a=t.length,n=0;return t.forEach((function(e,t){n+=parseInt(e)*Math.pow(60,a-t-1)})),n}var m=function(e,t){var a=[];return e.forEach((function(e){e.hasOwnProperty(t)&&(a.includes(e[t])||a.push(e[t]))})),a.sort()};a(52);var f=function(e){var t=e.data;return r.a.createElement("tr",null,r.a.createElement("td",null,t.Name),r.a.createElement("td",null,t.Time),r.a.createElement("td",null,t.Category),r.a.createElement("td",null,t.Year))};var d=function(e){var t=e.data;return r.a.createElement("div",null,r.a.createElement("table",null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Name"),r.a.createElement("th",null,"Time"),r.a.createElement("th",null,"Category"),r.a.createElement("th",null,"Year"))),r.a.createElement("tbody",null,t.map((function(e){return r.a.createElement(f,{key:e.Name+e.Time+e.Year,data:e})})))))};a(53);var h=function(e){var t=e.years,a=e.setYear,c=e.filterName,l=e.categories,u=e.setCategory,i=Object(n.useState)(""),s=Object(o.a)(i,2),m=s[0],f=s[1];function d(e){var t=e.currentTarget.dataset.id;f(""),a(parseInt(t))}function h(e){var t=e.currentTarget.dataset.id;f(""),u(t)}var v={float:"left",textDecoration:"underline",listStyle:"none",padding:"10px"};return r.a.createElement("div",null,r.a.createElement("ul",null,t.map((function(e){return r.a.createElement("li",{onClick:d,key:e,"data-id":e,style:v},e)}))),r.a.createElement("ul",null,l.map((function(e){return r.a.createElement("li",{onClick:h,key:e,"data-id":e,style:v},e)}))),r.a.createElement("br",null),r.a.createElement("input",{className:"clearfix",placeholder:"search...",onChange:function(e){var t=e.target.value;f(t),c(t)},value:m}))},v=a(43);function E(e,t){var a=s(e.Time),n=s(t.Time);return a>n?1:n>a?-1:0}function p(e,t){return e.Year>t.Year?1:e.Year<t.Year?-1:0}var b=function(e){var t=e.filteredData,a=t.sort(p).map((function(e){var t=s(e.Time)/60;return Math.round(1e3*t)/1e3})),n={labels:m(t,"Year"),datasets:[{label:t[0].Name,backgroundColor:"rgba(255,99,132,0.2)",borderColor:"rgba(255,99,132,1)",borderWidth:1,hoverBackgroundColor:"rgba(255,99,132,0.4)",hoverBorderColor:"rgba(255,99,132,1)",data:a}]};return r.a.createElement(r.a.Fragment,null,r.a.createElement(v.a,{data:n,width:100,height:50}))};var g=function(){var e=Object(n.useState)([]),t=Object(o.a)(e,2),a=t[0],c=t[1],l=Object(n.useState)([]),u=Object(o.a)(l,2),s=u[0],f=u[1],v=Object(n.useState)([]),p=Object(o.a)(v,2),g=p[0],y=p[1],j=Object(n.useState)([]),k=Object(o.a)(j,2),w=k[0],C=k[1],O=Object(n.useState)(!1),Y=Object(o.a)(O,2),T=Y[0],N=Y[1];return Object(n.useEffect)((function(){(function(e){var t;return i.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return t=fetch(e,{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json"}}).then((function(e){if(!e.ok)throw Error(e.statusText);return e})).then((function(e){return e.json()})),a.next=3,i.a.awrap(t);case 3:return a.abrupt("return",a.sent);case 4:case"end":return a.stop()}}))})("race2rocks.json").then((function(e){c(e),f(e.sort(E)),y(m(e,"Year"));var t=m(e,"Category");t.unshift("All"),C(t)}))}),[]),r.a.createElement("div",{className:"App container",style:{maxWidth:"400px"}},r.a.createElement("h1",null,"Race to the Rocks"),r.a.createElement(h,{years:g,setYear:function(e){var t=a.filter((function(t){return t.Year===e}));f(t)},filterName:function(e){var t=a.filter((function(t){return t.Name.toLowerCase().includes(e.toLowerCase())}));f(t),1===m(t,"Name").length?N(!0):N(!1)},categories:w,setCategory:function(e){if("All"===e)f(a);else{var t=a.filter((function(t){return t.Category===e}));f(t)}}}),r.a.createElement(d,{data:s}),T?r.a.createElement(b,{filteredData:s}):"")};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(g,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},45:function(e,t,a){e.exports=a(149)},50:function(e,t,a){},52:function(e,t,a){},53:function(e,t,a){}},[[45,1,2]]]);
//# sourceMappingURL=main.abd29def.chunk.js.map