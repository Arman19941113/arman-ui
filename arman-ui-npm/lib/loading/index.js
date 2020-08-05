import { ref, watch, onMounted, computed, openBlock, createBlock, Transition, withCtx, withDirectives, createVNode, withModifiers, createCommentVNode, toDisplayString, vShow } from 'vue';

var defaultManager = {
  stack: 2000,
  nextStack: function nextStack() {
    return ++this.stack;
  }
};
var stackManager = window['__STACK_MANAGER__'] || (window['__STACK_MANAGER__'] = defaultManager);

var script = {
  name: 'ALoading',
  props: {
    value: {
      type: Boolean,
      "default": false
    },
    type: {
      type: String,
      "default": 'default',
      validator: function validator(value) {
        if (['default', 'linear', 'wave', 'dots'].includes(value)) {
          return true;
        } else {
          console.error("type property is not valid: '".concat(value, "'"));
          return false;
        }
      }
    },
    width: {
      type: [Number, String],
      "default": 40
    },
    global: {
      type: Boolean,
      "default": false
    },
    background: {
      type: String,
      "default": 'rgba(255, 255, 255, .8)'
    },
    text: {
      type: String,
      "default": ''
    }
  },
  setup: function setup(props) {
    var root = ref(null);
    var zIndex = ref(0);
    watch(function () {
      return props.value;
    }, function (val) {
      if (val) zIndex.value = stackManager.nextStack();
    }, {
      immediate: true
    });
    onMounted(function () {
      var parentNode = root.value.parentNode;
      if (getComputedStyle(parentNode).position === 'static') {
        parentNode.style.position = 'relative';
      }
    });
    return {
      root: root,
      zIndex: zIndex,
      computedSize: computed(function () {
        return {
          width: props.width + 'px',
          height: props.width + 'px'
        };
      }),
      computedSizeHalf: computed(function () {
        return {
          width: props.width / 2 + 'px',
          height: props.width / 2 + 'px'
        };
      })
    };
  }
};

const _hoisted_1 = /*#__PURE__*/createVNode("circle", {
  cx: "32",
  cy: "32",
  r: "29",
  fill: "none",
  stroke: "#409EFF",
  "stroke-width": "6",
  "stroke-linecap": "round"
}, null, -1 /* HOISTED */);
const _hoisted_2 = /*#__PURE__*/createVNode("circle", {
  cx: "32",
  cy: "32",
  r: "29",
  fill: "none",
  stroke: "#409EFF",
  "stroke-width": "6",
  "stroke-linecap": "round",
  "stroke-dasharray": "60,200"
}, [
  /*#__PURE__*/createVNode("animateTransform", {
    attributeName: "transform",
    type: "rotate",
    begin: "0s",
    dur: "1s",
    from: "0 32 32",
    to: "360 32 32",
    repeatCount: "indefinite"
  })
], -1 /* HOISTED */);
const _hoisted_3 = {
  key: 4,
  class: "a-loading-text"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(Transition, { name: "fade" }, {
    default: withCtx(() => [
      withDirectives(createVNode("div", {
        ref: "root",
        class: "a-loading",
        style: { position: _ctx.global && 'fixed', zIndex: _ctx.zIndex, background: _ctx.background },
        onClick: _cache[1] || (_cache[1] = withModifiers(() => {}, ["stop"]))
      }, [
        createCommentVNode(" 变化圆弧 "),
        (_ctx.type === 'default')
          ? (openBlock(), createBlock("svg", {
              key: 0,
              style: _ctx.computedSize,
              class: "flex-loading",
              viewBox: "0 0 64 64",
              xmlns: "http://www.w3.org/2000/svg"
            }, [
              _hoisted_1
            ], 4 /* STYLE */))
          : createCommentVNode("v-if", true),
        createCommentVNode(" 普通圆弧 "),
        (_ctx.type === 'linear')
          ? (openBlock(), createBlock("svg", {
              key: 1,
              style: _ctx.computedSize,
              viewBox: "0 0 64 64",
              xmlns: "http://www.w3.org/2000/svg"
            }, [
              _hoisted_2
            ], 4 /* STYLE */))
          : createCommentVNode("v-if", true),
        createCommentVNode(" 扩散圆圈 "),
        (_ctx.type === 'wave')
          ? (openBlock(), createBlock("div", {
              key: 2,
              style: _ctx.computedSize,
              class: "wave-loading"
            }, null, 4 /* STYLE */))
          : createCommentVNode("v-if", true),
        createCommentVNode(" 四点旋转 "),
        (_ctx.type === 'dots')
          ? (openBlock(), createBlock("div", {
              key: 3,
              style: _ctx.computedSize,
              class: "dots-loading"
            }, [
              createVNode("div", {
                class: "dots-loading-item",
                style: _ctx.computedSizeHalf
              }, null, 4 /* STYLE */),
              createVNode("div", {
                class: "dots-loading-item",
                style: _ctx.computedSizeHalf
              }, null, 4 /* STYLE */),
              createVNode("div", {
                class: "dots-loading-item",
                style: _ctx.computedSizeHalf
              }, null, 4 /* STYLE */),
              createVNode("div", {
                class: "dots-loading-item",
                style: _ctx.computedSizeHalf
              }, null, 4 /* STYLE */)
            ], 4 /* STYLE */))
          : createCommentVNode("v-if", true),
        (_ctx.text)
          ? (openBlock(), createBlock("div", _hoisted_3, toDisplayString(_ctx.text), 1 /* TEXT */))
          : createCommentVNode("v-if", true)
      ], 4 /* STYLE */), [
        [vShow, _ctx.value]
      ])
    ]),
    _: 1
  }))
}

script.render = render;
script.__file = "src/components/loading/loading.vue";

export default script;
