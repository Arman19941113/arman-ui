(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{38:function(e,t,s){"use strict";s.r(t);var l=s(2),c=Object(l.m)("h1",null,"Popper 浮层",-1),a=Object(l.m)("h2",null,"基本使用",-1),j={style:{width:"240px",height:"100px",padding:"16px",border:"1px solid #DCDFE6","border-radius":"2px","background-color":"#FFF"}},n=Object(l.m)("pre",null,[Object(l.m)("code",{"v-pre":"",class:"language-html"},[Object(l.m)("span",{class:"hljs-tag"},[Object(l.l)("<"),Object(l.m)("span",{class:"hljs-name"},"template"),Object(l.l)(">")]),Object(l.l)("\n    "),Object(l.m)("span",{class:"hljs-tag"},[Object(l.l)("<"),Object(l.m)("span",{class:"hljs-name"},"AInput"),Object(l.l)(),Object(l.m)("span",{class:"hljs-attr"},"ref"),Object(l.l)("="),Object(l.m)("span",{class:"hljs-string"},'"reference"'),Object(l.l)(),Object(l.m)("span",{class:"hljs-attr"},"round"),Object(l.l)(),Object(l.m)("span",{class:"hljs-attr"},"placeholder"),Object(l.l)("="),Object(l.m)("span",{class:"hljs-string"},'"focus 出现浮层"'),Object(l.l)(),Object(l.m)("span",{class:"hljs-attr"},"v-model"),Object(l.l)("="),Object(l.m)("span",{class:"hljs-string"},'"inputValue"'),Object(l.l)(),Object(l.m)("span",{class:"hljs-attr"},"@focus"),Object(l.l)("="),Object(l.m)("span",{class:"hljs-string"},'"showPopper = true"'),Object(l.l)(),Object(l.m)("span",{class:"hljs-attr"},"@blur"),Object(l.l)("="),Object(l.m)("span",{class:"hljs-string"},'"showPopper = false"'),Object(l.l)(">")]),Object(l.m)("span",{class:"hljs-tag"},[Object(l.l)("</"),Object(l.m)("span",{class:"hljs-name"},"AInput"),Object(l.l)(">")]),Object(l.l)("\n    "),Object(l.m)("span",{class:"hljs-tag"},[Object(l.l)("<"),Object(l.m)("span",{class:"hljs-name"},"APopper"),Object(l.l)(),Object(l.m)("span",{class:"hljs-attr"},":value"),Object(l.l)("="),Object(l.m)("span",{class:"hljs-string"},'"showPopper"'),Object(l.l)(),Object(l.m)("span",{class:"hljs-attr"},":reference"),Object(l.l)("="),Object(l.m)("span",{class:"hljs-string"},'"reference"'),Object(l.l)(">")]),Object(l.l)("\n        "),Object(l.m)("span",{class:"hljs-tag"},[Object(l.l)("<"),Object(l.m)("span",{class:"hljs-name"},"div"),Object(l.l)(),Object(l.m)("span",{class:"hljs-attr"},"style"),Object(l.l)("="),Object(l.m)("span",{class:"hljs-string"},'"width: 240px;height: 100px;padding: 16px;border: 1px solid #DCDFE6;border-radius: 2px;background-color: #FFF;"'),Object(l.l)(">")]),Object(l.l)("\n            表单输入值：{{inputValue}}\n        "),Object(l.m)("span",{class:"hljs-tag"},[Object(l.l)("</"),Object(l.m)("span",{class:"hljs-name"},"div"),Object(l.l)(">")]),Object(l.l)("\n    "),Object(l.m)("span",{class:"hljs-tag"},[Object(l.l)("</"),Object(l.m)("span",{class:"hljs-name"},"APopper"),Object(l.l)(">")]),Object(l.l)("\n"),Object(l.m)("span",{class:"hljs-tag"},[Object(l.l)("</"),Object(l.m)("span",{class:"hljs-name"},"template"),Object(l.l)(">")]),Object(l.l)("\n\n"),Object(l.m)("span",{class:"hljs-tag"},[Object(l.l)("<"),Object(l.m)("span",{class:"hljs-name"},"script"),Object(l.l)(">")]),Object(l.m)("span",{class:"javascript"},[Object(l.l)("\n    "),Object(l.m)("span",{class:"hljs-keyword"},"import"),Object(l.l)(" { ref } "),Object(l.m)("span",{class:"hljs-keyword"},"from"),Object(l.l)(),Object(l.m)("span",{class:"hljs-string"},"'vue'"),Object(l.l)(";\n    "),Object(l.m)("span",{class:"hljs-keyword"},"import"),Object(l.l)(" AInput "),Object(l.m)("span",{class:"hljs-keyword"},"from"),Object(l.l)(),Object(l.m)("span",{class:"hljs-string"},"'@/components/input'"),Object(l.l)(";\n    "),Object(l.m)("span",{class:"hljs-keyword"},"import"),Object(l.l)(" APopper "),Object(l.m)("span",{class:"hljs-keyword"},"from"),Object(l.l)(),Object(l.m)("span",{class:"hljs-string"},"'@/components/popper'"),Object(l.l)(";\n    \n    "),Object(l.m)("span",{class:"hljs-keyword"},"export"),Object(l.l)(),Object(l.m)("span",{class:"hljs-keyword"},"default"),Object(l.l)(" {\n        "),Object(l.m)("span",{class:"hljs-attr"},"components"),Object(l.l)(": { AInput, APopper },\n        setup () {\n            "),Object(l.m)("span",{class:"hljs-keyword"},"return"),Object(l.l)(" {\n                "),Object(l.m)("span",{class:"hljs-attr"},"reference"),Object(l.l)(": ref("),Object(l.m)("span",{class:"hljs-literal"},"null"),Object(l.l)("),\n                "),Object(l.m)("span",{class:"hljs-attr"},"inputValue"),Object(l.l)(": ref("),Object(l.m)("span",{class:"hljs-string"},"''"),Object(l.l)("),\n                "),Object(l.m)("span",{class:"hljs-attr"},"showPopper"),Object(l.l)(": ref("),Object(l.m)("span",{class:"hljs-literal"},"false"),Object(l.l)("),\n            }\n        },\n    };\n")]),Object(l.m)("span",{class:"hljs-tag"},[Object(l.l)("</"),Object(l.m)("span",{class:"hljs-name"},"script"),Object(l.l)(">")]),Object(l.l)("\n")])],-1),b=Object(l.k)("<h2>属性</h2><table><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>可选值</th><th>默认值</th></tr></thead><tbody><tr><td>value</td><td>是否显示的绑定值</td><td>Boolean</td><td>[true, false]</td><td>false</td></tr><tr><td>reference</td><td>reference Dom</td><td>Object</td><td>-</td><td>-</td></tr></tbody></table>",2);var p=s(1),r=s(8),O=s(9),h={components:{AInput:r.a,APopper:O.a},setup:function(){return{reference:Object(p.h)(null),inputValue:Object(p.h)(""),showPopper:Object(p.h)(!1)}},render:function(e,t){var s=Object(l.B)("AInput"),p=Object(l.B)("APopper");return Object(l.v)(),Object(l.g)("section",null,[c,a,Object(l.m)("div",null,[Object(l.m)(s,{ref:"reference",round:"",placeholder:"focus 出现浮层",modelValue:e.inputValue,"onUpdate:modelValue":t[1]||(t[1]=function(t){return e.inputValue=t}),onFocus:t[2]||(t[2]=function(t){return e.showPopper=!0}),onBlur:t[3]||(t[3]=function(t){return e.showPopper=!1})},null,8,["modelValue"]),Object(l.m)(p,{value:e.showPopper,reference:e.reference},{default:Object(l.J)((function(){return[Object(l.m)("div",j," 表单输入值："+Object(l.E)(e.inputValue),1)]})),_:1},8,["value","reference"])]),n,b])}};t.default=h}}]);