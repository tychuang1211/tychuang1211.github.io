(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))u(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&u(i)}).observe(document,{childList:!0,subtree:!0});function e(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function u(o){if(o.ep)return;o.ep=!0;const r=e(o);fetch(o.href,r)}})();function S(n){return document.createElement(n)}var N,C=[];function B(n,t){var e=Date.now(),u=e+n,o=u+t,r={start:u,end:o};C.push(r),N||(N=!0,requestAnimationFrame(en));var i={start:function(s){return r.startcb=s,i},progress:function(s){return r.progresscb=s,i},end:function(s){return r.endcb=s,i}};return i}function en(){var n=Date.now();if(!C.length){N=!1;return}for(var t=0,e;t<C.length;t++)if(e=C[t],!(n<e.start)){e.started||(e.started=!0,e.startcb&&e.startcb());var u=(n-e.start)/(e.end-e.start);if(e.progresscb&&e.progresscb(u<1?u:1),n>e.end){e.endcb&&e.endcb(),C.splice(t--,1);continue}}requestAnimationFrame(en)}window.requestAnimationFrame||(window.requestAnimationFrame=function(n){setTimeout(n,0)});const tn={linear:function(n){return n},quadIn:function(n){return n*n},quadOut:function(n){return n*(2-n)},quadInOut:function(n){return n<.5?2*n*n:-1+(4-2*n)*n},cubicIn:function(n){return n*n*n},cubicOut:function(n){return--n*n*n+1},cubicInOut:function(n){return n<.5?4*n*n*n:(n-1)*(2*n-2)*(2*n-2)+1},quartIn:function(n){return n*n*n*n},quartOut:function(n){return 1- --n*n*n*n},quartInOut:function(n){return n<.5?8*n*n*n*n:1-8*--n*n*n*n},quintIn:function(n){return n*n*n*n*n},quintOut:function(n){return 1+--n*n*n*n*n},quintInOut:function(n){return n<.5?16*n*n*n*n*n:1+16*--n*n*n*n*n}};function k(){return window.getComputedStyle(document.body).getPropertyValue("font-size").slice(0,-2)}var T;const fn={deck:function(n){n.bysuit=n.queued(t);function t(e){var u=n.cards;T=k(),u.forEach(function(o){o.bysuit(function(r){r===u.length-1&&e()})})}},card:function(n){var t=n.rank,e=n.suit;n.bysuit=function(u){var o=n.i,r=o*10;n.animateTo({delay:r,duration:400,x:-Math.round((6.75-t)*8*T/16),y:-Math.round((1.5-e)*92*T/16),rot:0,onComplete:function(){u(o)}})}}};var D;const cn={deck:function(n){n.fan=n.queued(t);function t(e){var u=n.cards,o=u.length;D=k(),u.forEach(function(r,i){r.fan(i,o,function(s){s===u.length-1&&e()})})}},card:function(n){var t=n.$el;n.fan=function(e,u,o){var r=e/4,i=e*10,s=e/(u-1)*260-130;n.animateTo({delay:i,duration:300,x:-r,y:-r,rot:0}),n.animateTo({delay:300+i,duration:300,x:Math.cos(W(s-90))*55*D/16,y:Math.sin(W(s-90))*55*D/16,rot:s,onStart:function(){t.style.zIndex=e},onComplete:function(){o(e)}})}}};function W(n){return n*Math.PI/180}var _=document.createElement("p").style,z={};function I(n){if(typeof z[n]<"u")return z[n];if(typeof _[n]<"u")return z[n]=n,n;for(var t=n[0].toUpperCase()+n.slice(1),e=["webkit","moz","Moz","ms","o"],u,o=0,r=e.length;o<r;o++)if(u=e[o]+t,typeof _[u]<"u")return z[n]=u,u}var m;function q(n,t,e){return typeof m<"u"||(m=ln()),e=e||0,m?"translate3d("+n+", "+t+", "+e+")":"translate("+n+", "+t+")"}function ln(){var n=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);if(!n)return!1;var t=I("transform"),e=document.createElement("p");return document.body.appendChild(e),e.style[t]="translate3d(1px,1px,1px)",m=e.style[t],m=m!=null&&m.length&&m!=="none",document.body.removeChild(e),m}const dn={deck:function(n){n.intro=n.queued(t);function t(e){var u=n.cards;u.forEach(function(o,r){o.setSide("front"),o.intro(r,function(i){B(250,0).start(function(){o.setSide("back")}),i===u.length-1&&e()})})}},card:function(n){var t=I("transform"),e=n.$el;n.intro=function(u,o){var r=500+u*10,i=u/4;e.style[t]=q(-i+"px","-250px"),e.style.opacity=0,n.x=-i,n.y=-250-i,n.rot=0,n.animateTo({delay:r,duration:1e3,x:-i,y:-i,onStart:function(){e.style.zIndex=u},onProgress:function(s){e.style.opacity=s},onComplete:function(){e.style.opacity="",o&&o(u)}})}}};var Y;const vn={deck:function(n){n.poker=n.queued(t);function t(e){var u=n.cards,o=u.length;Y=k(),u.slice(-5).reverse().forEach(function(r,i){r.poker(i,o,function(s){r.setSide("front"),s===4&&e()})})}},card:function(n){var t=n.$el;n.poker=function(e,u,o){var r=e*250;n.animateTo({delay:r,duration:250,x:Math.round((e-2.05)*70*Y/16),y:Math.round(-110*Y/16),rot:0,onStart:function(){t.style.zIndex=u-1+e},onComplete:function(){o(e)}})}}};function pn(n){for(var t,e,u=n.length-1;u;u--)t=Math.random()*u|0,e=n[u],n[u]=n[t],n[t]=e;return n}function yn(n){var t=Math.round(Math.random())?-1:1;return t*n}var nn;const mn={deck:function(n){n.shuffle=n.queued(t);function t(e){var u=n.cards;nn=k(),pn(u),u.forEach(function(o,r){o.pos=r,o.shuffle(function(i){i===u.length-1&&e()})})}},card:function(n){var t=n.$el;n.shuffle=function(e){var u=n.pos,o=u/4,r=u*2;n.animateTo({delay:r,duration:200,x:yn(Math.random()*40+20)*nn/16,y:-o,rot:0}),n.animateTo({delay:200+r,duration:200,x:-o,y:-o,rot:0,onStart:function(){t.style.zIndex=u},onComplete:function(){e(u)}})}}},hn={deck:function(n){n.sort=n.queued(t);function t(e,u){var o=n.cards;o.sort(function(r,i){return u?r.i-i.i:i.i-r.i}),o.forEach(function(r,i){r.sort(i,o.length,function(s){s===o.length-1&&e()},u)})}},card:function(n){var t=n.$el;n.sort=function(e,u,o,r){var i=e/4,s=e*10;n.animateTo({delay:s,duration:400,x:-i,y:-150,rot:0,onComplete:function(){t.style.zIndex=e}}),n.animateTo({delay:s+500,duration:400,x:-i,y:-i,rot:0,onComplete:function(){o(e)}})}}},gn={deck:function(n){n.flip=n.queued(t);function t(e,u){var o=n.cards.filter(function(r){return r.side==="front"}).length/n.cards.length;n.cards.forEach(function(r,i){r.setSide(u||(o>.5?"back":"front"))}),e()}}};var X;function xn(){return window.getComputedStyle(document.body).getPropertyValue("font-size").slice(0,-2)}const bn={deck:function(n){n.deal=n.queued(t);function t(e){var u=n.cards,o=u.length;X=xn(),u.slice(-12).reverse().forEach(function(r,i){r.deal(i,o,function(s){(s===11||s==o-1)&&e()})})}},card:function(n){var t=n.$el;n.deal=function(e,u,o){var r=e*250,i=Math.round((e%4-.4)*X*5.25),s=Math.round(X*-9*(3-Math.floor(e/4+1)));n.animateTo({delay:r,duration:250,x:i,y:s,rot:0,onStart:function(){t.style.zIndex=u-1+e},onComplete:function(){o(e)}})}}};function wn(n){n||(n={});var t={};return n.on=e,n.one=u,n.off=r,n.trigger=o,n;function e(i,s,c){t[i]||(t[i]=[]),t[i].push({cb:s,ctx:c})}function u(i,s,c){t[i]||(t[i]=[]),t[i].push({cb:s,ctx:c,once:!0})}function o(i){var s=this,c=Array.prototype.slice(arguments,1),d=t[i]||[];d.filter(function(p){return p.cb.apply(s,c),!p.once})}function r(i,s){if(!i){t={};return}if(!s){t[i]=[];return}t[i]=t[i].filter(function(c){return c.cb!==s})}}function $n(n){var t=Array.prototype,e=[];return n.queue=o,n.queued=u,n;function u(i){return function(){var s=this,c=arguments;o(function(d){i.apply(s,t.concat.apply(d,c))})}}function o(i){i&&(e.push(i),e.length===1&&r())}function r(){e[0](function(i){if(i)throw i;e=e.slice(1),e.length&&r()})}}var qn=52;function rn(n){var t=I("transform"),e=n%13+1,u=n/13|0,o=(52-n)/4,r=S("div"),i=S("div"),s=S("div"),c=S("div"),d=!1,p=!1,a={i:n,rank:e,suit:u,pos:n,$el:r,mount:un,unmount:an,setSide:sn},x=g.modules,j;i.classList.add("card"),s.classList.add("face"),c.classList.add("back"),r.style[t]=q(-o+"px",-o+"px"),a.x=-o,a.y=-o,a.z=o,a.rot=0,i.appendChild(c),i.appendChild(s),i.setAttribute("class","card"),r.appendChild(i),r.setAttribute("class","card-wrapper"),a.side="back",s.style[t]="rotateY(180deg)",$(r,"mousedown",K),$(r,"touchstart",K);for(j in x)on(x[j]);return a.animateTo=function(f){var{delay:v,duration:l,x:O=a.x,y:b=a.y,rot:w=a.rot,ease:y,onStart:U,onProgress:Z,onComplete:G}=f,L,A,F,H,J,P;B(v,l).start(function(){L=a.x||0,A=a.y||0,F=a.rot||0,U&&U()}).progress(function(Q){var M=tn[y||"cubicInOut"](Q);H=O-L,J=b-A,P=w-F,Z&&Z(Q,M),a.x=L+H*M,a.y=A+J*M,a.rot=F+P*M,r.style[t]=q(a.x+"px",a.y+"px")+(P?"rotate("+a.rot+"deg)":"")}).end(function(){G&&G()})},a.setRankSuit=function(f,v){var l=Sn(v);i.setAttribute("class","card "+l+" rank"+f)},a.setRankSuit(e,u),a.enableDragging=function(){d||(d=!0,r.style.cursor="move")},a.enableFlipping=function(){p||(p=!0)},a.disableFlipping=function(){p&&(p=!1)},a.disableDragging=function(){d&&(d=!1,r.style.cursor="")},a;function on(f){f.card&&f.card(a)}function K(f){var v={},l={},O=Date.now();if(f.preventDefault(),f.type==="mousedown"?(v.x=l.x=f.clientX,v.y=l.y=f.clientY,$(window,"mousemove",b),$(window,"mouseup",w)):(v.x=l.x=f.touches[0].clientX,v.y=l.y=f.touches[0].clientY,$(window,"touchmove",b),$(window,"touchend",w)),!d)return;r.style[t]=q(a.x+"px",a.y+"px")+(a.rot?" rotate("+a.rot+"deg)":""),r.style.zIndex=qn++;function b(y){d&&(y.type==="mousemove"?(l.x=y.clientX,l.y=y.clientY):(l.x=y.touches[0].clientX,l.y=y.touches[0].clientY),r.style[t]=q(Math.round(a.x+l.x-v.x)+"px",Math.round(a.y+l.y-v.y)+"px")+(a.rot?" rotate("+a.rot+"deg)":""))}function w(y){p&&Date.now()-O<200&&a.setSide(a.side==="front"?"back":"front"),y.type==="mouseup"?(E(window,"mousemove",b),E(window,"mouseup",w)):(E(window,"touchmove",b),E(window,"touchend",w)),d&&(a.x=a.x+l.x-v.x,a.y=a.y+l.y-v.y)}}function un(f){f.appendChild(r),a.$root=f}function an(){a.$root&&a.$root.removeChild(r),a.$root=null}function sn(f){f==="back"&&(a.side="back",i.style[t]="",i.setAttribute("class","card")),f==="front"&&(a.side="front",i.style[t]="rotateY(180deg)",a.setRankSuit(a.rank,a.suit))}}function Sn(n){return n===0?"spades":n===1?"hearts":n===2?"clubs":n===3?"diamonds":"joker"}function $(n,t,e){n.addEventListener(t,e)}function E(n,t,e){n.removeEventListener(t,e)}function g(n){var t=new Array(n?55:52),e=S("div"),u=wn({mount:d,unmount:p,cards:t,$el:e}),o,r=g.modules,i;$n(u);for(i in r)a(r[i]);e.classList.add("deck");for(var s,c=t.length;c;c--)s=t[c-1]=rn(c-1),s.setSide("back"),s.mount(e);return u;function d(x){o=x,o.appendChild(e)}function p(){o.removeChild(e)}function a(x){x.deck&&x.deck(u)}}g.animationFrames=B;g.ease=tn;g.modules={bysuit:fn,fan:cn,intro:dn,poker:vn,shuffle:mn,sort:hn,flip:gn,deal:bn};g.Card=rn;g.prefix=I;g.translate=q;var Cn=document.getElementById("topbar"),V=document.createElement("button");V.textContent="發牌";Cn.appendChild(V);V.addEventListener("click",function(){h.queue(function(n){h.cards.forEach(function(t,e){setTimeout(function(){t.setSide("back")},e*7.5)}),n()}),h.shuffle(),h.shuffle(),h.deal()});var h=g(),R=5,Mn=h.cards.splice(R*2,52-R*2);Mn.forEach(function(n){n.unmount()});for(let n of h.cards)n.rank=n.i%R+1,n.enableDragging(),n.$el.style.cursor="grab",n.enableFlipping();console.log(h);var zn=document.getElementById("container");h.mount(zn);