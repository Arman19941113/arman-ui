import AIcon from 'arman-ui/lib/icon';
import { resolveComponent, openBlock, createBlock, createVNode, createCommentVNode } from 'vue';

var script = {
  name: 'AInput',
  components: {
    AIcon: AIcon
  },
  props: {
    type: {
      type: String,
      "default": 'text',
      validator: function validator(val) {
        return ['text', 'number'].includes(val);
      }
    },
    modelValue: {
      type: [String, Number],
      "default": ''
    },
    placeholder: {
      type: String,
      "default": '请输入'
    },
    rightIcon: {
      type: String,
      "default": ''
    },
    disabled: {
      type: Boolean,
      "default": false
    },
    round: {
      type: Boolean,
      "default": false
    }
  }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_AIcon = resolveComponent("AIcon");

  return (openBlock(), createBlock("div", {
    class: ['a-input', _ctx.rightIcon && 'has-right-icon']
  }, [
    createVNode("input", {
      type: _ctx.type,
      class: ['a-input-box', _ctx.round && 'round'],
      value: _ctx.modelValue,
      disabled: _ctx.disabled,
      placeholder: _ctx.placeholder,
      onBlur: _cache[1] || (_cache[1] = $event => (_ctx.$emit('blur', $event))),
      onFocus: _cache[2] || (_cache[2] = $event => (_ctx.$emit('focus', $event))),
      onInput: _cache[3] || (_cache[3] = $event => (_ctx.$emit('update:modelValue', $event.target.value)))
    }, null, 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["type", "value", "disabled", "placeholder"]),
    (_ctx.rightIcon)
      ? createVNode(_component_AIcon, {
          key: 0,
          name: _ctx.rightIcon,
          width: "16",
          class: "right-icon"
        }, null, 8 /* PROPS */, ["name"])
      : createCommentVNode("v-if", true)
  ], 2 /* CLASS */))
}

script.render = render;
script.__file = "src/components/input/input.vue";

export default script;
