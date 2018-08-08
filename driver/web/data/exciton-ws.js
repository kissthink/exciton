!function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=7)}([function(e,t,n){var o;!function(){var i=window.CustomEvent;function a(e){for(;e;){if("dialog"===e.localName)return e;e=e.parentElement}return null}function s(e){e&&e.blur&&e!==document.body&&e.blur()}function l(e,t){for(var n=0;n<e.length;++n)if(e[n]===t)return!0;return!1}function r(e){return!(!e||!e.hasAttribute("method"))&&"dialog"===e.getAttribute("method").toLowerCase()}function d(e){if(this.dialog_=e,this.replacedStyleTop_=!1,this.openAsModal_=!1,e.hasAttribute("role")||e.setAttribute("role","dialog"),e.show=this.show.bind(this),e.showModal=this.showModal.bind(this),e.close=this.close.bind(this),"returnValue"in e||(e.returnValue=""),"MutationObserver"in window){new MutationObserver(this.maybeHideModal.bind(this)).observe(e,{attributes:!0,attributeFilter:["open"]})}else{var t,n=!1,o=function(){n?this.downgradeModal():this.maybeHideModal(),n=!1}.bind(this),i=function(i){if(i.target===e){var a="DOMNodeRemoved";n|=i.type.substr(0,a.length)===a,window.clearTimeout(t),t=window.setTimeout(o,0)}};["DOMAttrModified","DOMNodeRemoved","DOMNodeRemovedFromDocument"].forEach(function(t){e.addEventListener(t,i)})}Object.defineProperty(e,"open",{set:this.setOpen.bind(this),get:e.hasAttribute.bind(e,"open")}),this.backdrop_=document.createElement("div"),this.backdrop_.className="backdrop",this.backdrop_.addEventListener("click",this.backdropClick_.bind(this))}i&&"object"!=typeof i||((i=function(e,t){t=t||{};var n=document.createEvent("CustomEvent");return n.initCustomEvent(e,!!t.bubbles,!!t.cancelable,t.detail||null),n}).prototype=window.Event.prototype),d.prototype={get dialog(){return this.dialog_},maybeHideModal:function(){this.dialog_.hasAttribute("open")&&document.body.contains(this.dialog_)||this.downgradeModal()},downgradeModal:function(){this.openAsModal_&&(this.openAsModal_=!1,this.dialog_.style.zIndex="",this.replacedStyleTop_&&(this.dialog_.style.top="",this.replacedStyleTop_=!1),this.backdrop_.parentNode&&this.backdrop_.parentNode.removeChild(this.backdrop_),c.dm.removeDialog(this))},setOpen:function(e){e?this.dialog_.hasAttribute("open")||this.dialog_.setAttribute("open",""):(this.dialog_.removeAttribute("open"),this.maybeHideModal())},backdropClick_:function(e){if(this.dialog_.hasAttribute("tabindex"))this.dialog_.focus();else{var t=document.createElement("div");this.dialog_.insertBefore(t,this.dialog_.firstChild),t.tabIndex=-1,t.focus(),this.dialog_.removeChild(t)}var n=document.createEvent("MouseEvents");n.initMouseEvent(e.type,e.bubbles,e.cancelable,window,e.detail,e.screenX,e.screenY,e.clientX,e.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,e.button,e.relatedTarget),this.dialog_.dispatchEvent(n),e.stopPropagation()},focus_:function(){var e=this.dialog_.querySelector("[autofocus]:not([disabled])");if(!e&&this.dialog_.tabIndex>=0&&(e=this.dialog_),!e){var t=["button","input","keygen","select","textarea"].map(function(e){return e+":not([disabled])"});t.push('[tabindex]:not([disabled]):not([tabindex=""])'),e=this.dialog_.querySelector(t.join(", "))}s(document.activeElement),e&&e.focus()},updateZIndex:function(e,t){if(e<t)throw new Error("dialogZ should never be < backdropZ");this.dialog_.style.zIndex=e,this.backdrop_.style.zIndex=t},show:function(){this.dialog_.open||(this.setOpen(!0),this.focus_())},showModal:function(){if(this.dialog_.hasAttribute("open"))throw new Error("Failed to execute 'showModal' on dialog: The element is already open, and therefore cannot be opened modally.");if(!document.body.contains(this.dialog_))throw new Error("Failed to execute 'showModal' on dialog: The element is not in a Document.");if(!c.dm.pushDialog(this))throw new Error("Failed to execute 'showModal' on dialog: There are too many open modal dialogs.");!function(e){for(;e&&e!==document.body;){var t=window.getComputedStyle(e),n=function(e,n){return!(void 0===t[e]||t[e]===n)};if(t.opacity<1||n("zIndex","auto")||n("transform","none")||n("mixBlendMode","normal")||n("filter","none")||n("perspective","none")||"isolate"===t.isolation||"fixed"===t.position||"touch"===t.webkitOverflowScrolling)return!0;e=e.parentElement}}(this.dialog_.parentElement),this.setOpen(!0),this.openAsModal_=!0,c.needsCentering(this.dialog_)?(c.reposition(this.dialog_),this.replacedStyleTop_=!0):this.replacedStyleTop_=!1,this.dialog_.parentNode.insertBefore(this.backdrop_,this.dialog_.nextSibling),this.focus_()},close:function(e){if(!this.dialog_.hasAttribute("open"))throw new Error("Failed to execute 'close' on dialog: The element does not have an 'open' attribute, and therefore cannot be closed.");this.setOpen(!1),void 0!==e&&(this.dialog_.returnValue=e);var t=new i("close",{bubbles:!1,cancelable:!1});this.dialog_.dispatchEvent(t)}};var c={reposition:function(e){var t=document.body.scrollTop||document.documentElement.scrollTop,n=t+(window.innerHeight-e.offsetHeight)/2;e.style.top=Math.max(t,n)+"px"},isInlinePositionSetByStylesheet:function(e){for(var t=0;t<document.styleSheets.length;++t){var n=document.styleSheets[t],o=null;try{o=n.cssRules}catch(e){}if(o)for(var i=0;i<o.length;++i){var a=o[i],s=null;try{s=document.querySelectorAll(a.selectorText)}catch(e){}if(s&&l(s,e)){var r=a.style.getPropertyValue("top"),d=a.style.getPropertyValue("bottom");if(r&&"auto"!==r||d&&"auto"!==d)return!0}}}return!1},needsCentering:function(e){return"absolute"===window.getComputedStyle(e).position&&(!("auto"!==e.style.top&&""!==e.style.top||"auto"!==e.style.bottom&&""!==e.style.bottom)&&!c.isInlinePositionSetByStylesheet(e))},forceRegisterDialog:function(e){if(window.HTMLDialogElement||e.showModal,"dialog"!==e.localName)throw new Error("Failed to register dialog: The element is not a dialog.");new d(e)},registerDialog:function(e){e.showModal||c.forceRegisterDialog(e)},DialogManager:function(){this.pendingDialogStack=[];var e=this.checkDOM_.bind(this);this.overlay=document.createElement("div"),this.overlay.className="_dialog_overlay",this.overlay.addEventListener("click",function(t){this.forwardTab_=void 0,t.stopPropagation(),e([])}.bind(this)),this.handleKey_=this.handleKey_.bind(this),this.handleFocus_=this.handleFocus_.bind(this),this.zIndexLow_=1e5,this.zIndexHigh_=100150,this.forwardTab_=void 0,"MutationObserver"in window&&(this.mo_=new MutationObserver(function(t){var n=[];t.forEach(function(e){for(var t,o=0;t=e.removedNodes[o];++o)t instanceof Element&&("dialog"===t.localName&&n.push(t),n=n.concat(t.querySelectorAll("dialog")))}),n.length&&e(n)}))}};if(c.DialogManager.prototype.blockDocument=function(){document.documentElement.addEventListener("focus",this.handleFocus_,!0),document.addEventListener("keydown",this.handleKey_),this.mo_&&this.mo_.observe(document,{childList:!0,subtree:!0})},c.DialogManager.prototype.unblockDocument=function(){document.documentElement.removeEventListener("focus",this.handleFocus_,!0),document.removeEventListener("keydown",this.handleKey_),this.mo_&&this.mo_.disconnect()},c.DialogManager.prototype.updateStacking=function(){for(var e,t=this.zIndexHigh_,n=0;e=this.pendingDialogStack[n];++n)e.updateZIndex(--t,--t),0===n&&(this.overlay.style.zIndex=--t);var o=this.pendingDialogStack[0];o?(o.dialog.parentNode||document.body).appendChild(this.overlay):this.overlay.parentNode&&this.overlay.parentNode.removeChild(this.overlay)},c.DialogManager.prototype.containedByTopDialog_=function(e){for(;e=a(e);){for(var t,n=0;t=this.pendingDialogStack[n];++n)if(t.dialog===e)return 0===n;e=e.parentElement}return!1},c.DialogManager.prototype.handleFocus_=function(e){if(!this.containedByTopDialog_(e.target)&&(e.preventDefault(),e.stopPropagation(),s(e.target),void 0!==this.forwardTab_)){var t=this.pendingDialogStack[0];return t.dialog.compareDocumentPosition(e.target)&Node.DOCUMENT_POSITION_PRECEDING&&(this.forwardTab_?t.focus_():document.documentElement.focus()),!1}},c.DialogManager.prototype.handleKey_=function(e){if(this.forwardTab_=void 0,27===e.keyCode){e.preventDefault(),e.stopPropagation();var t=new i("cancel",{bubbles:!1,cancelable:!0}),n=this.pendingDialogStack[0];n&&n.dialog.dispatchEvent(t)&&n.dialog.close()}else 9===e.keyCode&&(this.forwardTab_=!e.shiftKey)},c.DialogManager.prototype.checkDOM_=function(e){this.pendingDialogStack.slice().forEach(function(t){-1!==e.indexOf(t.dialog)?t.downgradeModal():t.maybeHideModal()})},c.DialogManager.prototype.pushDialog=function(e){var t=(this.zIndexHigh_-this.zIndexLow_)/2-1;return!(this.pendingDialogStack.length>=t)&&(1===this.pendingDialogStack.unshift(e)&&this.blockDocument(),this.updateStacking(),!0)},c.DialogManager.prototype.removeDialog=function(e){var t=this.pendingDialogStack.indexOf(e);-1!==t&&(this.pendingDialogStack.splice(t,1),0===this.pendingDialogStack.length&&this.unblockDocument(),this.updateStacking())},c.dm=new c.DialogManager,c.formSubmitter=null,c.useValue=null,void 0===window.HTMLDialogElement){var u=document.createElement("form");if(u.setAttribute("method","dialog"),"dialog"!==u.method){var h=Object.getOwnPropertyDescriptor(HTMLFormElement.prototype,"method");if(h){var m=h.get;h.get=function(){return r(this)?"dialog":m.call(this)};var p=h.set;h.set=function(e){return"string"==typeof e&&"dialog"===e.toLowerCase()?this.setAttribute("method",e):p.call(this,e)},Object.defineProperty(HTMLFormElement.prototype,"method",h)}}document.addEventListener("click",function(e){if(c.formSubmitter=null,c.useValue=null,!e.defaultPrevented){var t=e.target;if(t&&r(t.form)){if(!("submit"===t.type&&["button","input"].indexOf(t.localName)>-1)){if("input"!==t.localName||"image"!==t.type)return;c.useValue=e.offsetX+","+e.offsetY}a(t)&&(c.formSubmitter=t)}}},!1);var f=HTMLFormElement.prototype.submit;HTMLFormElement.prototype.submit=function(){if(!r(this))return f.call(this);var e=a(this);e&&e.close()},document.addEventListener("submit",function(e){var t=e.target;if(r(t)){e.preventDefault();var n=a(t);if(n){var o=c.formSubmitter;o&&o.form===t?n.close(c.useValue||o.value):n.close(),c.formSubmitter=null}}},!0)}c.forceRegisterDialog=c.forceRegisterDialog,c.registerDialog=c.registerDialog,"amd"in n(2)?void 0===(o=function(){return c}.call(t,n,t,e))||(e.exports=o):"object"==typeof e&&"object"==typeof e.exports?e.exports=c:window.dialogPolyfill=c}()},function(e,t,n){"use strict";n.r(t);n(6);const o=1,i=4,a=5,s=6,l=9,r=10,d=11,c=12,u=13,h=14,m=19,p=20,f=21,g=23,b=24,v=26,w=28,y=29;function M(e,t){let n;for(let o of t)n=n?n.subMenu.itemAtIndex(o):e.itemAtIndex(o);return n}class _{constructor(){this.id=null,this.items=[],this.hostItem=null,this.title=""}addMenuItem(e){this.items.push(e)}getSubMenu(e){if(e<this.items.length){const t=this.items[e];if(t.subMenu)return t.subMenu}return null}itemAtIndex(e){return e<this.items.length?this.items[e]:null}getNodeAtIndex(e){const t=this.itemAtIndex(e);return t&&t.subMenu?t.subMenu.getNode():null}getNode(){if(!this.items||0==this.items.length)return null;const e=document.createElement("ul");for(let t of this.items){let n;if(t.separator)e.lastChild&&(e.lastChild.style.marginBottom="10px");else if(t.subMenu){const e=t.subMenu.getNode();if(e){(n=document.createElement("dl")).classList.add("column");const o=document.createTextNode(t.title),i=document.createElement("dt");i.appendChild(o),n.appendChild(i);const a=document.createElement("dd");a.appendChild(e),n.appendChild(a),a.style.display="none"}}else if(""!==t.title){const e=document.createElement("a"),o=document.createTextNode(t.title);t.enabled&&t.handler&&(e.onclick=t.handler,e.setAttribute("href","#")),e.appendChild(o),n=e}if(n){const t=document.createElement("li");t.classList.add("menuItem"),t.appendChild(n),e.appendChild(t)}}return e}}const E={about:{command:function(e,t){e.showAboutDialog()},label:"About..."},front:{command:null,label:"Bring All to Front"},cut:{command:function(e,t){},label:"Cut"},copy:{command:function(e,t){},label:"Copy"},paste:{command:function(e,t){},label:"Paste"},delete:{command:function(e,t){},label:"Delete"},selectall:{command:function(e,t){},label:"Select All"},minimize:{command:null,label:"Minimize"},zoom:{command:function(e,t){},label:"Zoom"},togglefullscreen:{command:function(e,t){},label:"Toggle Full Screen"},viewsource:{command:null,label:"View Source"},back:{command:function(e,t){},label:"Back"},forward:{command:function(e,t){},label:"Forward"}};function D(e,t,n,o){const i=["bubbles","cancelBubble","cancelable","composed","defaultPrevented","eventPhase","timeStamp","type","isTrusted","detail","altKey","button","buttons","clientX","clientY","ctrlKey","metaKey","movementX","movementY","region","@relatedTarget","screenX","screenY","shiftKey"],a={};for(let l of i){const e=t[l];e&&(a[l]=e)}const s={menuId:o.id,elementId:n,appId:e.ID};return a.currentTarget=s,a.target=s,a}class k{constructor(){this.menu=null,this.id=""}getAppMenuNode(e){for(let t of this.menu.items){const n=document.createElement("div");n.classList.add("dropdown");const o=document.createElement("button");if(o.classList.add("dropbtn"),o.appendChild(document.createTextNode(t.title)),n.appendChild(o),t.subMenu){const e=t.subMenu.getNode();if(e){const t=document.createElement("div");t.classList.add("dropdown-content"),t.appendChild(e),n.appendChild(t)}}e.appendChild(n)}return e}getPopupMenuNode(){const e=document.createElement("div");return e.classList.add("popupMenu"),e.appendChild(this.menu.getNode()),e}polulateWithDiffset(e,t){const n=t.items,k=[];let S,C,I;for(let O of n){const t=O.t,n=O.k,N=O.v;switch(t){case o:if("menu"===N){const e=new _;if(k.length>0||this.menu){const t=new x;t.setSubMenu(e),S=t,k.push(t)}else S=e,k.push(e),this.menu=e,this.menu.id=this.id}else if("menuitem"===N){const e=new x;k.push(e),S=e}else{if("hr"!==N)throw"unsupported tag: "+N;{const e=new x;e.separator=!0,k.push(e),S=e}}break;case i:S=N?"number"==typeof N?k[N]:M(this.menu,N):this.menu;break;case a:C=N?"number"==typeof N?k[N]:M(this.menu,N):this.menu;break;case s:I=N?"number"==typeof N?k[N]:M(this.menu,N):this.menu;break;case l:if(S instanceof x){const e=S;"label"===n&&(e.title=N,e.subMenu&&(e.subMenu.title=N))}else if("type"!==n)throw"invalid attribute: "+n+"/"+N;break;case r:break;case u:if(!(S&&S instanceof x))throw"invalid target: "+S;{const t=S;if("menuRole"===n){const n=E[N];if(!n)break;n.label&&(t.title=n.label,t.subMenu&&(t.subMenu.title=n.label)),t.handler=(t=>{t.preventDefault(),t.stopPropagation(),n.command(e,t)}),t.enabled=!0}}break;case h:break;case m:{let e;if(S?S instanceof _?e=S:S instanceof x&&(e=S.subMenu):e=this.menu,!e)throw"ditAppendChild: invalid arg: "+S;if(C instanceof x)e.addMenuItem(C);else if(C!=e)throw"ditAppendChild: invalid arg1: "+C}break;case p:case f:break;case g:if(!(S instanceof x))throw"ditAddEventListener: invalid target: "+S;if("click"!==n)throw"ditAddEventListener: unsupported event";{const t=S,n=N.id;t.handler=(t=>{t.preventDefault(),t.stopPropagation();const o=D(e,t,n,this.menu);e.callNativeMethod("/menu/"+this.menu.id+"/html/"+n+"/click",o)}),t.enabled=!0}break;case b:break;case v:{const e=N;if(S instanceof _)S!=this.menu&&(S.id=e,S.hostItem&&(S.hostItem.id=e));else{if(!(S instanceof x))throw"node is invalid";S.id=e}}break;case d:case c:case w:case y:break;default:throw"Unsupported diff type:"+t}}}}class x{constructor(){this.id="",this.subMenu=null,this.title="",this.cmdId=-1,this.enabled=!1,this.separator=!1,this.handler=null}setSubMenu(e){this.subMenu=e,e.hostItem=this,this.enabled=!0}}const S={};function C(e){const t=e.id;if(!t)throw"parameter[id] not found";const n=S[t];if(!n)throw"invalid id";return n}var I={newMenu:function(e,t){const n=t.parameter.id;if(!n)throw"parameter[id] not found";const o=new k;o.id=n,S[n]=o,e.responceValue(!0,t.respCallbackNo)},updateDiffSetHandler:function(e,t){const n=t.parameter,o=t.argument,i=n.id;if(!i)throw"parameter[id] not found";const a=S[i];if(!a)throw"invalid id";a.polulateWithDiffset(e,o),e.responceValue(!0,t.respCallbackNo)},setApplicationMenu:function(e,t){const n=C(t.parameter),o=document.getElementById("menubar");for(;o.firstChild;)o.removeChild(o.firstChild);n.getAppMenuNode(o)},getMenuData:C},O=n(0),N=n.n(O),T=window.exciton,A=window.location,B="https"==A.protocol?"wss://":"ws://";B+=A.host+A.pathname+"exciton/"+T.ID+"/ws";var L=new WebSocket(B);L.onopen=function(){T.callNativeMethod("/app/init",null)},L.onmessage=function(e){const t=JSON.parse(e.data),n=t.data,o="/exciton/:appid/window/:id/",i="/exciton/:appid/menu/:id/";if(t.sync){if(n.name==o+"new")return T.newWindow(n);if(n.name==i+"new")return I.newMenu(T,n);if(n.name.startsWith(o)){const e=n.name.slice(o.length),t="win"+n.parameter.id,i=document.getElementById(t).contentWindow.exciton.requestBrowerEventSync(e,JSON.stringify(n.argument)),a=JSON.parse(i);T.responceValue(a,n.respCallbackNo)}else if(n.name.startsWith(i)){switch(n.name.slice(i.length)){case"updateDiffSetHandler":I.updateDiffSetHandler(T,n)}}else{if(!n.name.startsWith("/exciton/:appid/dialog/:id/"))throw"invalid event: "+n.name;switch(n.name.slice("/exciton/:appid/dialog/:id/".length)){case"showMessageBox":T.showMessageBox(n);break;case"showOpenDialog":T.showOpenDialog(n)}}}else if(n.name.startsWith(o)){const e=n.name.slice(o.length),t="win"+n.parameter.id;document.getElementById(t).contentWindow.exciton.requestBrowserEvent(e,JSON.stringify(n.argument))}else{if(!n.name.startsWith(i))throw"invalid event: "+n.name;{const e=n.name.slice(i.length);switch(e){case"setApplicationMenu":I.setApplicationMenu(T,n);break;default:throw"invalid menu event:"+e}}}},T.newWindow=function(e){const t=document.createElement("iframe");t.classList.add("page"),t.setAttribute("title",e.argument.title),t.setAttribute("src",e.argument.url),t.setAttribute("frameborder",0),t.id="win"+e.parameter.id;const n=document.getElementById("pagecontainer");for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(t),T.responceValue(!0,e.respCallbackNo)},T.callWindowMethod=function(e){T.callNativeMethod(e.path,JSON.parse(e.arg))},T.responceValue=function(e,t){var n={name:"/responceEventResult",argument:e,respCallbackNo:t};T.callnative(n)},T.callNativeMethod=function(e,t){var n={name:"/exciton/"+T.ID+e,argument:t,respCallbackNo:-1};T.callnative(n)},T.callnative=function(e){L.send(JSON.stringify(e))},T.showAboutDialog=function(){T.showMessageBoxCore("","About...","TODO: App name","",["OK"],0,null)};let P=!1;T.showMessageBoxCore=function(e,t,n,o,i,a,s){const l=document.getElementById("messageBox"),r=document.getElementById("messageBoxIcon");r.src=e,r.style.display=""===e?"none":"inline",document.getElementById("messageBoxTitle").innerText=t,document.getElementById("messageBoxContent").innerText=n;const d=document.getElementById("messageBoxDetail");d.innerText=o,d.style.display=""===o?"none":"block";const c=document.getElementById("messageBoxButtons");for(;c.firstChild;)c.removeChild(c.firstChild);for(let u=0;u<i.length;u++){const e=document.createElement("button");e.type="submit",e.value=u,e.innerText=i[u],e.autofocus=u==a,c.appendChild(e)}P||(N.a.registerDialog(l),P=!0),s&&l.addEventListener("close",e=>{s(e,parseInt(l.returnValue))},{once:!0}),l.showModal()},T.showMessageBox=function(e){let t="";const n=e.argument.type;switch(n){case 0:break;case 1:t="/exciton/web/assets/info.svg";break;case 2:t="/exciton/web/assets/warning.svg";break;case 3:t="/exciton/web/assets/error.svg";break;case 4:t="/exciton/web/assets/question.svg"}let o=e.argument.buttons,i=e.argument.defaultId;0==o.length&&(4==n?(o=["YES","NO"],i=1):(o=["OK"],i=0));const a=e.argument.title,s=e.argument.message,l=e.argument.detail;T.showMessageBoxCore(t,a,s,l,o,i,(t,n)=>{T.responceValue(n,e.respCallbackNo)})};let F=!1;T.showOpenDialog=function(e){const t=document.getElementById("fileOpenDialog"),n=e.argument.title?e.argument.title:"Open File";document.getElementById("fileOpenDialogTitle").innerText=n;const o=e.argument.buttonLabel?e.argument.buttonLabel:"OK";document.getElementById("fileOpenOK").innerText=o;let i=null;if(e.argument.filters){let t=[];for(let n of e.argument.filters)for(let e of n.extensions)t.push(e);i=t.join(" ")}const a=document.getElementById("selFile");i?a.setAttribute("accept",i):a.removeAttribute("accept");const s=e.argument.properties;a.multiple=0!=(4&s),F||(N.a.registerDialog(t),F=!0,t.addEventListener("close",n=>{if("ok"===t.returnValue){const t=document.getElementById("fileUploadForm");document.getElementById("openDialogResponceNo").value=e.respCallbackNo;const n=new XMLHttpRequest,o=new FormData(t);n.open("POST","/webFileOpenDialog"),n.send(o)}})),t.showModal()}},function(e,t){e.exports=function(){throw new Error("define cannot be used indirect")}},,,,function(e,t,n){},function(e,t,n){e.exports=n(1)}]);