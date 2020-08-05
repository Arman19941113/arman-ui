import { ref, onMounted, watchEffect, openBlock, createBlock, withModifiers, createVNode, Transition, withCtx, withDirectives, renderSlot, vShow } from 'vue';
import { createPopper } from '@popperjs/core';

var defaultManager = {
  stack: 2000,
  nextStack: function nextStack() {
    return ++this.stack;
  }
};
var stackManager = window['__STACK_MANAGER__'] || (window['__STACK_MANAGER__'] = defaultManager);

var script = {
  name: 'APopper',
  props: {
    value: {
      type: Boolean,
      "default": false
    },
    reference: {
      required: true
    }
  },
  setup: function setup(props) {
    var zIndex = ref(0);
    var popper = ref(null);
    var showPopper = ref(props.value);
    onMounted(function () {
      var popperInstance = null;
      var isRendering = false;
      var queue = [];
      watchEffect(function () {
        if (props.value === false) {
          if (isRendering) {
            queue.push('close');
            return;
          }
          handleClose();
        } else if (props.value === true) {
          if (isRendering) {
            queue.push('open');
            return;
          }
          handleOpen();
        }
      });
      function viewQueue() {
        if (!queue.length) return;
        var lastTask = queue[queue.length - 1];
        if (lastTask === 'close') handleClose();else if (lastTask === 'open') handleOpen();
        queue.splice(0);
      }
      function handleClose() {
        if (popperInstance !== null) {
          isRendering = true;
          showPopper.value = false;
          setTimeout(function () {
            popperInstance.destroy();
            popperInstance = null;
            isRendering = false;
            viewQueue();
          }, 220);
        }
      }
      function handleOpen() {
        var _props$reference$$el;
        isRendering = true;
        showPopper.value = true;
        var reference = (_props$reference$$el = props.reference.$el) !== null && _props$reference$$el !== void 0 ? _props$reference$$el : props.reference;
        popperInstance = createPopper(reference, popper.value, {
          placement: 'bottom-start',
          modifiers: [{
            name: 'offset',
            options: {
              offset: [0, 8]
            }
          }],
          strategy: 'fixed'
        });
        zIndex.value = stackManager.nextStack();
        setTimeout(function () {
          isRendering = false;
          viewQueue();
        }, 220);
      }
    });
    return {
      zIndex: zIndex,
      popper: popper,
      showPopper: showPopper
    };
  }
};

const _hoisted_1 = { class: "a-popper-container" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div", {
    ref: "popper",
    class: "a-popper",
    style: { zIndex: _ctx.zIndex },
    onClick: _cache[1] || (_cache[1] = withModifiers(() => {}, ["stop"]))
  }, [
    createVNode(Transition, { name: "drop" }, {
      default: withCtx(() => [
        withDirectives(createVNode("div", _hoisted_1, [
          renderSlot(_ctx.$slots, "default")
        ], 512 /* NEED_PATCH */), [
          [vShow, _ctx.showPopper]
        ])
      ]),
      _: 3
    })
  ], 4 /* STYLE */))
}

script.render = render;
script.__file = "src/components/popper/popper.vue";

export default script;
