(()=>{var e={10:(e,t,n)=>{"use strict";n.d(t,{Z:()=>o});var i=n(537),s=n.n(i),a=n(645),r=n.n(a)()(s());r.push([e.id,".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n","",{version:3,sources:["webpack://./src/framework/view/abstract-view.css"],names:[],mappings:"AAAA;EACE,qBAAqB;EACrB,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE;;IAEE,wBAAwB;EAC1B;;EAEA;;;;;IAKE,2BAA2B;EAC7B;;EAEA;;;;IAIE,0BAA0B;EAC5B;AACF",sourcesContent:[".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n"],sourceRoot:""}]);const o=r},645:e=>{"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",i=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),i&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),i&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,i,s,a){"string"==typeof e&&(e=[[null,e,void 0]]);var r={};if(i)for(var o=0;o<this.length;o++){var l=this[o][0];null!=l&&(r[l]=!0)}for(var c=0;c<e.length;c++){var d=[].concat(e[c]);i&&r[d[0]]||(void 0!==a&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=a),n&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=n):d[2]=n),s&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=s):d[4]="".concat(s)),t.push(d))}},t}},537:e=>{"use strict";e.exports=function(e){var t=e[1],n=e[3];if(!n)return t;if("function"==typeof btoa){var i=btoa(unescape(encodeURIComponent(JSON.stringify(n)))),s="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(i),a="/*# ".concat(s," */");return[t].concat([a]).join("\n")}return[t].join("\n")}},484:function(e){e.exports=function(){"use strict";var e=6e4,t=36e5,n="millisecond",i="second",s="minute",a="hour",r="day",o="week",l="month",c="quarter",d="year",p="date",u="Invalid Date",f=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,v=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,h={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],n=e%100;return"["+e+(t[(n-20)%10]||t[n]||t[0])+"]"}},m=function(e,t,n){var i=String(e);return!i||i.length>=t?e:""+Array(t+1-i.length).join(n)+e},_={s:m,z:function(e){var t=-e.utcOffset(),n=Math.abs(t),i=Math.floor(n/60),s=n%60;return(t<=0?"+":"-")+m(i,2,"0")+":"+m(s,2,"0")},m:function e(t,n){if(t.date()<n.date())return-e(n,t);var i=12*(n.year()-t.year())+(n.month()-t.month()),s=t.clone().add(i,l),a=n-s<0,r=t.clone().add(i+(a?-1:1),l);return+(-(i+(n-s)/(a?s-r:r-s))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:l,y:d,w:o,d:r,D:p,h:a,m:s,s:i,ms:n,Q:c}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},y="en",b={};b[y]=h;var g=function(e){return e instanceof C},$=function e(t,n,i){var s;if(!t)return y;if("string"==typeof t){var a=t.toLowerCase();b[a]&&(s=a),n&&(b[a]=n,s=a);var r=t.split("-");if(!s&&r.length>1)return e(r[0])}else{var o=t.name;b[o]=t,s=o}return!i&&s&&(y=s),s||!i&&y},w=function(e,t){if(g(e))return e.clone();var n="object"==typeof t?t:{};return n.date=e,n.args=arguments,new C(n)},M=_;M.l=$,M.i=g,M.w=function(e,t){return w(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var C=function(){function h(e){this.$L=$(e.locale,null,!0),this.parse(e)}var m=h.prototype;return m.parse=function(e){this.$d=function(e){var t=e.date,n=e.utc;if(null===t)return new Date(NaN);if(M.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var i=t.match(f);if(i){var s=i[2]-1||0,a=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,a)):new Date(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,a)}}return new Date(t)}(e),this.$x=e.x||{},this.init()},m.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},m.$utils=function(){return M},m.isValid=function(){return!(this.$d.toString()===u)},m.isSame=function(e,t){var n=w(e);return this.startOf(t)<=n&&n<=this.endOf(t)},m.isAfter=function(e,t){return w(e)<this.startOf(t)},m.isBefore=function(e,t){return this.endOf(t)<w(e)},m.$g=function(e,t,n){return M.u(e)?this[t]:this.set(n,e)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(e,t){var n=this,c=!!M.u(t)||t,u=M.p(e),f=function(e,t){var i=M.w(n.$u?Date.UTC(n.$y,t,e):new Date(n.$y,t,e),n);return c?i:i.endOf(r)},v=function(e,t){return M.w(n.toDate()[e].apply(n.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(t)),n)},h=this.$W,m=this.$M,_=this.$D,y="set"+(this.$u?"UTC":"");switch(u){case d:return c?f(1,0):f(31,11);case l:return c?f(1,m):f(0,m+1);case o:var b=this.$locale().weekStart||0,g=(h<b?h+7:h)-b;return f(c?_-g:_+(6-g),m);case r:case p:return v(y+"Hours",0);case a:return v(y+"Minutes",1);case s:return v(y+"Seconds",2);case i:return v(y+"Milliseconds",3);default:return this.clone()}},m.endOf=function(e){return this.startOf(e,!1)},m.$set=function(e,t){var o,c=M.p(e),u="set"+(this.$u?"UTC":""),f=(o={},o[r]=u+"Date",o[p]=u+"Date",o[l]=u+"Month",o[d]=u+"FullYear",o[a]=u+"Hours",o[s]=u+"Minutes",o[i]=u+"Seconds",o[n]=u+"Milliseconds",o)[c],v=c===r?this.$D+(t-this.$W):t;if(c===l||c===d){var h=this.clone().set(p,1);h.$d[f](v),h.init(),this.$d=h.set(p,Math.min(this.$D,h.daysInMonth())).$d}else f&&this.$d[f](v);return this.init(),this},m.set=function(e,t){return this.clone().$set(e,t)},m.get=function(e){return this[M.p(e)]()},m.add=function(n,c){var p,u=this;n=Number(n);var f=M.p(c),v=function(e){var t=w(u);return M.w(t.date(t.date()+Math.round(e*n)),u)};if(f===l)return this.set(l,this.$M+n);if(f===d)return this.set(d,this.$y+n);if(f===r)return v(1);if(f===o)return v(7);var h=(p={},p[s]=e,p[a]=t,p[i]=1e3,p)[f]||1,m=this.$d.getTime()+n*h;return M.w(m,this)},m.subtract=function(e,t){return this.add(-1*e,t)},m.format=function(e){var t=this,n=this.$locale();if(!this.isValid())return n.invalidDate||u;var i=e||"YYYY-MM-DDTHH:mm:ssZ",s=M.z(this),a=this.$H,r=this.$m,o=this.$M,l=n.weekdays,c=n.months,d=function(e,n,s,a){return e&&(e[n]||e(t,i))||s[n].slice(0,a)},p=function(e){return M.s(a%12||12,e,"0")},f=n.meridiem||function(e,t,n){var i=e<12?"AM":"PM";return n?i.toLowerCase():i},h={YY:String(this.$y).slice(-2),YYYY:this.$y,M:o+1,MM:M.s(o+1,2,"0"),MMM:d(n.monthsShort,o,c,3),MMMM:d(c,o),D:this.$D,DD:M.s(this.$D,2,"0"),d:String(this.$W),dd:d(n.weekdaysMin,this.$W,l,2),ddd:d(n.weekdaysShort,this.$W,l,3),dddd:l[this.$W],H:String(a),HH:M.s(a,2,"0"),h:p(1),hh:p(2),a:f(a,r,!0),A:f(a,r,!1),m:String(r),mm:M.s(r,2,"0"),s:String(this.$s),ss:M.s(this.$s,2,"0"),SSS:M.s(this.$ms,3,"0"),Z:s};return i.replace(v,(function(e,t){return t||h[e]||s.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(n,p,u){var f,v=M.p(p),h=w(n),m=(h.utcOffset()-this.utcOffset())*e,_=this-h,y=M.m(this,h);return y=(f={},f[d]=y/12,f[l]=y,f[c]=y/3,f[o]=(_-m)/6048e5,f[r]=(_-m)/864e5,f[a]=_/t,f[s]=_/e,f[i]=_/1e3,f)[v]||_,u?y:M.a(y)},m.daysInMonth=function(){return this.endOf(l).$D},m.$locale=function(){return b[this.$L]},m.locale=function(e,t){if(!e)return this.$L;var n=this.clone(),i=$(e,t,!0);return i&&(n.$L=i),n},m.clone=function(){return M.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},h}(),E=C.prototype;return w.prototype=E,[["$ms",n],["$s",i],["$m",s],["$H",a],["$W",r],["$M",l],["$y",d],["$D",p]].forEach((function(e){E[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),w.extend=function(e,t){return e.$i||(e(t,C,w),e.$i=!0),w},w.locale=$,w.isDayjs=g,w.unix=function(e){return w(1e3*e)},w.en=b[y],w.Ls=b,w.p={},w}()},379:e=>{"use strict";var t=[];function n(e){for(var n=-1,i=0;i<t.length;i++)if(t[i].identifier===e){n=i;break}return n}function i(e,i){for(var a={},r=[],o=0;o<e.length;o++){var l=e[o],c=i.base?l[0]+i.base:l[0],d=a[c]||0,p="".concat(c," ").concat(d);a[c]=d+1;var u=n(p),f={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==u)t[u].references++,t[u].updater(f);else{var v=s(f,i);i.byIndex=o,t.splice(o,0,{identifier:p,updater:v,references:1})}r.push(p)}return r}function s(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,s){var a=i(e=e||[],s=s||{});return function(e){e=e||[];for(var r=0;r<a.length;r++){var o=n(a[r]);t[o].references--}for(var l=i(e,s),c=0;c<a.length;c++){var d=n(a[c]);0===t[d].references&&(t[d].updater(),t.splice(d,1))}a=l}}},569:e=>{"use strict";var t={};e.exports=function(e,n){var i=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(n)}},216:e=>{"use strict";e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},565:(e,t,n)=>{"use strict";e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},795:e=>{"use strict";e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var i="";n.supports&&(i+="@supports (".concat(n.supports,") {")),n.media&&(i+="@media ".concat(n.media," {"));var s=void 0!==n.layer;s&&(i+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),i+=n.css,s&&(i+="}"),n.media&&(i+="}"),n.supports&&(i+="}");var a=n.sourceMap;a&&"undefined"!=typeof btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),t.styleTagTransform(i,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},589:e=>{"use strict";e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}},t={};function n(i){var s=t[i];if(void 0!==s)return s.exports;var a=t[i]={id:i,exports:{}};return e[i].call(a.exports,a,a.exports,n),a.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.nc=void 0,(()=>{"use strict";function e(e,t,n="beforeend"){if(!(e instanceof y))throw new Error("Can render only components");if(null===t)throw new Error("Container element doesn't exist");t.insertAdjacentElement(n,e.element)}function t(e,t){if(!(e instanceof y&&t instanceof y))throw new Error("Can replace only components");const n=e.element,i=t.element,s=i.parentElement;if(null===s)throw new Error("Parent element doesn't exist");s.replaceChild(n,i)}var i=n(379),s=n.n(i),a=n(795),r=n.n(a),o=n(569),l=n.n(o),c=n(565),d=n.n(c),p=n(216),u=n.n(p),f=n(589),v=n.n(f),h=n(10),m={};m.styleTagTransform=v(),m.setAttributes=d(),m.insert=l().bind(null,"head"),m.domAPI=r(),m.insertStyleElement=u(),s()(h.Z,m),h.Z&&h.Z.locals&&h.Z.locals;const _="shake";class y{#e=null;constructor(){if(new.target===y)throw new Error("Can't instantiate AbstractView, only concrete one.")}get element(){return this.#e||(this.#e=function(e){const t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}(this.template)),this.#e}get template(){throw new Error("Abstract method not implemented: get template")}removeElement(){this.#e=null}shake(e){this.element.classList.add(_),setTimeout((()=>{this.element.classList.remove(_),e?.()}),600)}}class b extends y{#t=null;constructor(e){super(),this.#t=e}get template(){return`<form class="trip-filters" action="#" method="get">\n    ${this.#t.map((e=>`<div class="trip-filters__filter">\n      <input id="filter-${e.type}" class="trip-filters__filter-input visually-hidden" type="radio" name="trip-filter" value="${e.type}"\n      ${0===e.count?"disabled":""} ${"everything"===e.type?"checked":""}>\n      <label class="trip-filters__filter-label" for="filter-${e.type}">${e.type}</label>\n    </div>`)).join("")}\n  </form>`}}class g extends y{get template(){return'        \n      <form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n          <div class="trip-sort__item  trip-sort__item--day">\n            <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day">\n            <label class="trip-sort__btn" for="sort-day">Day</label>\n          </div>\n\n          <div class="trip-sort__item  trip-sort__item--event">\n            <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n            <label class="trip-sort__btn" for="sort-event">Event</label>\n          </div>\n\n          <div class="trip-sort__item  trip-sort__item--time">\n            <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n            <label class="trip-sort__btn" for="sort-time">Time</label>\n          </div>\n\n          <div class="trip-sort__item  trip-sort__item--price">\n            <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" checked>\n            <label class="trip-sort__btn" for="sort-price">Price</label>\n          </div>\n\n          <div class="trip-sort__item  trip-sort__item--offer">\n            <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n            <label class="trip-sort__btn" for="sort-offer">Offers</label>\n          </div>\n        </form>\n  '}}var $=n(484),w=n.n($);const M=e=>w()(e).format("HH:mm"),C=e=>w()(e).format("DD/MM/YY HH:mm");class E extends y{#n=null;#i=null;#s=null;#a=null;#r=null;constructor(e,t,n,i,s){super(),this.#n=e,this.#i=t,this.#s=n,this.#a=i,this.#r=s,this.#o()}get template(){return function(e,t,n){const i=t=>t===e.type?"checked":"",s=C(e.dateFrom),a=C(e.dateTo);return`\n    <li class="trip-events__item">\n              <form class="event event--edit" action="#" method="post">\n                <header class="event__header">\n                  <div class="event__type-wrapper">\n                    <label class="event__type  event__type-btn" for="event-type-toggle-1">\n                      <span class="visually-hidden">Choose event type</span>\n                      <img class="event__type-icon" width="17" height="17" src="img/icons/${e.type}.png" alt="Event type icon">\n                    </label>\n                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n\n                    <div class="event__type-list">\n                      <fieldset class="event__type-group">\n                        <legend class="visually-hidden">Event type</legend>\n\n                        <div class="event__type-item">\n                          <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${i("taxi")}>\n                          <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>\n                        </div>\n\n                        <div class="event__type-item">\n                          <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" ${i("bus")}>\n                          <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>\n                        </div>\n\n                        <div class="event__type-item">\n                          <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train" ${i("train")}>\n                          <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>\n                        </div>\n\n                        <div class="event__type-item">\n                          <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship" ${i("ship")}>\n                          <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>\n                        </div>\n\n                        <div class="event__type-item">\n                          <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" ${i("drive")}>\n                          <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>\n                        </div>\n\n                        <div class="event__type-item">\n                          <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" ${i("flight")}>\n                          <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>\n                        </div>\n\n                        <div class="event__type-item">\n                          <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in" ${i("check-in")}>\n                          <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>\n                        </div>\n\n                        <div class="event__type-item">\n                          <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing" ${i("sighteeing")}>\n                          <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>\n                        </div>\n\n                        <div class="event__type-item">\n                          <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant" ${i("restaurant")}>\n                          <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>\n                        </div>\n                      </fieldset>\n                    </div>\n                  </div>\n\n                  <div class="event__field-group  event__field-group--destination">\n                    <label class="event__label  event__type-output" for="event-destination-1">\n                      ${e.type}\n                    </label>\n                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${t.name}" list="destination-list-1">\n                    <datalist id="destination-list-1">\n                      <option value="Amsterdam"></option>\n                      <option value="Geneva"></option>\n                      <option value="Chamonix"></option>\n                    </datalist>\n                  </div>\n\n                  <div class="event__field-group  event__field-group--time">\n                    <label class="visually-hidden" for="event-start-time-1">From</label>\n                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${s}">\n                    &mdash;\n                    <label class="visually-hidden" for="event-end-time-1">To</label>\n                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${a}">\n                  </div>\n\n                  <div class="event__field-group  event__field-group--price">\n                    <label class="event__label" for="event-price-1">\n                      <span class="visually-hidden">Price</span>\n                      &euro;\n                    </label>\n                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${e.basePrice}">\n                  </div>\n\n                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n                  <button class="event__reset-btn" type="reset">Delete</button>\n                  <button class="event__rollup-btn" type="button">\n                    <span class="visually-hidden">Open event</span>\n                  </button>\n                </header>\n                <section class="event__details">\n                  <section class="event__section  event__section--offers">\n                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n                    <div class="event__available-offers">\n                    ${n.map((e=>`<div class="event__offer-selector">\n                      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${e.title}-1" type="checkbox" name="event-offer-${e.title}" checked>\n                      <label class="event__offer-label" for="event-offer-${e.title}-1">\n                        <span class="event__offer-title">${e.title}</span>\n                        &plus;&euro;&nbsp;\n                        <span class="event__offer-price">${e.price}</span>\n                      </label>\n                    </div>`)).join("")}\n                    </div>\n                  </section>\n\n                  <section class="event__section  event__section--destination">\n                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n                    <p class="event__destination-description">${t.description}</p>\n                  </section>\n                </section>\n              </form>\n            </li>\n  `}(this.#n,this.#i,this.#s)}#o(){this.element.querySelector(".event__rollup-btn").addEventListener("click",this.#l),this.element.querySelector(".event__save-btn").addEventListener("submit",this.#c)}#l=e=>{e.preventDefault(e),this.#a()};#c=e=>{e.preventDefault(e),this.#r()}}class S extends y{get template(){return'<ul class="trip-events__list"></ul>'}}class k extends y{#n=null;#i=null;#s=null;#d=null;constructor(e,t,n,i){super(),this.#n=e,this.#i=t,this.#s=n,this.#d=i,this.#o()}get template(){return function(e,t,n){const i=(s=e.dateFrom,w()(s).format("MMM DD"));var s;const a=M(e.dateFrom),r=M(e.dateTo),o=((e,t)=>{const n=w()(e),i=w()(t).diff(n,"minute"),s=1440;if(i>s){const e=Math.floor(i/s),t=i-e*s,n=Math.floor(t/60),a=t-60*n;return`${String(e).padStart(2,"0")}D ${String(n).padStart(2,"0")}H ${String(a).padStart(2,"0")}M`}if(i>60){const e=Math.floor(i/60),t=i-60*e;return`${String(e).padStart(2,"0")}H ${String(t).padStart(2,"0")}M`}return`${String(i).padStart(2,"0")}M`})(e.dateFrom,e.dateTo),l=e.isFavorite?"event__favorite-btn--active":"";return`        \n      <ul class="trip-events__list">\n          <li class="trip-events__item">\n            <div class="event">\n              <time class="event__date" datetime=${e.dateFrom}>${i}</time>\n              <div class="event__type">\n                <img class="event__type-icon" width="42" height="42" src="img/icons/${e.type}.png" alt="Event type icon">\n              </div>\n              <h3 class="event__title">${e.type} ${t.name}</h3>\n              <div class="event__schedule">\n                <p class="event__time">\n                  <time class="event__start-time" datetime=${e.dateFrom}>${a}</time>\n                  &mdash;\n                  <time class="event__end-time" datetime=${e.fateTo}>${r}</time>\n                </p>\n                <p class="event__duration">${o}</p>\n              </div>\n              <p class="event__price">\n                &euro;&nbsp;<span class="event__price-value">${e.basePrice}</span>\n              </p>\n              <h4 class="visually-hidden">Offers:</h4>\n              <ul class="event__selected-offers">\n                 ${n.map((e=>`\n                  <li class="event__offer">\n                    <span class="event__offer-title">${e.title}</span>\n                      &plus;&euro;&nbsp;\n                    <span class="event__offer-price">${e.price}</span>\n                  </li>\n                `)).join("")}\n              </ul>\n              <button class="event__favorite-btn ${l}" type="button">\n                <span class="visually-hidden">Add to favorite</span>\n                <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n                  <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n                </svg>\n              </button>\n              <button class="event__rollup-btn" type="button">\n                <span class="visually-hidden">Open event</span>\n              </button>\n            </div>\n          </li>\n  `}(this.#n,this.#i,this.#s)}#o(){this.element.querySelector(".event__rollup-btn").addEventListener("click",this.#p)}#p=e=>{e.preventDefault(e),this.#d()}}const A="everything",x="future",D="present",T="past",j={[A]:e=>e,[x]:e=>e.filter((e=>(e=>w()(e.dateFrom).isAfter(w()()))(e))),[D]:e=>e.filter((e=>(e=>w()(e.dateFrom).isBefore(w()())&&w()(e.dateTo).isAfter(w()()))(e))),[T]:e=>e.filter((e=>(e=>w()(e.dateFrom).isBefore(w()()))(e)))};class O extends y{get template(){return'<p class="trip-events__msg">Click New Event to create your first point</p>'}}const B=[{id:"b7c15c32-d098-45df-b590-23cb8060c014",basePrice:6653,dateFrom:"2025-05-01T04:41:10.697Z",dateTo:"2025-05-01T23:05:10.697Z",destination:"8ffa9253-7a3e-436f-b0df-d83c03a62abf",isFavorite:!0,offers:["cb3641dd-cf84-4ab3-aa49-78b7f5da1c65","123f9ada-1c2c-423c-8685-4857eac17a73"],type:"train"},{id:"b3edf8b2-91d4-4d91-944e-d91ec56ee0d4",basePrice:4480,dateFrom:"2025-05-03T12:09:10.697Z",dateTo:"2025-05-04T15:10:10.697Z",destination:"19a13d32-69ec-4890-a706-ce8488821e93",isFavorite:!1,offers:["cb0e16a8-ea24-470a-92b0-652c8450d5f9"],type:"taxi"},{id:"a457a749-e4db-4400-825e-3ddc017bac0b",basePrice:9527,dateFrom:"2025-05-05T13:22:10.697Z",dateTo:"2025-05-07T06:48:10.697Z",destination:"19a13d32-69ec-4890-a706-ce8488821e93",isFavorite:!1,offers:["cb3641dd-cf84-4ab3-aa49-78b7f5da1c65","123f9ada-1c2c-423c-8685-4857eac17a73"],type:"train"},{id:"2eb65438-9389-452b-baf6-f1cc15f5437f",basePrice:70,dateFrom:"2025-05-08T13:01:10.697Z",dateTo:"2025-05-10T05:46:10.697Z",destination:"42e96a38-98ef-4ef8-be52-41a1ff308b68",isFavorite:!0,offers:["c17f2dc1-4a87-4026-9635-258aa99d23f3","e1441111-ac18-4b1c-aead-bc7066bb702c","cb0e16a8-ea24-470a-92b0-652c8450d5f9"],type:"taxi"},{id:"6d08a726-05d9-44bf-9bef-429999f34544",basePrice:3643,dateFrom:"2025-05-11T13:49:10.697Z",dateTo:"2025-05-13T01:25:10.697Z",destination:"4d8bf7d7-d5a3-4a6f-9a79-de26c5856028",isFavorite:!0,offers:["1c6743a4-b2f9-4fd5-8748-17567c0e9a18","85199aec-7454-4344-b3b2-afa0e996fa9e","76056cde-6b2f-44b8-9938-4efef87b33d3"],type:"check-in"}],L=[{type:"taxi",offers:[{id:"c17f2dc1-4a87-4026-9635-258aa99d23f3",title:"Upgrade to a business class",price:78},{id:"e1441111-ac18-4b1c-aead-bc7066bb702c",title:"Choose the radio station",price:71},{id:"cb0e16a8-ea24-470a-92b0-652c8450d5f9",title:"Choose temperature",price:41},{id:"b10c85fb-e5f5-44b2-a670-33770c770db8",title:"Lorem ipsum dolor sit amet, consectetur adipiscing elit",price:59},{id:"d6a3c947-a3c6-46a5-8ea6-ecfb601bd169",title:"Drive slowly",price:92}]},{type:"train",offers:[{id:"cb3641dd-cf84-4ab3-aa49-78b7f5da1c65",title:"Book a taxi at the arrival point",price:196},{id:"123f9ada-1c2c-423c-8685-4857eac17a73",title:"Order a breakfast",price:43}]},{type:"check-in",offers:[{id:"1c6743a4-b2f9-4fd5-8748-17567c0e9a18",title:"Choose the time of check-in",price:161},{id:"85199aec-7454-4344-b3b2-afa0e996fa9e",title:"Choose the time of check-out",price:42},{id:"76056cde-6b2f-44b8-9938-4efef87b33d3",title:"Add breakfast",price:142},{id:"e7c11eab-95a0-46ee-89aa-03a7edff3172",title:"Laundry",price:162},{id:"4c90108e-a1a6-4199-bf78-669ec411949e",title:"Order a meal from the restaurant",price:46}]}],F=[{id:"8ffa9253-7a3e-436f-b0df-d83c03a62abf",description:"Kopenhagen - is a beautiful city",name:"Kopenhagen",pictures:[{src:"https://24.objects.htmlacademy.pro/static/destinations/2.jpg",description:"Kopenhagen a true asian pearl"}]},{id:"19a13d32-69ec-4890-a706-ce8488821e93",description:"Amsterdam - a perfect place to stay with a family",name:"Amsterdam",pictures:[{src:"https://24.objects.htmlacademy.pro/static/destinations/20.jpg",description:"Amsterdam famous for its crowded street markets with the best street food in Asia"},{src:"https://24.objects.htmlacademy.pro/static/destinations/3.jpg",description:"Amsterdam a true asian pearl"},{src:"https://24.objects.htmlacademy.pro/static/destinations/16.jpg",description:"Amsterdam a perfect place to stay with a family"},{src:"https://24.objects.htmlacademy.pro/static/destinations/14.jpg",description:"Amsterdam for those who value comfort and coziness"},{src:"https://24.objects.htmlacademy.pro/static/destinations/4.jpg",description:"Amsterdam famous for its crowded street markets with the best street food in Asia"}]},{id:"19a13d32-69ec-4890-a706-ce8488821e93",description:"Saint Petersburg - is a beautiful city",name:"Saint Petersburg",pictures:[{src:"https://24.objects.htmlacademy.pro/static/destinations/2.jpg",description:"Saint Petersburg full of of cozy canteens where you can try the best coffee in the Middle East"},{src:"https://24.objects.htmlacademy.pro/static/destinations/9.jpg",description:"Saint Petersburg is a beautiful city"}]},{id:"42e96a38-98ef-4ef8-be52-41a1ff308b68",description:"Vien - middle-eastern paradise",name:"Vien",pictures:[{src:"https://24.objects.htmlacademy.pro/static/destinations/7.jpg",description:"Vien middle-eastern paradise"}]},{id:"4d8bf7d7-d5a3-4a6f-9a79-de26c5856028",description:"Geneva - a true asian pearl",name:"Geneva",pictures:[{src:"https://24.objects.htmlacademy.pro/static/destinations/2.jpg",description:"Geneva with crowded streets"},{src:"https://24.objects.htmlacademy.pro/static/destinations/14.jpg",description:"Geneva a perfect place to stay with a family"},{src:"https://24.objects.htmlacademy.pro/static/destinations/9.jpg",description:"Geneva a true asian pearl"},{src:"https://24.objects.htmlacademy.pro/static/destinations/12.jpg",description:"Geneva middle-eastern paradise"},{src:"https://24.objects.htmlacademy.pro/static/destinations/4.jpg",description:"Geneva for those who value comfort and coziness"}]}],H=document.querySelector(".trip-controls__filters"),P=document.querySelector(".trip-events"),I=new class{points=B;getPoints(){return this.points}},Z=new class{destinations=F;getDestinations(){return this.destinations}getDestinationById(e){return this.destinations.find((t=>t.id===e))}},Y=new class{offers=L;getOffers(){return this.offers}getOfferById(e){for(const t of this.offers){const n=t.offers.find((t=>t.id===e));if(n)return n}return null}};new class{#u=new S;#f=null;#v=null;#h=null;#m=null;#_=null;#y=null;constructor(e,t,n,i,s){this.#f=e,this.#v=t,this.#h=n,this.#m=i,this.#_=s}init(){this.#y=this.#h.getPoints(),this.#b()}#g(n,i,s){const a=e=>{"Escape"===e.key&&(e.preventDefault(),l(),document.removeEventListener("keydown",a))},r=new k(n,i,s,(()=>{t(o,r),document.addEventListener("keydown",a)})),o=new E(n,i,s,(()=>{l(),document.removeEventListener("keydown",a)}),(()=>{l(),document.removeEventListener("keydown",a)}));function l(){t(r,o)}e(r,this.#u.element)}#b(){var t;if(e(new b((t=this.#y,Object.entries(j).map((([e,n])=>({type:e,count:n(t).length}))))),this.#f),e(new g,this.#v),e(this.#u,this.#v),0!==this.#y.length)for(let e=0;e<this.#y.length;e++){const t=this.#m.getDestinationById(this.#y[e].destination),n=this.#y[e].offers.map((e=>this.#_.getOfferById(e)));this.#g(this.#y[e],t,n)}else e(new O,this.#v)}}(H,P,I,Z,Y).init()})()})();
//# sourceMappingURL=bundle.939e0b568b7c6112a0f8.js.map