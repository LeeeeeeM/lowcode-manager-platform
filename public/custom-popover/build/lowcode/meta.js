!function e(t,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?exports.CustomPopoverMeta=r():t.CustomPopoverMeta=r()}(window,(function(){return function(e){var t={};function r(o){if(t[o])return t[o].exports;var n=t[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=e,r.c=t,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(o,n,function(t){return e[t]}.bind(null,n));return o},r.n=function(e){var t=e&&e.__esModule?function t(){return e.default}:function t(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){e.exports=r(1)},function(e,t,r){"use strict";r.r(t),r.d(t,"components",(function(){return N})),r.d(t,"componentList",(function(){return w}));var o,n={snippets:[{title:"\u6c14\u6ce1\u5361\u7247",screenshot:"https://alifd.alicdn.com/fusion-cool/icons/icon-antd/popover-1.jpg",schema:{componentName:"CustomPopover",props:{}}}],componentName:"CustomPopover",title:"\u81ea\u5b9a\u4e49Popover",category:"\u6570\u636e\u5c55\u793a",devMode:"proCode",group:"\u81ea\u5b9a\u4e49\u7ec4\u4ef6",npm:{package:"custom-popover",version:"0.1.0",exportName:"default",main:"src/index.tsx",destructuring:!1,subName:""},props:[{title:"\u5185\u5bb9",display:"block",type:"group",items:[{name:"title",title:{label:"\u5361\u7247\u6807\u9898",tip:"title | \u5361\u7247\u6807\u9898"},propType:{type:"oneOfType",value:["string","node","func"]},setter:["StringSetter","SlotSetter","FunctionSetter","VariableSetter"]},{name:"content",title:{label:"\u5361\u7247\u5185\u5bb9",tip:"content | \u5361\u7247\u5185\u5bb9"},propType:{type:"oneOfType",value:["string","node","func"]},setter:["StringSetter","SlotSetter","FunctionSetter","VariableSetter"]}]},{title:"\u63a7\u5236",display:"block",type:"group",items:[{name:"defaultOpen",title:{label:"\u9ed8\u8ba4\u663e\u9690",tip:"defaultOpen | \u9ed8\u8ba4\u662f\u5426\u663e\u9690"},propType:"bool",setter:"BoolSetter",defaultValue:!1},{name:"open",title:{label:"\u624b\u52a8\u663e\u9690",tip:"open | \u624b\u52a8\u63a7\u5236\u6d6e\u5c42\u663e\u9690"},propType:"bool",setter:"BoolSetter"}]},{title:"\u5916\u89c2",display:"block",type:"group",items:[{name:"placement",title:{label:"\u6c14\u6ce1\u4f4d\u7f6e",tip:"placement | \u6c14\u6ce1\u4f4d\u7f6e"},propType:{type:"oneOf",value:["top","left","right","bottom","topLeft","topRight","bottomLeft","bottomRight","leftTop","leftBottom","rightTop","rightBottom"]},defaultValue:"top",setter:{componentName:"SelectSetter",props:{options:[{title:"\u4e0a",value:"top"},{title:"\u5de6",value:"left"},{title:"\u53f3",value:"right"},{title:"\u4e0b",value:"bottom"},{title:"\u4e0a\u5de6",value:"topLeft"},{title:"\u4e0a\u53f3",value:"topRight"},{title:"\u4e0b\u5de6",value:"bottomLeft"},{title:"\u4e0b\u53f3",value:"bottomRight"},{title:"\u5de6\u4e0a",value:"leftTop"},{title:"\u5de6\u4e0b",value:"leftBottom"},{title:"\u53f3\u4e0a",value:"rightTop"},{title:"\u53f3\u4e0b",value:"rightBottom"}]}}},{name:"autoAdjustOverflow",title:{label:"\u81ea\u52a8\u8c03\u6574",tip:"autoAdjustOverflow | \u6c14\u6ce1\u88ab\u906e\u6321\u65f6\u81ea\u52a8\u8c03\u6574\u4f4d\u7f6e"},propType:"bool",setter:"BoolSetter",defaultValue:!0},{name:"arrowPointAtCenter",title:{label:"\u6307\u5411\u4e2d\u5fc3",tip:"arrowPointAtCenter | \u7bad\u5934\u662f\u5426\u6307\u5411\u76ee\u6807\u5143\u7d20\u4e2d\u5fc3"},propType:"bool",setter:"BoolSetter",defaultValue:!1},{name:"color",title:{label:"\u80cc\u666f\u989c\u8272",tip:"color | \u80cc\u666f\u989c\u8272"},propType:"string",setter:"ColorSetter"},{name:"zIndex",title:{label:"zIndex",tip:"zIndex | \u8bbe\u7f6e Tooltip \u7684 z-index\u503c"},propType:"number",setter:"NumberSetter"}]},{name:"overlayStyle",title:"\u5361\u7247\u6837\u5f0f",type:"group",extraProps:{display:"entry"},items:[{name:"overlayStyle",title:{label:"\u6837\u5f0f\u8bbe\u7f6e",tip:"overlayStyle | \u5361\u7247\u6837\u5f0f"},setter:"StyleSetter",extraProps:{display:"block"}}]},{name:"overlayInnerStyle",title:"\u5361\u7247\u5185\u5bb9\u6837\u5f0f",type:"group",extraProps:{display:"entry"},items:[{name:"overlayInnerStyle",title:{label:"\u6837\u5f0f\u8bbe\u7f6e",tip:"overlayStyle | \u5361\u7247\u5185\u5bb9\u533a\u57df\u7684\u6837\u5f0f"},setter:"StyleSetter",extraProps:{display:"block"}}]},{title:"\u884c\u4e3a",display:"block",type:"group",items:[{name:"trigger",title:{label:"\u89e6\u53d1\u884c\u4e3a",tip:"trigger | \u89e6\u53d1\u884c\u4e3a"},propType:{type:"oneOf",value:["hover","focus","click","contextMenu"]},defaultValue:"hover",setter:{componentName:"SelectSetter",props:{options:[{title:"\u9f20\u6807\u60ac\u505c",value:"hover"},{title:"\u83b7\u5f97\u7126\u70b9",value:"focus"},{title:"\u9f20\u6807\u70b9\u51fb",value:"click"},{title:"\u53f3\u952e\u83dc\u5355",value:"contextMenu"}]}}},{name:"mouseEnterDelay",title:{label:"\u5c55\u793a\u5ef6\u65f6",tip:"mouseEnterDelay | \u9f20\u6807\u79fb\u5165\u540e\u5ef6\u65f6\u591a\u5c11\u624d\u663e\u793a Tooltip\uff0c\u5355\u4f4d\uff1a\u79d2"},propType:"number",defaultValue:.1,setter:{componentName:"NumberSetter",props:{step:.1}}},{name:"mouseLeaveDelay",title:{label:"\u9690\u85cf\u5ef6\u65f6",tip:"mouseLeaveDelay | \u9f20\u6807\u79fb\u51fa\u540e\u5ef6\u65f6\u591a\u5c11\u624d\u9690\u85cf Tooltip\uff0c\u5355\u4f4d\uff1a\u79d2"},propType:"number",defaultValue:.1,setter:{componentName:"NumberSetter",props:{step:.1}}}]}],configure:{component:{isContainer:!0},supports:{style:!0,events:[{name:"onOpenChange",template:"onOpenChange(open,${extParams}){\n// \u663e\u793a\u9690\u85cf\u7684\u56de\u8c03\nconsole.log('onOpenChange',open);}"}]}}};function i(e,t){return a(e)||p(e,t)||s(e,t)||l()}function l(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function p(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var o,n,i,l,p=[],a=!0,u=!1;try{if(i=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;a=!1}else for(;!(a=(o=i.call(r)).done)&&(p.push(o.value),p.length!==t);a=!0);}catch(e){u=!0,n=e}finally{try{if(!a&&null!=r.return&&(l=r.return(),Object(l)!==l))return}finally{if(u)throw n}}return p}}function a(e){if(Array.isArray(e))return e}function u(e){return f(e)||m(e)||s(e)||c()}function c(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function s(e,t){if(e){if("string"==typeof e)return y(e,t);var r={}.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?y(e,t):void 0}}function m(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}function f(e){if(Array.isArray(e))return y(e)}function y(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,o=Array(t);r<t;r++)o[r]=e[r];return o}function b(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function d(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?b(Object(r),!0).forEach((function(t){v(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):b(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function v(e,t,r){return(t=g(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function g(e){var t=h(e,"string");return"symbol"==S(t)?t:t+""}function h(e,t){if("object"!=S(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,t||"default");if("object"!=S(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}function S(e){return(S="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var O={};function j(e){var t=[{title:"\u5e38\u7528",icon:"",children:[]},{title:"\u5bb9\u5668",icon:"",children:[]},{title:"\u5bfc\u822a",icon:"",children:[]},{title:"\u5185\u5bb9",icon:"",children:[]},{title:"Feedback \u53cd\u9988",icon:"",children:[]}],r={"\u539f\u5b50\u7ec4\u4ef6":!0},o={};return e.forEach((function(e){var n=e.category||"\u5176\u4ed6";e.group&&!o[e.componentName]&&(o[e.componentName]=e.group),e.group&&!r[e.group]&&(r[e.group]=!0);var i=t.find((function(e){return e.title===n}));i||(i={title:n,icon:"",children:[]},t.push(i)),e.snippets&&e.snippets.length&&i.children.push({componentName:e.componentName,title:e.title||e.componentName,sort:{category:i.title,group:o[e.componentName]||"\u539f\u5b50\u7ec4\u4ef6",priority:O[i.title]||0},icon:"",package:e.npm.pkg,snippets:e.snippets||[]})})),t}function x(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"custom-popover",r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"0.1.0",o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{"@alifd/next":"1.25.23","@alifd/meet":"2.6.3",antd:"4.17.3"};if(!e||!r)return e;var n=e.npm;return n?("object"===S(o)&&o[n.package]?e.npm=d(d({},n),{},{version:o[n.package]}):n.package===t&&(e.npm=d(d({},n),{},{version:r})),e):e}["\u57fa\u7840\u5143\u7d20","\u5e03\u5c40\u5bb9\u5668\u7c7b","\u8868\u683c\u7c7b","\u8868\u5355\u8be6\u60c5\u7c7b","\u5e2e\u52a9\u7c7b","\u5bf9\u8bdd\u6846\u7c7b","\u4e1a\u52a1\u7c7b","\u901a\u7528","\u5f15\u5bfc","\u4fe1\u606f\u8f93\u5165","\u4fe1\u606f\u5c55\u793a","\u4fe1\u606f\u53cd\u9988"].reverse().forEach((function(e,t){O[e]=++t}));var P,N=[],T={};[n].forEach((function(e){if(Array.isArray(e))N.push.apply(N,u(e.map((function(e){if(!e.npm){var t=e.componentName,r=t.split("."),o=i(r,2),n=o[0],l=o[1];e.npm={exportName:n,main:"",destructuring:!0,subName:r.length>1?t.slice(t.indexOf(".")+1):l}}return e.npm=d(d({},T),e.npm||{}),x(e)}))));else if(e.components)N.push.apply(N,u(e.components.map((function(e){if(!e.npm){var t=e.componentName,r=t.split("."),o=i(r,2),n=o[0],l=o[1];e.npm={exportName:n,main:"",destructuring:!0,subName:r.length>1?t.slice(t.indexOf(".")+1):l}}return e.npm=d(d({},T),e.npm||{}),x(e)}))));else{if(!e.npm){var t=e.componentName,r=t.split("."),o=i(r,2),n=o[0],l=o[1];e.npm={exportName:n,main:"",destructuring:!0,subName:r.length>1?t.slice(t.indexOf(".")+1):l}}e.npm=d(d({},T),e.npm||{}),N.push(x(e))}}));var w=j(N),k=!0}])}));