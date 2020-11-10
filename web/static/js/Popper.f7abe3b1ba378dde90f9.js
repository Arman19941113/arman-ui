(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{48:function(e,t,s){"use strict";s.r(t);var c=s(1),a=Object(c.i)("h1",null,"Popper 浮层",-1),j=Object(c.i)("h2",null,"基本使用",-1),n={style:{width:"240px",height:"100px",padding:"16px",border:"1px solid #DCDFE6","border-radius":"2px","background-color":"#FFF"}},l=Object(c.i)("pre",null,[Object(c.i)("code",{"v-pre":"",class:"language-html"},[Object(c.i)("span",{class:"hljs-tag"},[Object(c.h)("<"),Object(c.i)("span",{class:"hljs-name"},"template"),Object(c.h)(">")]),Object(c.h)("\n    "),Object(c.i)("span",{class:"hljs-tag"},[Object(c.h)("<"),Object(c.i)("span",{class:"hljs-name"},"AInput"),Object(c.h)(),Object(c.i)("span",{class:"hljs-attr"},"ref"),Object(c.h)("="),Object(c.i)("span",{class:"hljs-string"},'"reference"'),Object(c.h)(),Object(c.i)("span",{class:"hljs-attr"},"round"),Object(c.h)(),Object(c.i)("span",{class:"hljs-attr"},"placeholder"),Object(c.h)("="),Object(c.i)("span",{class:"hljs-string"},'"focus 出现浮层"'),Object(c.h)(),Object(c.i)("span",{class:"hljs-attr"},"v-model"),Object(c.h)("="),Object(c.i)("span",{class:"hljs-string"},'"inputValue"'),Object(c.h)(),Object(c.i)("span",{class:"hljs-attr"},"@focus"),Object(c.h)("="),Object(c.i)("span",{class:"hljs-string"},'"showPopper = true"'),Object(c.h)(),Object(c.i)("span",{class:"hljs-attr"},"@blur"),Object(c.h)("="),Object(c.i)("span",{class:"hljs-string"},'"showPopper = false"'),Object(c.h)(">")]),Object(c.i)("span",{class:"hljs-tag"},[Object(c.h)("</"),Object(c.i)("span",{class:"hljs-name"},"AInput"),Object(c.h)(">")]),Object(c.h)("\n    "),Object(c.i)("span",{class:"hljs-tag"},[Object(c.h)("<"),Object(c.i)("span",{class:"hljs-name"},"APopper"),Object(c.h)(),Object(c.i)("span",{class:"hljs-attr"},":value"),Object(c.h)("="),Object(c.i)("span",{class:"hljs-string"},'"showPopper"'),Object(c.h)(),Object(c.i)("span",{class:"hljs-attr"},":reference"),Object(c.h)("="),Object(c.i)("span",{class:"hljs-string"},'"reference"'),Object(c.h)(">")]),Object(c.h)("\n        "),Object(c.i)("span",{class:"hljs-tag"},[Object(c.h)("<"),Object(c.i)("span",{class:"hljs-name"},"div"),Object(c.h)(),Object(c.i)("span",{class:"hljs-attr"},"style"),Object(c.h)("="),Object(c.i)("span",{class:"hljs-string"},'"width: 240px;height: 100px;padding: 16px;border: 1px solid #DCDFE6;border-radius: 2px;background-color: #FFF;"'),Object(c.h)(">")]),Object(c.h)("\n            表单输入值：{{inputValue}}\n        "),Object(c.i)("span",{class:"hljs-tag"},[Object(c.h)("</"),Object(c.i)("span",{class:"hljs-name"},"div"),Object(c.h)(">")]),Object(c.h)("\n    "),Object(c.i)("span",{class:"hljs-tag"},[Object(c.h)("</"),Object(c.i)("span",{class:"hljs-name"},"APopper"),Object(c.h)(">")]),Object(c.h)("\n"),Object(c.i)("span",{class:"hljs-tag"},[Object(c.h)("</"),Object(c.i)("span",{class:"hljs-name"},"template"),Object(c.h)(">")]),Object(c.h)("\n\n"),Object(c.i)("span",{class:"hljs-tag"},[Object(c.h)("<"),Object(c.i)("span",{class:"hljs-name"},"script"),Object(c.h)(">")]),Object(c.i)("span",{class:"javascript"},[Object(c.h)("\n    "),Object(c.i)("span",{class:"hljs-keyword"},"import"),Object(c.h)(" { ref } "),Object(c.i)("span",{class:"hljs-keyword"},"from"),Object(c.h)(),Object(c.i)("span",{class:"hljs-string"},"'vue'"),Object(c.h)(";\n    "),Object(c.i)("span",{class:"hljs-keyword"},"import"),Object(c.h)(" AInput "),Object(c.i)("span",{class:"hljs-keyword"},"from"),Object(c.h)(),Object(c.i)("span",{class:"hljs-string"},"'@/components/input'"),Object(c.h)(";\n    "),Object(c.i)("span",{class:"hljs-keyword"},"import"),Object(c.h)(" APopper "),Object(c.i)("span",{class:"hljs-keyword"},"from"),Object(c.h)(),Object(c.i)("span",{class:"hljs-string"},"'@/components/popper'"),Object(c.h)(";\n    \n    "),Object(c.i)("span",{class:"hljs-keyword"},"export"),Object(c.h)(),Object(c.i)("span",{class:"hljs-keyword"},"default"),Object(c.h)(" {\n        "),Object(c.i)("span",{class:"hljs-attr"},"components"),Object(c.h)(": { AInput, APopper },\n        setup () {\n            "),Object(c.i)("span",{class:"hljs-keyword"},"return"),Object(c.h)(" {\n                "),Object(c.i)("span",{class:"hljs-attr"},"reference"),Object(c.h)(": ref("),Object(c.i)("span",{class:"hljs-literal"},"null"),Object(c.h)("),\n                "),Object(c.i)("span",{class:"hljs-attr"},"inputValue"),Object(c.h)(": ref("),Object(c.i)("span",{class:"hljs-string"},"''"),Object(c.h)("),\n                "),Object(c.i)("span",{class:"hljs-attr"},"showPopper"),Object(c.h)(": ref("),Object(c.i)("span",{class:"hljs-literal"},"false"),Object(c.h)("),\n            }\n        },\n    };\n")]),Object(c.i)("span",{class:"hljs-tag"},[Object(c.h)("</"),Object(c.i)("span",{class:"hljs-name"},"script"),Object(c.h)(">")]),Object(c.h)("\n")])],-1),h=Object(c.g)("<h2>属性</h2><table><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>可选值</th><th>默认值</th></tr></thead><tbody><tr><td>value</td><td>是否显示的绑定值</td><td>Boolean</td><td>[true, false]</td><td>false</td></tr><tr><td>reference</td><td>reference Dom</td><td>Object</td><td>-</td><td>-</td></tr></tbody></table>",2);var b=s(14),r=s(15),p={components:{AInput:b.a,APopper:r.a},setup:function(){return{reference:Object(c.w)(null),inputValue:Object(c.w)(""),showPopper:Object(c.w)(!1)}},render:function(e,t){var s=Object(c.z)("AInput"),b=Object(c.z)("APopper");return Object(c.r)(),Object(c.e)("section",null,[a,j,Object(c.i)("div",null,[Object(c.i)(s,{ref:"reference",round:"",placeholder:"focus 出现浮层",modelValue:e.inputValue,"onUpdate:modelValue":t[1]||(t[1]=function(t){return e.inputValue=t}),onFocus:t[2]||(t[2]=function(t){return e.showPopper=!0}),onBlur:t[3]||(t[3]=function(t){return e.showPopper=!1})},null,8,["modelValue"]),Object(c.i)(b,{value:e.showPopper,reference:e.reference},{default:Object(c.H)((function(){return[Object(c.i)("div",n," 表单输入值："+Object(c.B)(e.inputValue),1)]})),_:1},8,["value","reference"])]),l,h])}};t.default=p}}]);