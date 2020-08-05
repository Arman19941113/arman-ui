import { computed, ref, resolveComponent, openBlock, createBlock, createVNode, createCommentVNode, renderSlot, toDisplayString } from 'vue';
import AIcon from 'arman-ui/lib/icon';

var script = {
  name: 'AButton',
  components: {
    AIcon: AIcon
  },
  props: {
    theme: {
      type: String,
      "default": 'default',
      validator: function validator(value) {
        if (['default', 'primary', 'success', 'warning', 'danger'].includes(value)) {
          return true;
        } else {
          console.error("theme property is not valid: '".concat(value, "'"));
          return false;
        }
      }
    },
    leftIcon: {
      type: String,
      "default": ''
    },
    rightIcon: {
      type: String,
      "default": ''
    },
    loading: {
      type: Boolean,
      "default": false
    },
    loadingText: {
      type: String,
      "default": ''
    },
    round: {
      type: Boolean,
      "default": false
    },
    disabled: {
      type: Boolean,
      "default": false
    }
  },
  setup: function setup(props, context) {
    var _useClickButton = useClickButton(),
        isClicked = _useClickButton.isClicked,
        handleClick = _useClickButton.handleClick;
    var hasSlots = computed(function () {
      return Boolean(context.slots["default"]);
    });
    return {
      isClicked: isClicked,
      handleClick: handleClick,
      hasSlots: hasSlots
    };
  }
};
function useClickButton() {
  var isClicked = ref(false);
  function handleClick() {
    isClicked.value = true;
    setTimeout(function () {
      isClicked.value = false;
    }, 300);
  }
  return {
    isClicked: isClicked,
    handleClick: handleClick
  };
}

const _hoisted_1 = {
  key: 0,
  class: "a-button-loading"
};
const _hoisted_2 = {
  key: 0,
  class: "loading-text"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_AIcon = resolveComponent("AIcon");

  return (openBlock(), createBlock("button", {
    class: ['a-button', 'a-button-' + _ctx.theme, _ctx.isClicked && 'isClicked', _ctx.loading && 'is-loading', _ctx.round && 'is-round'],
    style: { padding: !_ctx.hasSlots && '0 7px' },
    disabled: _ctx.disabled,
    onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.handleClick(...args)))
  }, [
    createVNode("div", {
      class: "a-button-content",
      style: { visibility: _ctx.loading ? 'hidden' : 'inherit' }
    }, [
      (_ctx.leftIcon)
        ? createVNode(_component_AIcon, {
            key: 0,
            name: _ctx.leftIcon,
            width: "16",
            class: "button-icon"
          }, null, 8 /* PROPS */, ["name"])
        : createCommentVNode("v-if", true),
      createVNode("span", {
        class: "button-text",
        style: { 'margin-left': _ctx.leftIcon && _ctx.hasSlots && '5px', 'margin-right': _ctx.rightIcon && _ctx.hasSlots && '5px' }
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 4 /* STYLE */),
      (_ctx.rightIcon)
        ? createVNode(_component_AIcon, {
            key: 1,
            name: _ctx.rightIcon,
            width: "16",
            class: "button-icon"
          }, null, 8 /* PROPS */, ["name"])
        : createCommentVNode("v-if", true)
    ], 4 /* STYLE */),
    (_ctx.loading)
      ? (openBlock(), createBlock("div", _hoisted_1, [
          createVNode(_component_AIcon, {
            name: "loading",
            width: "20",
            color: _ctx.theme === 'default' ? '' : '#FFF',
            class: "loading-icon"
          }, null, 8 /* PROPS */, ["color"]),
          (_ctx.loadingText)
            ? (openBlock(), createBlock("span", _hoisted_2, toDisplayString(_ctx.loadingText), 1 /* TEXT */))
            : createCommentVNode("v-if", true)
        ]))
      : createCommentVNode("v-if", true)
  ], 14 /* CLASS, STYLE, PROPS */, ["disabled"]))
}

script.render = render;
script.__file = "src/components/button/button.vue";

export default script;
