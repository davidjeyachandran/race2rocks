(this.webpackJsonprace2rocks=this.webpackJsonprace2rocks||[]).push([[0],[,,,,,function(e,t,n){e.exports=n(14)},,,,,function(e,t,n){},,function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(4),l=n.n(c),o=(n(10),n(1)),u=n(2),i=n.n(u),s=function(e,t){var n=[];return e.forEach((function(e){e.hasOwnProperty(t)&&(n.includes(e[t])||n.push(e[t]))})),n.sort()};n(12);var m=function(e){var t=e.data;return r.a.createElement("tr",null,r.a.createElement("td",null,t.Name),r.a.createElement("td",null,t.Time),r.a.createElement("td",null,t.Category),r.a.createElement("td",null,t.Year))};var f=function(e){var t=e.data;return r.a.createElement("div",null,r.a.createElement("table",null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Name"),r.a.createElement("th",null,"Time"),r.a.createElement("th",null,"Category"),r.a.createElement("th",null,"Year"))),r.a.createElement("tbody",null,t.map((function(e){return r.a.createElement(m,{key:e.Name+e.Time,data:e})})))))};n(13);var d=function(e){var t=e.years,n=e.setYear,c=e.filterName,l=e.categories,u=e.setCategory,i=Object(a.useState)(""),s=Object(o.a)(i,2),m=s[0],f=s[1];function d(e){var t=e.currentTarget.dataset.id;f(""),n(parseInt(t))}function h(e){var t=e.currentTarget.dataset.id;f(""),u(t)}var E={float:"left",textDecoration:"underline",listStyle:"none",padding:"10px"};return r.a.createElement("div",null,r.a.createElement("ul",null,t.map((function(e){return r.a.createElement("li",{onClick:d,key:e,"data-id":e,style:E},e)}))),r.a.createElement("ul",null,l.map((function(e){return r.a.createElement("li",{onClick:h,key:e,"data-id":e,style:E},e)}))),r.a.createElement("br",null),r.a.createElement("input",{className:"clearfix",placeholder:"search...",onChange:function(e){var t=e.target.value;f(t),c(t)},value:m}))};var h=function(){var e=Object(a.useState)([]),t=Object(o.a)(e,2),n=t[0],c=t[1],l=Object(a.useState)([]),u=Object(o.a)(l,2),m=u[0],h=u[1],E=Object(a.useState)([]),p=Object(o.a)(E,2),v=p[0],y=p[1],g=Object(a.useState)([]),b=Object(o.a)(g,2),j=b[0],w=b[1];function k(e,t){var n=C(e.Time),a=C(t.Time);return n>a?1:a>n?-1:0}function C(e){var t=e.split(":"),n=t.length,a=0;return t.forEach((function(e,t){a+=parseInt(e)*Math.pow(60,n-t-1)})),a}return Object(a.useEffect)((function(){(function(e){var t;return i.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return t=fetch(e,{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json"}}).then((function(e){if(!e.ok)throw Error(e.statusText);return e})).then((function(e){return e.json()})),n.next=3,i.a.awrap(t);case 3:return n.abrupt("return",n.sent);case 4:case"end":return n.stop()}}))})("race2rocks.json").then((function(e){c(e),h(e.sort(k)),y(s(e,"Year"));var t=s(e,"Category");t.unshift("All"),w(t)}))}),[]),r.a.createElement("div",{className:"App container",style:{maxWidth:"400px"}},r.a.createElement("h1",null,"Race to the Rocks"),r.a.createElement(d,{years:v,setYear:function(e){var t=n.filter((function(t){return t.Year===e}));h(t)},filterName:function(e){var t=n.filter((function(t){return t.Name.toLowerCase().includes(e.toLowerCase())}));h(t)},categories:j,setCategory:function(e){if("All"===e)h(n);else{var t=n.filter((function(t){return t.Category===e}));h(t)}}}),r.a.createElement(f,{data:m}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(h,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[5,1,2]]]);
//# sourceMappingURL=main.ef3cc775.chunk.js.map