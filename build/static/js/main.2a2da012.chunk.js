(this.webpackJsonpfrontend014_recipe=this.webpackJsonpfrontend014_recipe||[]).push([[0],{2:function(e,a,n){e.exports={logo:"Nav_logo__1Xgvm",navLinks:"Nav_navLinks__1AAEJ",burger:"Nav_burger__1yjeN",navActive:"Nav_navActive__IyCbo",navLinkFade:"Nav_navLinkFade__1ZCkG"}},23:function(e,a,n){e.exports=n(40)},28:function(e,a,n){},3:function(e,a,n){e.exports={recipe:"Recipe_recipe__n3x7X",card:"Recipe_card__1k454",front:"Recipe_front__2KU_s",back:"Recipe_back__1gchb",frontContent:"Recipe_frontContent__3DX7v",recipeContent:"Recipe_recipeContent__UK4id"}},35:function(e,a,n){},40:function(e,a,n){"use strict";n.r(a);var t=n(0),c=n.n(t),r=n(14),l=n.n(r),i=(n(28),n(8)),o=n.n(i),s=n(15),u=n(4),m=n(3),p=n.n(m),f=n(16);function v(){var e=Object(f.a)(["\n  height: 100%;\n  width: 100%;\n\n  border-radius: 10px;\n\n  background-color: #e7ffe6;\n\n  box-shadow: 0px 5px 20px rgb(71, 71, 71);\n\n  align-items: center;\n  position: relative;\n  display: inline-block;\n\n  curser: pointer;\n  transition: transform 300ms ease-in-out;\n"]);return v=function(){return e},e}var d=n(17).a.div(v()),b=n(6),h=n.n(b),E=function(e){var a=e.title,n=e.calories,t=e.image,r=e.ingredients;return c.a.createElement("div",{className:p.a.recipe},c.a.createElement(h.a,{className:p.a.card,flipOnHover:!0,flipOnClick:!1,flipDirection:"horizontal"},c.a.createElement(b.FrontSide,{className:p.a.front,elementType:d},c.a.createElement("div",{className:p.a.frontContent},c.a.createElement("h1",null,a),c.a.createElement("img",{src:t,alt:a}))),c.a.createElement(b.BackSide,{className:p.a.back+" "+p.a.card},c.a.createElement("div",{className:p.a.recipeContent},c.a.createElement("h3",null,"Ingredients"),c.a.createElement("ol",null,r.map((function(e,a){return c.a.createElement("li",{key:[a,"=",e]},e.text)}))),c.a.createElement("p",null,"Calories: ",c.a.createElement("strong",null,n)," cal")))))},_=n(2),g=n.n(_),k=function(){var e=Object(t.useState)(!1),a=Object(u.a)(e,2),n=a[0],r=a[1],l=document.querySelectorAll("".concat(g.a.navLinks," li"));return c.a.createElement("nav",null,c.a.createElement("div",{className:g.a.logo},c.a.createElement("h4",null,"Ingredients")),c.a.createElement("ul",{className:!0===n?"".concat(g.a.navLinks," ").concat(g.a.navActive):g.a.navLinks},c.a.createElement("li",null,c.a.createElement("a",{href:"#"},"Home")),c.a.createElement("li",null,c.a.createElement("a",{href:"#"},"About")),c.a.createElement("li",null,c.a.createElement("a",{href:"#"},"Work")),c.a.createElement("li",null,c.a.createElement("a",{href:"#"},"Projects"))),c.a.createElement("div",{className:g.a.burger,onClick:function(e){e.preventDefault(),console.log(l),n?(r(!1),l.forEach((function(e,a){console.log(a)}))):r(!0)}},c.a.createElement("div",{className:g.a.line1}),c.a.createElement("div",{className:g.a.line2}),c.a.createElement("div",{className:g.a.line3})))},N=(n(35),n(21)),x=n(22),j=function(){var e="013e642e140af7db99a3663be34125e2",a=Object(t.useState)([]),n=Object(u.a)(a,2),r=n[0],l=n[1],i=Object(t.useState)(""),m=Object(u.a)(i,2),p=m[0],f=m[1],v=Object(t.useState)("chicken"),d=Object(u.a)(v,2),b=d[0],h=d[1],_=Object(t.useState)(!1),g=Object(u.a)(_,2),j=g[0],y=g[1],O="search-bar",w="search-button";Object(t.useEffect)((function(){function a(){return(a=Object(s.a)(o.a.mark((function a(){var n,t;return o.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,fetch("https://api.edamam.com/search?q=".concat(b,"&app_id=").concat("65eff37b","&app_key=").concat(e));case 2:return n=a.sent,a.next=5,n.json();case 5:t=a.sent,l(t.hits),console.log(t);case 8:case"end":return a.stop()}}),a)})))).apply(this,arguments)}!function(){a.apply(this,arguments)}()}),[b]);return j?(O="search-bar-expand search-bar",w="search-button search-button-expand"):(O="search-bar",w="search-button"),c.a.createElement("div",{className:"App"},c.a.createElement(k,null),c.a.createElement("div",{className:"search-box",onMouseEnter:function(){return y(!0)},onMouseLeave:function(){return y(!1)}},c.a.createElement("form",{onSubmit:function(e){e.preventDefault(),h(p),f("")},className:"search-form"},c.a.createElement("input",{type:"text",className:O,value:p,onChange:function(e){f(e.target.value)},placeholder:"Type to search"}),c.a.createElement("button",{className:w,type:"submit"},c.a.createElement(N.a,{icon:x.a})))),c.a.createElement("div",{className:"recipes"},r.map((function(e){return c.a.createElement(E,{key:e.recipe.label,title:e.recipe.label,calories:e.recipe.calories,image:e.recipe.image,ingredients:e.recipe.ingredients})}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(j,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[23,1,2]]]);
//# sourceMappingURL=main.2a2da012.chunk.js.map