(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{28:function(e,t,a){},38:function(e,t,a){e.exports=a(97)},43:function(e,t,a){},97:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(6),l=a.n(i),s=(a(43),a(2)),u=a(3),o=a(8),c=a(7),d=a(9),h=a(12),f=a.n(h),v=function(){function e(){Object(s.a)(this,e)}return Object(u.a)(e,null,[{key:"get",value:function(t,a){return new Promise(function(n){e.getUrl(a).then(function(e){f.a.get(e+t).then(function(e){return n(e)})})})}},{key:"post",value:function(t,a,n){return new Promise(function(r){e.getUrl(n).then(function(e){f.a.post(e+t,a).then(function(e){return r(e)})})})}},{key:"addApiEndpoint",value:function(e){return e?"":"api.php?format=json&"}},{key:"getUrl",value:function(t){return new Promise(function(a){if(window.document.body.classList.contains("mediawiki"))var n=setInterval(function(){window.mw&&window.mw.config&&(clearInterval(n),a(window.mw.config.get("wgServer")+window.mw.config.get("wgScriptPath")+"/"+e.addApiEndpoint(t)))},100);else a(window.localStorage.getItem("apiUrl")+e.addApiEndpoint(t))})}}]),e}(),p=function(){function e(){Object(s.a)(this,e)}return Object(u.a)(e,null,[{key:"get",value:function(){return new Promise(function(t){e.onCall?e.waitForResponse().then(function(e){return t(e)}):e.getFromRemote().then(function(a){e.data=a,t(e.data)})})}},{key:"getFromRemote",value:function(){return new Promise(function(t){e.onCall=!0,v.get("action=fennecadvancedsearchparams").then(function(a){e.onCall=!1,t(a?a.data:null)})})}},{key:"waitForResponse",value:function(){return new Promise(function(t){var a=setInterval(function(){e.data&&(clearInterval(a),t(e.data))},200)})}}]),e}(),m=new(function(){function e(){Object(s.a)(this,e),this.events={}}return Object(u.a)(e,[{key:"on",value:function(e,t){this.events[e]||(this.events[e]={listeners:[]}),this.events[e].listeners.push(t)}},{key:"off",value:function(e){delete this.events[e]}},{key:"emit",value:function(e){for(var t=arguments.length,a=new Array(t>1?t-1:0),n=1;n<t;n++)a[n-1]=arguments[n];var r=!0,i=!1,l=void 0;try{for(var s,u=this.events[e].listeners[Symbol.iterator]();!(r=(s=u.next()).done);r=!0){s.value.apply(this,a)}}catch(o){i=!0,l=o}finally{try{r||null==u.return||u.return()}finally{if(i)throw l}}}}]),e}()),y=function(){function e(){Object(s.a)(this,e)}return Object(u.a)(e,null,[{key:"isArray",value:function(e){return"object"===typeof e&&"undefined"!==typeof e}},{key:"toQueryStr",value:function(e){return Object.keys(e).sort().map(function(t){return e[t]?t+"="+e[t]:""}).filter(function(e){return e}).join("&")}},{key:"sortByWeight",value:function(e,t){var a=e.weight||0,n=t.weight||0;return a>n?1:a<n?-1:0}},{key:"stripHtml",value:function(e){var t=document.createElement("div");return t.innerHTML=e,t.innerText}}]),e}(),b=function(){function e(){Object(s.a)(this,e)}return Object(u.a)(e,null,[{key:"addValue",value:function(t,a){e.allData[t]=e.allData[t]||[];var n=e.standardizeValue(a);e.allData[t].map(function(e){return""+e.value}).includes(""+n.value)||(e.allData[t].push(n),e.fireChangeEvent())}},{key:"removeValue",value:function(t,a){var n=e.allData[t].findIndex(function(e){return""+a.value===""+e.value});n>-1&&e.allData[t].splice(n,1),e.fireChangeEvent()}},{key:"ChangeValueByKey",value:function(t,a,n){e.allData[t]=e.allData[t]||Array(a).fill(null),e.allData[t][a]=n,e.fireChangeEvent()}},{key:"setValue",value:function(t,a){e.allData[t]=a,e.fireChangeEvent()}},{key:"getValue",value:function(t){return e.allData[t]}},{key:"includes",value:function(t,a){return e.allData[t]&&e.allData[t].filter(function(e){return""+e.value===""+a}).length}},{key:"fireChangeEvent",value:function(){m.emit("FormDataChanged",e.getAllValuesRaw())}},{key:"standardizeValue",value:function(e){return"string"===typeof e?{label:e,value:e}:e}},{key:"getAllValuesRaw",value:function(){return e.allData}},{key:"getAllValuesProcessed",value:function(){for(var t=Object.assign({},e.allData),a=0,n=Object.keys(t);a<n.length;a++){var r=n[a];t[r]&&("object"===typeof t[r]&&"undefined"!==typeof t[r].length&&(t[r]=t[r].map(function(e){return"undefined"!=typeof e.value?e.value:e})),"string"!=typeof t[r]&&t[r].length&&(t[r]=t[r].join("|")))}return t}},{key:"submitData",value:function(){var e=this.getAllValuesProcessed();e.action="fennecadvancedsearchsearch";var t=y.toQueryStr(e);v.get(t).then(function(e){m.emit("dataRecieved",e.data.error?{error:!0}:e.data.FennecAdvancedSearchSearch)})}},{key:"clearField",value:function(t){var a=e.allData[t],n=null;if("category"==t){if(!a)return!1;n=y.isArray(a)?[]:"object"==typeof a?{}:""}return e.allData[t]=n,!0}}]),e}();b.allData={};var g=b;var k=function(e){return new Promise(function(t){p.get().then(function(a){a&&a.translations?t(a.translations[e]):t("")})})},w=["select","autocomplete","checkboxes"],S=function(){function e(){Object(s.a)(this,e)}return Object(u.a)(e,null,[{key:"isMultiple",value:function(e){return w.includes(e.widget.type)}},{key:"isSearch",value:function(e){return"search"===e.field}}]),e}(),E=a(37),C=a(29),D=a.n(C),O=a(30),j=a.n(O),x=function(e){function t(e){var a;Object(s.a)(this,t),a=Object(o.a)(this,Object(c.a)(t).call(this,e));var n=e.inputData.widget.options||[],r=g.getValue(e.inputData.field);if(n=a.extractOptions(n),a.state={inputData:e.inputData,filteredOptions:n,options:n,typed:r&&r.length?r[0].value:""},"select"===e.inputData.widget.type){var i=e.inputData.widget.default||n[0];"string"==typeof i&&(i=[{value:i,label:i}]),a.state.selected=i}return a}return Object(d.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){for(var e=this,t=function(){var t=n[a];k(t).then(function(a){var n={};n[t]=a,e.setState(n)})},a=0,n=["fennecadvancedsearch-to-label","fennecadvancedsearch-from-label","fennecadvancedsearch-search-label","fennecadvancedsearch-more-label","fennecadvancedsearch-less-label","fennecadvancedsearch-show-more"];a<n.length;a++)t();var r=!0,i=!1,l=void 0;try{for(var s,u=this.state.options[Symbol.iterator]();!(r=(s=u.next()).done);r=!0){var o=s.value;o.defaultChecked&&g.addValue(this.state.inputData.field,o)}}catch(c){i=!0,l=c}finally{try{r||null==u.return||u.return()}finally{if(i)throw l}}}},{key:"extractOptions",value:function(e){var t=[],a=!0,n=!1,r=void 0;try{for(var i,l=e[Symbol.iterator]();!(a=(i=l.next()).done);a=!0){var s=i.value;"string"==typeof s?t.push({value:s,label:s}):t.push(s)}}catch(u){n=!0,r=u}finally{try{a||null==l.return||l.return()}finally{if(n)throw r}}return t}},{key:"valueChanged",value:function(e,t){g.setValue(e,t)}},{key:"checkboxChanges",value:function(e,t,a){a.target.checked?g.addValue(e,t):g.removeValue(e,t)}},{key:"filterAlreadyChosenOptions",value:function(e){var t=g.getValue(this.state.inputData.field);return t?(t=t.map(function(e){return e.value}),e=e.filter(function(e){return!t.includes(e.value)})):e}},{key:"autocompleteChanged",value:function(e,t){var a=this;if(this.setState({typed:t}),this.state.options.length){var n=this.state.options.filter(function(e){return!t||e.label.indexOf(t)>-1});this.setState({filteredOptions:this.filterAlreadyChosenOptions(n)})}else this.isSearchAutomplete()?this.searchAutocomplete(t):v.get("action=fennecadvancedsearchautocomplete&field=".concat(this.state.inputData.field,"&search=").concat(t)).then(function(e){if(e.data.values){for(var t=[],n=e.data.values,r=0,i=Object.keys(n);r<i.length;r++){var l=i[r];t.push({label:n[l],value:l})}a.setState({filteredOptions:a.filterAlreadyChosenOptions(t)})}})}},{key:"searchAutocomplete",value:function(e){var t=this,a=g.getAllValuesProcessed().namespace;g.setValue(this.state.inputData.field,e),v.get("action=opensearch&formatversion=2&search=".concat(e,"&namespace=").concat(a,"&limit=10&suggest=true")).then(function(e){for(var a=e.data,n=a[1],r=a[3],i=[],l=0;l<n.length;l++){var s,u=void 0,o=n[l].split(":");o.length>1&&(u=o.shift()),s=o.join(":"),i.push({label:s,ns:u,value:r[l],href:r[l]})}t.setState({filteredOptions:i})})}},{key:"submitClicked",value:function(){g.submitData()}},{key:"autocompleteInputKeyDown",value:function(e){13==e.keyCode&&setTimeout(function(){var e=document.querySelector(".field-wrp-name-search input"),t=e.value.length;e.setSelectionRange(t,t)},10)}},{key:"autocompleteSelected",value:function(e,t,a){this.isSearchAutomplete()?window.location.href=a.value:(g.addValue(e,a),this.setState({typed:""}))}},{key:"isSearchAutomplete",value:function(){return S.isSearch(this.state.inputData)}},{key:"selectChanged",value:function(e,t){this.setState({selected:t}),g.addValue(e,t)}},{key:"rangeChanges",value:function(e,t,a){g.ChangeValueByKey(e,t,a.target.value)}},{key:"inputChanges",value:function(e,t){this.valueChanged(e,t.target.value)}},{key:"radioChanges",value:function(e,t,a){this.valueChanged(e,t)}},{key:"getInputHtml",value:function(){if(this.state.inputData&&Object.keys(this.state.inputData).length){var e=this.state.inputData,t=this.getLabel(e),a="field-wrp field-wrp-type-"+e.widget.type+" field-wrp-name-"+e.field,n="";switch(e.widget.type){case"text":case"select":case"checkboxes":case"autocomplete":case"radios":case"range":n=this[e.widget.type+"Build"](this.state.inputData)}return r.a.createElement("div",{className:a},r.a.createElement("span",{className:""},t),n)}return""}},{key:"showAdvanced",value:function(){this.setState({showAdvanced:!this.state.showAdvanced})}},{key:"getPlaceholder",value:function(e){return e.widget.placeholder?e.widget.placeholder:y.stripHtml(e.label)}},{key:"checkboxesBuild",value:function(e){var t=[],a=[],n="main-and-advanced-wrp"+(this.state.showAdvanced?" opened":""),i=!0,l=!1,s=void 0;try{for(var u,o=e.widget.options[Symbol.iterator]();!(i=(u=o.next()).done);i=!0){var c=u.value,d="far ",h="",f=c.defaultChecked;g.includes(e.field,c.value)?(h=" selected",d+="fa-check-square",f=1):d+="fa-square";var v=(e.field+"-"+c.value).replace(/\s|:/g,"-"),p=r.a.createElement("span",{key:e.field+"-"+c.value,className:"checkbox-wrp"+h},r.a.createElement("input",{id:v,type:"checkbox",value:c.value,defaultChecked:f,onChange:this.checkboxChanges.bind(this,e.field,c)}),r.a.createElement("label",{htmlFor:v},r.a.createElement("i",{className:d}),r.a.createElement("span",{className:"checkbox-label",dangerouslySetInnerHTML:{__html:c.label}})));"advanced"===c.show?a.push(p):"disable"!==c.show&&t.push(p)}}catch(b){l=!0,s=b}finally{try{i||null==o.return||o.return()}finally{if(l)throw s}}var m=this.state.showAdvanced?this.state["fennecadvancedsearch-less-label"]:this.state["fennecadvancedsearch-more-label"],y=a.length?r.a.createElement("button",{"data-tip":!0,"data-for":"global",type:"button",onClick:this.showAdvanced.bind(this)},m):"";return r.a.createElement("div",{className:n},r.a.createElement("div",{className:"main"},t),y,r.a.createElement(j.a,{id:"global","aria-haspopup":"true",role:"example"},this.state["fennecadvancedsearch-show-more"]),r.a.createElement("div",{className:"advanced"},a))}},{key:"radiosBuild",value:function(e){var t=[],a=!0,n=!1,i=void 0;try{for(var l,s=e.widget.options[Symbol.iterator]();!(a=(l=s.next()).done);a=!0){var u=l.value;t.push(r.a.createElement("span",{key:e.field+"-"+u.value,className:"checkbox-wrp"},r.a.createElement("input",{name:e.field,type:"radio",value:"{option.value}",onChange:this.radioChanges.bind(this,e.field,u)}),r.a.createElement("span",{className:"radio-label"},u.label)))}}catch(o){n=!0,i=o}finally{try{a||null==s.return||s.return()}finally{if(n)throw i}}return t}},{key:"selectBuild",value:function(e){var t=this.extractOptions(e.widget.options);return r.a.createElement(E.a,{className:"select select-"+e.field,value:this.state.selected,onChange:this.selectChanged.bind(this,e.field),options:t})}},{key:"rangeBuild",value:function(e){var t,a,n=this.state["fennecadvancedsearch-from-label"],i=this.state["fennecadvancedsearch-to-label"],l=g.getValue(e.field);if(l){y.isArray(l)&&(l=l[0]),l.value&&(l=l.value);var s=l.split("|");t=s[0],a=s[1]}return r.a.createElement("span",null,r.a.createElement("span",null,n),r.a.createElement("input",{type:"number",className:"range-input range-input-from",name:e.field,defaultValue:t,onChange:this.rangeChanges.bind(this,e.field,0)}),r.a.createElement("span",null,i),r.a.createElement("input",{type:"number",className:"range-input range-input-to",defaultValue:a,name:e.field,onChange:this.rangeChanges.bind(this,e.field,1)}))}},{key:"textBuild",value:function(e){var t=g.getValue(e.field),a=this.getPlaceholder(e);return r.a.createElement("input",{type:"text",placeholder:a,value:t?t.value:"",name:e.field,onChange:this.inputChanges.bind(this,e.field)})}},{key:"autocompleteBuild",value:function(e){var t=this.isSearchAutomplete()?r.a.createElement("button",{type:"button",onClick:this.submitClicked.bind(this),dangerouslySetInnerHTML:{__html:this.state["fennecadvancedsearch-search-label"]}}):"",a=this.getPlaceholder(e);return r.a.createElement("div",{className:"autocomplete-wrp"},r.a.createElement(D.a,{getItemValue:function(e){return e.label},menuStyle:{position:"absolute",top:"45px",right:0,left:"auto",zIndex:5,background:"#FFF"},items:this.state.filteredOptions,renderItem:this.autocompleteRender.bind(this),value:this.state.typed,autoHighlight:!1,inputProps:{placeholder:a,onKeyDown:this.autocompleteInputKeyDown.bind(this)},onChange:this.autocompleteChanged.bind(this),onSelect:this.autocompleteSelected.bind(this,e.field)}),t)}},{key:"autocompleteRender",value:function(e,t){this.isSearchAutomplete()&&e.ns&&r.a.createElement("span",{className:"ns-wrapper"},e.ns);var a=e.label;return r.a.createElement("div",{className:"autocomplete-item "+(t?"highlighted":"regular"),key:e.label},a)}},{key:"getLabel",value:function(e){return e.label?r.a.createElement("label",{htmlFor:e.field,dangerouslySetInnerHTML:{__html:e.label}}):""}},{key:"stripHTML",value:function(e){var t=document.createElement("div");return t.innerHTML=e,t.innerText}},{key:"render",value:function(){var e=this.getInputHtml();return r.a.createElement("div",{className:"form-input form-input-wrp-"+this.state.inputData.field.replace(/:/g,"-")},e)}}]),t}(n.Component),A=a(34),N=a.n(A),V=function(){function e(){Object(s.a)(this,e)}return Object(u.a)(e,null,[{key:"setHistoryFromSearch",value:function(t){clearTimeout(e.timeout),e.timeout=setTimeout(function(){e.doSetHistoryFromSearch(t)},80)}},{key:"doSetHistoryFromSearch",value:function(t){if(!e.isFreezed){var a=this.getState(),n=y.toQueryStr(a);e.isSearchEquleToDefault(t,a)||e.lastQuery!=n&&(e.lastQuery=n,window.history.pushState(a,"",window.location.pathname+"?"+n))}}},{key:"setSearchFromHistory",value:function(t){var a=N.a.parse(window.location.search);for(var n in a){var r=a[n];if("advanced_search"===n&&(n="search"),S.isMultiple(t[n])){var i=r.split("|"),l=!0,s=!1,u=void 0;try{for(var o,c=i[Symbol.iterator]();!(l=(o=c.next()).done);l=!0){var d=o.value;g.addValue(n,d)}}catch(h){s=!0,u=h}finally{try{l||null==c.return||c.return()}finally{if(s)throw u}}}else g.setValue(n,r)}e.isSearchEquleToDefault(t,a)||g.submitData()}},{key:"getState",value:function(){var e=g.getAllValuesProcessed();return this.fixState(e)}},{key:"fixState",value:function(e){return e.search&&(e.advanced_search=e.search,delete e.search),e}},{key:"getDefaultSearch",value:function(e){var t={};for(var a in e){var n=[],r=e[a];if(r.widget&&r.widget.options){var i=!0,l=!1,s=void 0;try{for(var u,o=r.widget.options[Symbol.iterator]();!(i=(u=o.next()).done);i=!0){var c=u.value;c.defaultChecked&&n.push(c.value)}}catch(d){l=!0,s=d}finally{try{i||null==o.return||o.return()}finally{if(l)throw s}}}n.length&&(t[a]=n.join("|"))}return t}},{key:"isSearchEquleToDefault",value:function(t,a){var n=e.getDefaultSearch(t);return e.fixQueryStr(y.toQueryStr(n))===e.fixQueryStr(y.toQueryStr(a))}},{key:"fixQueryStr",value:function(e){return e.replace("advanced_search=","search=")}},{key:"freeze",value:function(){e.isFreezed=!0}},{key:"unfreeze",value:function(){e.isFreezed=!1}}]),e}(),I=(a(28),function(e){function t(){var e;return Object(s.a)(this,t),(e=Object(o.a)(this,Object(c.a)(t).call(this))).state={data:[],hide:!0},m.on("toggleSidebar",function(t){e.toggle()}),m.on("hideSidebar",function(t){e.hide()}),m.on("showSidebar",function(t){e.show()}),m.on("dataRecieved",function(t){e.hide()}),e}return Object(d.a)(t,e),Object(u.a)(t,[{key:"toggle",value:function(){this.state.hide?m.emit("showSidebar"):m.emit("hideSidebar")}},{key:"hide",value:function(){this.setState({hide:!0}),document.body.classList.add("sidebar-hidden"),document.body.classList.remove("sidebar-visible")}},{key:"show",value:function(){this.setState({hide:!1}),document.body.classList.remove("sidebar-hidden"),document.body.classList.add("sidebar-visible")}},{key:"componentDidMount",value:function(){var e=this;this.hide(),m.on("FormDataChanged",function(t){V.setHistoryFromSearch(e.state.inputs),e.forceUpdate()}),p.get().then(function(t){t&&(V.setSearchFromHistory(t.params),e.setState({inputs:t.params}))})}},{key:"render",value:function(){var e=[];if(this.state.inputs){var t=Object.values(this.state.inputs).sort(y.sortByWeight),a=!0,n=!1,i=void 0;try{for(var l,s=t[Symbol.iterator]();!(a=(l=s.next()).done);a=!0){var u=l.value;["topbar","hide"].includes(u.widget.position)||e.push(r.a.createElement(x,{key:u.field,inputData:u}))}}catch(o){n=!0,i=o}finally{try{a||null==s.return||s.return()}finally{if(n)throw i}}}return r.a.createElement("div",{className:"side-bar"+(this.state.hide?" hide":" show")},r.a.createElement("span",{className:"close-button-wrp"},r.a.createElement("button",{type:"button",className:"hide-on-desktop",onClick:this.hide.bind(this)},r.a.createElement("i",{className:"fal fa-times"}))),e)}}]),t}(n.Component)),R=function(e){function t(){var e;return Object(s.a)(this,t),(e=Object(o.a)(this,Object(c.a)(t).call(this))).state={labels:[],chevronDir:"down"},m.on("FormDataChanged",function(t){e.refreshAllInputsByData(t)}),e}return Object(d.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){for(var e=this,t=function(){var t=n[a];k(t).then(function(a){var n={};n[t]=a,e.setState(n)})},a=0,n=["fennecadvancedsearch-clear","fennecadvancedsearch-toggle-sidebar"];a<n.length;a++)t();p.get().then(function(t){t&&(e.setState({inputs:t.params,labels:[]}),e.refreshAllInputsByData(g.getAllValuesRaw()))}),this.setStickyCheck(),m.on("hideSidebar",function(t){e.setState({chevronDir:"down"})}),m.on("showSidebar",function(t){e.setState({chevronDir:"up"})})}},{key:"setStickyCheck",value:function(){var e=this;new IntersectionObserver(function(t,a){var n=!0,r=!1,i=void 0;try{for(var l,s=t[Symbol.iterator]();!(n=(l=s.next()).done);n=!0){var u=l.value.boundingClientRect;u.top>0?e.setState({sticky:!1}):u.top<0&&e.setState({sticky:!0})}}catch(o){r=!0,i=o}finally{try{n||null==s.return||s.return()}finally{if(r)throw i}}},{threshold:[0,1]}).observe(document.querySelector(".checking-sticky"))}},{key:"standardizeItem",value:function(e){return"string"===typeof e&&(e=[{label:e,value:e}]),e}},{key:"removeLabel",value:function(e,t){g.removeValue(e,t)}},{key:"submitClicked",value:function(e){e.preventDefault(),g.submitData()}},{key:"refreshAllInputsByData",value:function(e){for(var t={},a=0,n=Object.keys(e);a<n.length;a++){var r=n[a];if(e[r]&&this.state.inputs&&this.state.inputs[r]&&("sidebar"===this.state.inputs[r].widget.position&&"search"!=this.state.inputs[r].field||this.state.inputs[r].withLabels)){t[r]=[],e[r]=this.standardizeItem(e[r]);var i=!0,l=!1,s=void 0;try{for(var u,o=e[r][Symbol.iterator]();!(i=(u=o.next()).done);i=!0){var c=u.value;t[r].push({label:c.label,value:c.value,field:r})}}catch(d){l=!0,s=d}finally{try{i||null==o.return||o.return()}finally{if(l)throw s}}}}this.setState({labels:t})}},{key:"clearClicked",value:function(){var e=!1;for(var t in this.state.inputs){var a=this.state.inputs[t];S.isMultiple(a)&&!S.isSearch(a)&&(e=g.clearField(t)||e)}e&&g.fireChangeEvent()}},{key:"toggleSidebar",value:function(){m.emit("toggleSidebar")}},{key:"render",value:function(){var e=[],t=[],a=r.a.createElement("button",{type:"button",className:"hide-on-desktop",onClick:this.toggleSidebar.bind(this)},this.state["fennecadvancedsearch-toggle-sidebar"],r.a.createElement("i",{className:"fas fa-chevron-"+this.state.chevronDir}));if(this.state.inputs){var n=Object.values(this.state.inputs).sort(y.sortByWeight),i=!0,l=!1,s=void 0;try{for(var u,o=n[Symbol.iterator]();!(i=(u=o.next()).done);i=!0){var c=u.value;"topbar"===c.widget.position&&e.push(r.a.createElement(x,{key:c.field,inputData:c}))}}catch(w){l=!0,s=w}finally{try{i||null==o.return||o.return()}finally{if(l)throw s}}}if(this.state.labels)for(var d=0,h=Object.keys(this.state.labels);d<h.length;d++){var f=h[d],v=!0,p=!1,m=void 0;try{for(var b,g=this.state.labels[f][Symbol.iterator]();!(v=(b=g.next()).done);v=!0){var k=b.value;t.push(r.a.createElement("span",{key:k.field+":"+k.value,className:"label-wrp"},k.label,r.a.createElement("button",{type:"button",className:"label-remove",onClick:this.removeLabel.bind(this,k.field,k)},r.a.createElement("i",{className:"fal fa-times"}))))}}catch(w){p=!0,m=w}finally{try{v||null==g.return||g.return()}finally{if(p)throw m}}}return r.a.createElement("div",{className:"TopBar sticky-top"+(this.state.sticky?" sticky-on":"")},r.a.createElement("header",{className:"App-header"},r.a.createElement("form",{onSubmit:this.submitClicked.bind(this)},e,a,r.a.createElement("div",{className:"lables-wrp"},t)),r.a.createElement("button",{type:"button",onClick:this.clearClicked.bind(this)},this.state["fennecadvancedsearch-clear"])))}}]),t}(n.Component),F=a(35),B=a.n(F),H=function(e){function t(){var e;return Object(s.a)(this,t),(e=Object(o.a)(this,Object(c.a)(t).call(this))).state={},k("fennecadvancedsearch-no-results").then(function(t){e.noResults=t}),k("fennecadvancedsearch-on-results-error").then(function(t){e.noResultsError=t}),m.on("dataRecieved",function(t){var a=t.results;console.log("results",a,t),a&&a.error?e.setState({lastIsError:!0,results:[],searchReturned:!0}):e.setState({lastIsError:!1,results:a,searchReturned:!0})}),p.get().then(function(t){t&&(e.templates=t.templates)}),e}return Object(d.a)(t,e),Object(u.a)(t,[{key:"getTempalteByResult",value:function(e){var t=e.namespaceId;return this.templates["template_"+t]||this.templates.default}},{key:"getResultJsx",value:function(e){var t=this.getTempalteByResult(e);return r.a.createElement(B.a,{template:t,data:e})}},{key:"render",value:function(){var e=[];if(this.state.results){for(var t=0,a=Object.keys(this.state.results);t<a.length;t++){var n=a[t],i=this.state.results[n];e.push(this.getResultJsx(i))}this.state.searchReturned&&!Object.keys(this.state.results).length&&(this.state.lastIsError?e.push(r.a.createElement("div",{className:"no-results no-results-error",key:"error"},this.noResultsError)):e.push(r.a.createElement("div",{className:"no-results no-results-empty",key:"error"},this.noResults)))}return r.a.createElement("div",{className:"results"},e)}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(I,null),document.getElementById("side-bar")),l.a.render(r.a.createElement(R,null),document.getElementById("top-bar")),l.a.render(r.a.createElement(H,null),document.getElementById("results")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[38,1,2]]]);
//# sourceMappingURL=main.4775f5e5.chunk.js.map