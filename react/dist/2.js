(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{29:function(e,t,a){},38:function(e,t,a){e.exports=a(97)},43:function(e,t,a){},97:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(6),l=a.n(i),s=(a(43),a(2)),o=a(3),u=a(8),c=a(7),d=a(9),h=a(12),f=a.n(h),v=function(){function e(){Object(s.a)(this,e)}return Object(o.a)(e,null,[{key:"get",value:function(t,a){return new Promise(function(n){e.getUrl(a).then(function(e){f.a.get(e+t).then(function(e){return n(e)})})})}},{key:"post",value:function(t,a,n){return new Promise(function(r){e.getUrl(n).then(function(e){f.a.post(e+t,a).then(function(e){return r(e)})})})}},{key:"addApiEndpoint",value:function(e){return e?"":"api.php?format=json&"}},{key:"getUrl",value:function(t){return new Promise(function(a){if(window.document.body.classList.contains("mediawiki"))var n=setInterval(function(){window.mw&&window.mw.config&&(clearInterval(n),a(window.mw.config.get("wgServer")+window.mw.config.get("wgScriptPath")+"/"+e.addApiEndpoint(t)))},100);else a(window.localStorage.getItem("apiUrl")+e.addApiEndpoint(t))})}}]),e}(),m=function(){function e(){Object(s.a)(this,e)}return Object(o.a)(e,null,[{key:"get",value:function(){return new Promise(function(t){e.onCall?e.waitForResponse().then(function(e){return t(e)}):e.getFromRemote().then(function(a){e.data=a,t(e.data)})})}},{key:"getFromRemote",value:function(){return new Promise(function(t){e.onCall=!0,v.get("action=fennecadvancedsearchparams").then(function(a){e.onCall=!1,t(a?a.data:null)})})}},{key:"waitForResponse",value:function(){return new Promise(function(t){var a=setInterval(function(){e.data&&(clearInterval(a),t(e.data))},200)})}}]),e}(),y=new(function(){function e(){Object(s.a)(this,e),this.events={}}return Object(o.a)(e,[{key:"on",value:function(e,t){this.events[e]||(this.events[e]={listeners:[]}),this.events[e].listeners.push(t)}},{key:"off",value:function(e){delete this.events[e]}},{key:"emit",value:function(e){for(var t=arguments.length,a=new Array(t>1?t-1:0),n=1;n<t;n++)a[n-1]=arguments[n];var r=!0,i=!1,l=void 0;try{for(var s,o=this.events[e].listeners[Symbol.iterator]();!(r=(s=o.next()).done);r=!0){s.value.apply(this,a)}}catch(u){i=!0,l=u}finally{try{r||null==o.return||o.return()}finally{if(i)throw l}}}}]),e}()),p=function(){function e(){Object(s.a)(this,e)}return Object(o.a)(e,null,[{key:"isMobile",value:function(){return window.innerWidth<=992}},{key:"isArray",value:function(e){return"object"===typeof e&&"undefined"!==typeof e}},{key:"toQueryStr",value:function(e){return Object.keys(e).sort().map(function(t){return e[t]?t+"="+e[t]:""}).filter(function(e){return e}).join("&")}},{key:"sortByWeight",value:function(e,t){var a=e.weight||0,n=t.weight||0;return a>n?1:a<n?-1:0}},{key:"stripHtml",value:function(e){var t=document.createElement("div");return t.innerHTML=e,t.innerText}}]),e}(),g=function(){function e(){Object(s.a)(this,e)}return Object(o.a)(e,null,[{key:"addValue",value:function(t,a){e.allData[t]=e.allData[t]||[];var n=e.standardizeValue(a);e.allData[t].map(function(e){return""+e.value}).includes(""+n.value)||(e.allData[t].push(n),e.fireChangeEvent())}},{key:"removeValue",value:function(t,a){var n=e.allData[t].findIndex(function(e){return""+a.value===""+e.value});n>-1&&e.allData[t].splice(n,1),e.allData[t].length||e.removeBoundFields(t),e.fireChangeEvent()}},{key:"ChangeValueByKey",value:function(t,a,n){e.allData[t]=e.allData[t]||Array(a).fill(null),e.allData[t][a]=n,e.fireChangeEvent()}},{key:"setValue",value:function(t,a){e.allData[t]=a,e.fireChangeEvent()}},{key:"getValue",value:function(t){return e.allData[t]}},{key:"includes",value:function(t,a){return e.allData[t]&&e.allData[t].filter(function(e){return""+e.value===""+a}).length}},{key:"fireChangeEvent",value:function(){y.emit("FormDataChanged",e.getAllValuesRaw()),delete e.offset,e.freezed||p.isMobile()||e.delayedSubmitData()}},{key:"standardizeValue",value:function(e){return"string"===typeof e?{label:e,value:e}:e}},{key:"getAllValuesRaw",value:function(){return e.allData}},{key:"getAllValuesProcessed",value:function(){for(var t=Object.assign({},e.allData),a=0,n=Object.keys(t);a<n.length;a++){var r=n[a];t[r]&&("object"===typeof t[r]&&"undefined"!==typeof t[r].length&&(t[r]=t[r].map(function(e){return"undefined"!=typeof e.value?e.value:e})),"string"!=typeof t[r]&&t[r].length&&(t[r]=t[r].join("|")))}return t}},{key:"setNext",value:function(t){t&&(e.offset=t,e.submitData(!1))}},{key:"setBinds",value:function(t){e.binds=t.map(function(e){return e.fields})}},{key:"setInputsParams",value:function(t){e.inputsParams=t}},{key:"delayedSubmitData",value:function(){clearTimeout(e.delayedSubmitDataTimeout),e.delayedSubmitDataTimeout=setTimeout(function(){e.submitData()},1500)}},{key:"submitData",value:function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],a=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=this.getAllValuesProcessed();if(n.search){n.action="fennecadvancedsearchsearch",e.offset&&(n.offset=e.offset),a&&(n=e.filterParams(n));var r=p.toQueryStr(n);y.emit("searchStarted",{reset:t,params:n}),v.get(r).then(function(e){var a=e.data.error?{results:{error:!0}}:e.data.FennecAdvancedSearchSearch;a.reset=t,y.emit("dataRecieved",a)})}}},{key:"clearField",value:function(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=e.allData[t],r=null;return console.log(t,n,"currentVal,pa"),!!n&&(r=p.isArray(n)?[]:"object"==typeof n?{}:"",e.allData[t]=r,e.removeBoundFields(t,a),!0)}},{key:"removeBoundFields",value:function(t,a){var n=e.getBounds(t),r=!0,i=!1,l=void 0;try{for(var s,o=n[Symbol.iterator]();!(r=(s=o.next()).done);r=!0){var u=s.value;u!=a&&e.clearField(u,t)}}catch(c){i=!0,l=c}finally{try{r||null==o.return||o.return()}finally{if(i)throw l}}}},{key:"filterParams",value:function(t){for(var a=0,n=Object.keys(t);a<n.length;a++){var r=n[a],i=e.getBounds(r)||[],l=!0,s=!1,o=void 0;try{for(var u,c=i[Symbol.iterator]();!(l=(u=c.next()).done);l=!0){var d=u.value;if(!t[d]||["[]","{}"].includes(window.JSON.stringify(t[d]))){delete t[r];break}}}catch(h){s=!0,o=h}finally{try{l||null==c.return||c.return()}finally{if(s)throw o}}}return t}},{key:"getBounds",value:function(t){var a=[],n=!0,r=!1,i=void 0;try{for(var l,s=e.binds[Symbol.iterator]();!(n=(l=s.next()).done);n=!0){var o=l.value;if(o.includes(t)){var u=[].concat(o);u.splice(u.indexOf(t),1),a=a.concat(u)}}}catch(c){r=!0,i=c}finally{try{n||null==s.return||s.return()}finally{if(r)throw i}}return a}}]),e}();g.allData={},g.binds=[];var b=g;var k=function(e){return new Promise(function(t){m.get().then(function(a){a&&a.translations?t(a.translations[e]):t("")})})},w=["select","autocomplete","checkboxes","range"],S=function(){function e(){Object(s.a)(this,e)}return Object(o.a)(e,null,[{key:"isRange",value:function(e){return"range"===e.widget.type}},{key:"isMultiple",value:function(e){return w.includes(e.widget.type)}},{key:"isSearchOrNs",value:function(t){return e.isSearch(t)||e.isNs(t)}},{key:"isSearch",value:function(e){return"search"===e.field}},{key:"isNs",value:function(e){return"namespace"===e.field}}]),e}(),E=a(37),D=a(30),C=a.n(D),O=a(31),x=a.n(O),j=function(e){function t(e){var a;Object(s.a)(this,t),a=Object(u.a)(this,Object(c.a)(t).call(this,e));var n=e.inputData.widget.options||[],r=b.getValue(e.inputData.field);if(n=a.extractOptions(n),a.state={inputData:e.inputData,filteredOptions:n,options:n,typed:r&&r.length?r[0].value:""},"select"===e.inputData.widget.type){var i=e.inputData.widget.default||n[0];"string"==typeof i&&(i=[{value:i,label:i}]),a.state.selected=i}return a}return Object(d.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){for(var e=this,t=function(){var t=n[a];k(t).then(function(a){var n={};n[t]=a,e.setState(n)})},a=0,n=["fennecadvancedsearch-to-label","fennecadvancedsearch-from-label","fennecadvancedsearch-search-label","fennecadvancedsearch-more-label","fennecadvancedsearch-less-label","fennecadvancedsearch-show-more"];a<n.length;a++)t();var r=!0,i=!1,l=void 0;try{for(var s,o=this.state.options[Symbol.iterator]();!(r=(s=o.next()).done);r=!0){var u=s.value;u.defaultChecked&&b.addValue(this.state.inputData.field,u)}}catch(c){i=!0,l=c}finally{try{r||null==o.return||o.return()}finally{if(i)throw l}}}},{key:"extractOptions",value:function(e){var t=[],a=!0,n=!1,r=void 0;try{for(var i,l=e[Symbol.iterator]();!(a=(i=l.next()).done);a=!0){var s=i.value;"string"==typeof s?t.push({value:s,label:s}):t.push(s)}}catch(o){n=!0,r=o}finally{try{a||null==l.return||l.return()}finally{if(n)throw r}}return t}},{key:"valueChanged",value:function(e,t){b.setValue(e,t)}},{key:"checkboxChanges",value:function(e,t,a){a.target.checked?b.addValue(e,t):b.removeValue(e,t)}},{key:"filterAlreadyChosenOptions",value:function(e){var t=b.getValue(this.state.inputData.field);return t?(t=t.map(function(e){return e.value}),e=e.filter(function(e){return!t.includes(e.value)})):e}},{key:"autocompleteChanged",value:function(e,t){var a=this;if(this.setState({typed:t}),this.state.options.length){var n=this.state.options.filter(function(e){return!t||e.label.indexOf(t)>-1});this.setState({filteredOptions:this.filterAlreadyChosenOptions(n)})}else this.isSearchAutomplete()?this.searchAutocomplete(t):v.get("action=fennecadvancedsearchautocomplete&field=".concat(this.state.inputData.field,"&search=").concat(t)).then(function(e){if(e.data.values){for(var t=[],n=e.data.values,r=0,i=Object.keys(n);r<i.length;r++){var l=i[r];t.push({label:n[l],value:l})}a.setState({filteredOptions:a.filterAlreadyChosenOptions(t)})}})}},{key:"searchAutocomplete",value:function(e){var t=this,a=b.getAllValuesProcessed().namespace;b.setValue(this.state.inputData.field,e),v.get("action=opensearch&formatversion=2&search=".concat(e,"&namespace=").concat(a,"&limit=10&suggest=true")).then(function(e){for(var a=e.data,n=a[1],r=a[3],i=[],l=0;l<n.length;l++){var s,o=void 0,u=n[l].split(":");u.length>1&&(o=u.shift()),s=u.join(":"),i.push({label:s,ns:o,value:r[l],href:r[l]})}t.setState({filteredOptions:i}),y.emit("autocompleteMenuResults",i)})}},{key:"submitClicked",value:function(){b.submitData()}},{key:"autocompleteInputKeyDown",value:function(e){13==e.keyCode&&setTimeout(function(){var e=document.querySelector(".field-wrp-name-search input"),t=e.value.length;e.setSelectionRange(t,t)},10)}},{key:"autocompleteSelected",value:function(e,t,a){this.isSearchAutomplete()?window.location.href=a.value:(b.addValue(e,a),this.setState({typed:""}))}},{key:"onAutocompleteMenuVisibilityChange",value:function(e){y.emit("autocompleteMenuOpen",e)}},{key:"isSearchAutomplete",value:function(){return S.isSearch(this.state.inputData)}},{key:"selectChanged",value:function(e,t){this.setState({selected:t}),"<select>"==t.value?this.state.inputData.widget.is_not_multiple&&b.clearField(e):this.state.inputData.widget.is_not_multiple?b.setValue(e,[t]):""+t.value&&b.addValue(e,t)}},{key:"rangeChanges",value:function(e,t,a){b.ChangeValueByKey(e,t,a.target.value)}},{key:"inputChanges",value:function(e,t){this.valueChanged(e,t.target.value)}},{key:"radioChanges",value:function(e,t,a){this.valueChanged(e,t)}},{key:"getInputHtml",value:function(){if(this.state.inputData&&Object.keys(this.state.inputData).length){var e=this.state.inputData,t=this.getLabel(e),a="field-wrp field-wrp-type-"+e.widget.type+" field-wrp-name-"+e.field,n="";switch(e.widget.type){case"text":case"select":case"checkboxes":case"autocomplete":case"radios":case"range":n=this[e.widget.type+"Build"](this.state.inputData)}return r.a.createElement("div",{className:a},r.a.createElement("span",{className:""},t),n)}return""}},{key:"showAdvanced",value:function(){this.setState({showAdvanced:!this.state.showAdvanced})}},{key:"getPlaceholder",value:function(e){return e.widget.placeholder?e.widget.placeholder:p.stripHtml(e.label)}},{key:"checkboxesBuild",value:function(e){var t=[],a=[],n="main-and-advanced-wrp"+(this.state.showAdvanced?" opened":""),i=!0,l=!1,s=void 0;try{for(var o,u=e.widget.options[Symbol.iterator]();!(i=(o=u.next()).done);i=!0){var c=o.value,d="far ",h="",f=c.defaultChecked;b.includes(e.field,c.value)?(h=" selected",d+="fa-check-square",f=1):d+="fa-square";var v=(e.field+"-"+c.value).replace(/\s|:/g,"-"),m=r.a.createElement("span",{key:e.field+"-"+c.value,className:"checkbox-wrp"+h},r.a.createElement("input",{id:v,type:"checkbox",value:c.value,defaultChecked:f,onChange:this.checkboxChanges.bind(this,e.field,c)}),r.a.createElement("label",{htmlFor:v},r.a.createElement("i",{className:d}),r.a.createElement("span",{className:"checkbox-label",dangerouslySetInnerHTML:{__html:c.label}})));"advanced"===c.show?a.push(m):"disable"!==c.show&&t.push(m)}}catch(g){l=!0,s=g}finally{try{i||null==u.return||u.return()}finally{if(l)throw s}}var y=this.state.showAdvanced?this.state["fennecadvancedsearch-less-label"]:this.state["fennecadvancedsearch-more-label"],p=a.length?r.a.createElement("button",{"data-tip":!0,"data-for":"global",type:"button",onClick:this.showAdvanced.bind(this),dangerouslySetInnerHTML:{__html:y}}):"";return r.a.createElement("div",{className:n},r.a.createElement("div",{className:"main"},t),p,r.a.createElement(x.a,{id:"global","aria-haspopup":"true",role:"example"},this.state["fennecadvancedsearch-show-more"]),r.a.createElement("div",{className:"advanced"},a))}},{key:"radiosBuild",value:function(e){var t=[],a=!0,n=!1,i=void 0;try{for(var l,s=e.widget.options[Symbol.iterator]();!(a=(l=s.next()).done);a=!0){var o=l.value;t.push(r.a.createElement("span",{key:e.field+"-"+o.value,className:"checkbox-wrp"},r.a.createElement("input",{name:e.field,type:"radio",value:"{option.value}",onChange:this.radioChanges.bind(this,e.field,o)}),r.a.createElement("span",{className:"radio-label"},o.label)))}}catch(u){n=!0,i=u}finally{try{a||null==s.return||s.return()}finally{if(n)throw i}}return t}},{key:"selectBuild",value:function(e){var t=this.extractOptions(e.widget.options);return r.a.createElement(E.a,{className:"select select-"+e.field,value:this.state.selected,onChange:this.selectChanged.bind(this,e.field),options:t})}},{key:"rangeBuild",value:function(e){var t,a,n=this.state["fennecadvancedsearch-from-label"],i=this.state["fennecadvancedsearch-to-label"],l=b.getValue(e.field);if(l){p.isArray(l)&&(l=l[0]),l&&l.value&&(l=l.value);var s=l?l.split("|"):[];t=s[0],a=s[1]}return r.a.createElement("span",null,r.a.createElement("span",null,n),r.a.createElement("input",{type:"number",className:"range-input range-input-from",name:e.field,defaultValue:t,onChange:this.rangeChanges.bind(this,e.field,0)}),r.a.createElement("span",null,i),r.a.createElement("input",{type:"number",className:"range-input range-input-to",defaultValue:a,name:e.field,onChange:this.rangeChanges.bind(this,e.field,1)}))}},{key:"textBuild",value:function(e){var t=b.getValue(e.field),a=this.getPlaceholder(e);return r.a.createElement("input",{type:"text",placeholder:a,value:t?t.value:"",name:e.field,onChange:this.inputChanges.bind(this,e.field)})}},{key:"autocompleteBuild",value:function(e){var t=this.isSearchAutomplete()?r.a.createElement("button",{type:"button",onClick:this.submitClicked.bind(this),dangerouslySetInnerHTML:{__html:this.state["fennecadvancedsearch-search-label"]}}):"",a=this.getPlaceholder(e);return r.a.createElement("div",{className:"autocomplete-wrp"},r.a.createElement(C.a,{getItemValue:function(e){return e.label},menuStyle:{position:"absolute",top:"45px",right:0,left:"auto",zIndex:5,background:"#FFF"},items:this.state.filteredOptions,renderItem:this.autocompleteRender.bind(this),value:this.state.typed,autoHighlight:!1,inputProps:{placeholder:a,type:"search",onKeyDown:this.autocompleteInputKeyDown.bind(this)},onMenuVisibilityChange:this.onAutocompleteMenuVisibilityChange.bind(this),onChange:this.autocompleteChanged.bind(this),onSelect:this.autocompleteSelected.bind(this,e.field)}),t)}},{key:"autocompleteRender",value:function(e,t){this.isSearchAutomplete()&&e.ns&&r.a.createElement("span",{className:"ns-wrapper"},e.ns);var a=e.label;return r.a.createElement("div",{className:"autocomplete-item "+(t?"highlighted":"regular"),key:e.label},a)}},{key:"getLabel",value:function(e){return e.label?r.a.createElement("label",{htmlFor:e.field,dangerouslySetInnerHTML:{__html:e.label}}):""}},{key:"stripHTML",value:function(e){var t=document.createElement("div");return t.innerHTML=e,t.innerText}},{key:"render",value:function(){var e=this.getInputHtml();return r.a.createElement("div",{className:"form-input form-input-wrp-"+this.state.inputData.field.replace(/:/g,"-")},e)}}]),t}(n.Component),N=a(13),T=a.n(N),I=function(){function e(){Object(s.a)(this,e)}return Object(o.a)(e,null,[{key:"setHistoryFromSearch",value:function(t){clearTimeout(e.timeout),e.timeout=setTimeout(function(){e.doSetHistoryFromSearch(t)},80)}},{key:"doSetHistoryFromSearch",value:function(t){if(!e.isFreezed){var a=this.getState(),n=T.a.parse(window.location.search),r=window.location.pathname;n.title&&(r="/"+n.title);var i=p.toQueryStr(b.filterParams(a));e.isSearchEquleToDefault(t,a)&&(i=""),i&&(n.debug&&(a.debug=n.debug),i=p.toQueryStr(b.filterParams(a))),e.lastQuery!=i&&(e.lastQuery=i,window.history.pushState(a,"",r+"?"+i))}}},{key:"setSearchFromHistory",value:function(t){var a=T.a.parse(window.location.search);if(window.location.search){for(var n in console.log(JSON.stringify(a),"searchParams",window.location.search),a.namespace||(a.namespace=e.getDefaultSearch(t,"namespace")),b.freezed=!0,a){var r=a[n];if("advanced_search"===n&&(n="search"),""!==r&&t[n])if(S.isMultiple(t[n])){var i=r.split("|"),l=!0,s=!1,o=void 0;try{for(var u,c=i[Symbol.iterator]();!(l=(u=c.next()).done);l=!0){var d=u.value;S.isRange(t[n])?b.setValue(n,i):b.addValue(n,d)}}catch(h){s=!0,o=h}finally{try{l||null==c.return||c.return()}finally{if(s)throw o}}}else b.setValue(n,r);else delete a[n]}b.freezed=!1,e.isSearchEquleToDefault(t,a)||b.submitData()}}},{key:"getState",value:function(){var e=b.getAllValuesProcessed();return this.fixState(e)}},{key:"fixState",value:function(e){return e.search&&(e.advanced_search=e.search,delete e.search),e}},{key:"getDefaultSearch",value:function(e,t){var a={};for(var n in e)if(!t||t==n){var r=[],i=e[n];if(i.widget&&i.widget.options){var l=!0,s=!1,o=void 0;try{for(var u,c=i.widget.options[Symbol.iterator]();!(l=(u=c.next()).done);l=!0){var d=u.value;d.defaultChecked&&r.push(d.value)}}catch(h){s=!0,o=h}finally{try{l||null==c.return||c.return()}finally{if(s)throw o}}}r.length&&(a[n]=r.join("|"))}return t?a[t]:a}},{key:"isSearchEquleToDefault",value:function(t,a){var n=e.getDefaultSearch(t);return e.fixQueryStr(p.toQueryStr(n))===e.fixQueryStr(p.toQueryStr(a))}},{key:"fixQueryStr",value:function(e){return e.replace("advanced_search=","search=").replace(/title=.+(\&|$)/,"")}},{key:"freeze",value:function(){e.isFreezed=!0}},{key:"unfreeze",value:function(){e.isFreezed=!1}}]),e}(),A=(a(29),function(e){function t(){var e;return Object(s.a)(this,t),(e=Object(u.a)(this,Object(c.a)(t).call(this))).state={data:[],hide:!0},y.on("toggleSidebar",function(t){e.toggle()}),y.on("hideSidebar",function(t){e.hide(),p.isMobile()&&b.submitData()}),y.on("showSidebar",function(t){e.show()}),y.on("dataRecieved",function(t){e.hide()}),e}return Object(d.a)(t,e),Object(o.a)(t,[{key:"toggle",value:function(){this.state.hide?y.emit("showSidebar"):y.emit("hideSidebar")}},{key:"hide",value:function(){this.setState({hide:!0}),document.body.classList.add("sidebar-hidden"),document.body.classList.remove("sidebar-visible")}},{key:"show",value:function(){this.setState({hide:!1}),document.body.classList.remove("sidebar-hidden"),document.body.classList.add("sidebar-visible")}},{key:"componentDidMount",value:function(){var e=this;this.hide(),y.on("FormDataChanged",function(t){I.setHistoryFromSearch(e.state.inputs),e.forceUpdate()}),m.get().then(function(t){t&&(b.setBinds(t.binds),b.setInputsParams(t.params),e.setState({inputs:t.params},function(){I.setSearchFromHistory(t.params)}))})}},{key:"render",value:function(){var e=[];if(this.state.inputs){var t=Object.values(this.state.inputs).sort(p.sortByWeight),a=!0,n=!1,i=void 0;try{for(var l,s=t[Symbol.iterator]();!(a=(l=s.next()).done);a=!0){var o=l.value;["topbar","hide"].includes(o.widget.position)||e.push(r.a.createElement(j,{key:o.field,inputData:o}))}}catch(u){n=!0,i=u}finally{try{a||null==s.return||s.return()}finally{if(n)throw i}}}return e.length?r.a.createElement("div",{className:"side-bar"+(this.state.hide?" hide":" show")},r.a.createElement("span",{className:"close-button-wrp"},r.a.createElement("button",{type:"button",className:"hide-on-desktop",onClick:this.hide.bind(this)},r.a.createElement("i",{className:"fal fa-times"}))),e):r.a.createElement("div",{className:"side-bar side-bar-loader"})}}]),t}(n.Component)),V=function(e){function t(){var e;return Object(s.a)(this,t),(e=Object(u.a)(this,Object(c.a)(t).call(this))).state={labels:[],chevronDir:"down"},y.on("FormDataChanged",function(t){e.refreshAllInputsByData(t)}),y.on("autocompleteMenuOpen",function(t){e.setState({searchSuggestionsOpen:t})}),y.on("autocompleteMenuResults",function(t){e.setState({searchSuggestionsNotEmpty:!!t.length})}),e}return Object(d.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){for(var e=this,t=function(){var t=n[a];k(t).then(function(a){var n={};n[t]=a,e.setState(n)})},a=0,n=["fennecadvancedsearch-clear","fennecadvancedsearch-toggle-sidebar"];a<n.length;a++)t();m.get().then(function(t){t&&(e.setState({inputs:t.params,labels:[]}),e.refreshAllInputsByData(b.getAllValuesRaw()))}),this.setStickyCheck(),y.on("hideSidebar",function(t){e.setState({chevronDir:"down"})}),y.on("showSidebar",function(t){e.setState({chevronDir:"up"})})}},{key:"setStickyCheck",value:function(){var e=this;new IntersectionObserver(function(t,a){var n=!0,r=!1,i=void 0;try{for(var l,s=t[Symbol.iterator]();!(n=(l=s.next()).done);n=!0){var o=l.value.boundingClientRect;o.top>0?e.setState({sticky:!1}):o.top<0&&e.setState({sticky:!0})}}catch(u){r=!0,i=u}finally{try{n||null==s.return||s.return()}finally{if(r)throw i}}},{threshold:[0,1]}).observe(document.querySelector(".checking-sticky"))}},{key:"standardizeItem",value:function(e){return"string"===typeof e&&(e=[{label:e,value:e}]),e}},{key:"removeLabel",value:function(e,t){"range"===this.state.inputs[e].widget.type?b.clearField(e):b.removeValue(e,t),b.fireChangeEvent()}},{key:"submitClicked",value:function(e){e.preventDefault(),b.submitData()}},{key:"refreshAllInputsByData",value:function(e){for(var t={},a=[],n=[].concat(b.binds),r=0,i=Object.keys(e);r<i.length;r++){var l=i[r];if(!a.includes(l)&&(e[l]&&this.state.inputs&&this.state.inputs[l]&&("sidebar"===this.state.inputs[l].widget.position&&"search"!=this.state.inputs[l].field||this.state.inputs[l].withLabels))){if(t[l]=[],console.log(e[l],"allData[fieldKey]"),e[l]=this.standardizeItem(e[l]),"range"===this.state.inputs[l].widget.type){var s=e[l];s&&(s[0]||s[1])&&(t[l]=[{label:s.join("-"),value:s.join("-"),field:l}])}else{var o=!0,u=!1,c=void 0;try{for(var d,h=e[l][Symbol.iterator]();!(o=(d=h.next()).done);o=!0){var f=d.value;t[l].push({label:f.label,value:f.value,field:l})}}catch(x){u=!0,c=x}finally{try{o||null==h.return||h.return()}finally{if(u)throw c}}}if(t[l]&&t[l].length){var v=!0,m=!1,y=void 0;try{for(var p,g=n[Symbol.iterator]();!(v=(p=g.next()).done);v=!0){var k=p.value;if(k.includes(l)){var w=!0,S=!1,E=void 0;try{for(var D,C=k[Symbol.iterator]();!(w=(D=C.next()).done);w=!0){var O=D.value;if(O!=l){if(!e[O]||!e[O].length){delete t[l];break}t[l][0].label+=" "+e[O][0].label,a.push(O)}}}catch(x){S=!0,E=x}finally{try{w||null==C.return||C.return()}finally{if(S)throw E}}}}}catch(x){m=!0,y=x}finally{try{v||null==g.return||g.return()}finally{if(m)throw y}}}}}this.setState({labels:t})}},{key:"clearClicked",value:function(){var e=!1;for(var t in this.state.inputs){var a=this.state.inputs[t];S.isMultiple(a)&&!S.isSearchOrNs(a)&&(e=b.clearField(t)||e)}e&&b.fireChangeEvent()}},{key:"toggleSidebar",value:function(){y.emit("toggleSidebar")}},{key:"render",value:function(){var e=[],t=[],a=r.a.createElement("button",{type:"button",className:"hide-on-desktop",onClick:this.toggleSidebar.bind(this)},this.state["fennecadvancedsearch-toggle-sidebar"],r.a.createElement("i",{className:"fas fa-chevron-"+this.state.chevronDir}));if(this.state.inputs){var n=Object.values(this.state.inputs).sort(p.sortByWeight),i=!0,l=!1,s=void 0;try{for(var o,u=n[Symbol.iterator]();!(i=(o=u.next()).done);i=!0){var c=o.value;"topbar"===c.widget.position&&e.push(r.a.createElement(j,{key:c.field,inputData:c}))}}catch(S){l=!0,s=S}finally{try{i||null==u.return||u.return()}finally{if(l)throw s}}}if(this.state.labels)for(var d=0,h=Object.keys(this.state.labels);d<h.length;d++){var f=h[d],v=!0,m=!1,y=void 0;try{for(var g,b=this.state.labels[f][Symbol.iterator]();!(v=(g=b.next()).done);v=!0){var k=g.value;t.push(r.a.createElement("span",{key:k.field+":"+k.value,className:"label-wrp"},k.label,r.a.createElement("button",{type:"button",className:"label-remove",onClick:this.removeLabel.bind(this,k.field,k)},r.a.createElement("i",{className:"fal fa-times"}))))}}catch(S){m=!0,y=S}finally{try{v||null==b.return||b.return()}finally{if(m)throw y}}}var w="";return this.state.sticky&&(w+=" sticky-on"),t.length&&(w+=" with-labels"),console.log("this.state",this.state),this.state.searchSuggestionsOpen&&this.state.searchSuggestionsNotEmpty&&(w+=" search-suggestions-open"),console.log("appendedClass",w),e.length?r.a.createElement("div",{className:"TopBar sticky-top"+w},r.a.createElement("header",{className:"App-header"},r.a.createElement("form",{onSubmit:this.submitClicked.bind(this)},e,a,r.a.createElement("div",{className:"lables-wrp"},t)),r.a.createElement("button",{type:"button",onClick:this.clearClicked.bind(this),dangerouslySetInnerHTML:{__html:this.state["fennecadvancedsearch-clear"]}}))):r.a.createElement("div",{className:"TopBar TopBar-loader"})}}]),t}(n.Component),B=a(35),F=a.n(B),M=function(e){function t(){var e;return Object(s.a)(this,t),(e=Object(u.a)(this,Object(c.a)(t).call(this))).state={},k("fennecadvancedsearch-no-results").then(function(t){e.noResults=t}),k("fennecadvancedsearch-on-results-error").then(function(t){e.noResultsError=t}),k("fennecadvancedsearch-next").then(function(t){e.nextText=t}),k("fennecadvancedsearch-on-search-text").then(function(t){e.onSearchText=t}),k("fennecadvancedsearch-results-sum").then(function(t){e.resultsSumText=t}),y.on("searchStarted",function(t){var a={searchStarted:!0,onTop:t.reset};t.reset&&(a.results=[],a.lastIsError=!1,a.total=0,setTimeout(function(){e.scrollUp()},200)),e.setState(a)}),y.on("dataRecieved",function(t){var a,n=t.results;n&&n.error?e.setState({lastIsError:!0,results:[],searchReturned:!0,searchStarted:!1,onTop:!1}):(t.reset?a=n:(a=e.state.results||{},a=Object.assign(a,n)),e.setState({offset:t.continue?t.continue.sroffset:null,total:t.searchinfo?t.searchinfo.totalhits:0,lastIsError:!1,results:a,searchReturned:!0,searchStarted:!1,onTop:!1}))}),m.get().then(function(t){t&&(e.templates=t.templates)}),e}return Object(d.a)(t,e),Object(o.a)(t,[{key:"getTempalteByResult",value:function(e){var t=e.namespaceId;return this.templates["template_"+t]||this.templates.default}},{key:"getResultJsx",value:function(e){var t=this.getTempalteByResult(e);return r.a.createElement(F.a,{template:t,data:e})}},{key:"scrollUp",value:function(){window.scrollTo({top:0,left:0,behavior:"smooth"})}},{key:"next",value:function(){b.setNext(this.state.offset)}},{key:"render",value:function(){var e,t,a=[],n="",i="",l="";if(this.state.searchStarted&&(this.state.onTop?i=r.a.createElement("div",{className:"loading loading-top",dangerouslySetInnerHTML:{__html:this.onSearchText}}):l=r.a.createElement("div",{className:"loading loading-bottom",dangerouslySetInnerHTML:{__html:this.onSearchText}})),this.state.results){for(var s=0,o=Object.keys(this.state.results);s<o.length;s++){var u=o[s],c=this.state.results[u];a.push(this.getResultJsx(c))}this.state.searchReturned&&!Object.keys(this.state.results).length&&(e=this.state.lastIsError?r.a.createElement("div",{className:"no-results no-results-error",key:"error",dangerouslySetInnerHTML:{__html:this.noResultsError}}):r.a.createElement("div",{className:"no-results no-results-empty",key:"error",dangerouslySetInnerHTML:{__html:this.noResults}})),this.state.offset&&a.length&&(t=r.a.createElement("button",{type:"button",onClick:this.next.bind(this),dangerouslySetInnerHTML:{__html:this.nextText}}))}if(a&&this.resultsSumText&&this.state.total){var d=this.resultsSumText.replace("$1",this.state.total);n=r.a.createElement("div",{className:"results-sum-message",dangerouslySetInnerHTML:{__html:d}})}return r.a.createElement("div",{className:"results"},i,n,a,e,t,l)}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(A,null),document.getElementById("side-bar")),l.a.render(r.a.createElement(V,null),document.getElementById("top-bar")),l.a.render(r.a.createElement(M,null),document.getElementById("results")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[38,1,2]]]);
//# sourceMappingURL=main.2f678d5d.chunk.js.map