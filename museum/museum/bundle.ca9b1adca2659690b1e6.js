(()=>{var e={288:()=>{var e;(e=["./assets/img/gallery/galery1.jpg","./assets/img/gallery/galery2.jpg","./assets/img/gallery/galery3.jpg","./assets/img/gallery/galery4.jpg","./assets/img/gallery/galery5.jpg","./assets/img/gallery/galery6.jpg","./assets/img/gallery/galery7.jpg","./assets/img/gallery/galery8.jpg","./assets/img/gallery/galery9.jpg","./assets/img/gallery/galery10.jpg","./assets/img/gallery/galery11.jpg","./assets/img/gallery/galery12.jpg","./assets/img/gallery/galery13.jpg","./assets/img/gallery/galery14.jpg","./assets/img/gallery/galery15.jpg"],e.sort((()=>Math.random()-.5))).forEach((e=>{let t=document.createElement("img");t.setAttribute("src",e),t.classList.add("section__gallery_item"),document.querySelector(".section__gallery_inner-container").append(t)}))},660:()=>{const e=document.querySelectorAll(".popup-link");if(e.length>0)for(let t=0;t<e.length;t++){const s=e[t];s.addEventListener("click",(function(e){const t=s.getAttribute("href").replace("#","");r(document.getElementById(t)),e.preventDefault()}))}const t=document.querySelector(".close-popup");if(t.length>0)for(let e=0;e<t.length;e++){const r=t[e];r.addEventListener("click",(function(e){s(r.closest(".popup")),e.preventDefault()}))}function r(e){if(e){const t=document.querySelector(".popup.open");t&&s(t),e.classList.add("open"),e.addEventListener("click",(function(e){e.target.closest(".popup__content")||s(e.target.closest(".popup"))}))}}function s(e){e.classList.remove("open")}},268:()=>{const e=document.querySelector(".play"),t=document.querySelector(".pause");let r=document.querySelector(".video_one");e.onclick=function(){r.play()},t.onclick=function(){r.pause()},[...document.querySelectorAll(".progress_style")].forEach((function(e){e.addEventListener("input",(function(){const e=this.value;this.style.background=`linear-gradient(to right, \n      #710707 0%, #710707 ${e}%, #fff ${e}%, #fff 100%)`}))}))}},t={};function r(s){var l=t[s];if(void 0!==l)return l.exports;var n=t[s]={exports:{}};return e[s](n,n.exports,r),n.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var s in t)r.o(t,s)&&!r.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";r(268),r(288),r(660),async function(){const e=document.createElement("h2");e.innerHTML="This elements was created by js";const t=await(r=image,new Promise(((e,t)=>{const s=new Image;s.onload=()=>e(s),s.onerror=t,s.src=r})));var r;document.body.appendChild(e),document.body.appendChild(t)}()})()})();