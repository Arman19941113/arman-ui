import { ref, computed, openBlock, createBlock, withModifiers, createCommentVNode, createVNode, withKeys, toDisplayString, reactive, watch, resolveComponent, nextTick, Fragment, renderList, withDirectives, vShow, onMounted, onUnmounted, withCtx } from 'vue';
import AIcon from 'arman-ui/lib/icon';
import APopper from 'arman-ui/lib/popper';
import tinycolor from 'tinycolor2';

function setAlpha(colorParam, alpha) {
  var tinyColor = tinycolor(colorParam);
  var _a = tinyColor._a;
  if (_a === undefined || _a === null) {
    tinyColor.setAlpha(alpha);
  }
  return tinyColor;
}
function getTinyColor(colorParam) {
  var alpha = colorParam.a || 1;
  if (colorParam.hsl) {
    return setAlpha(colorParam.hsl, alpha);
  }
  if (colorParam.hex && colorParam.hex.length > 0) {
    return setAlpha(colorParam.hex, alpha);
  }
  return setAlpha(colorParam, alpha);
}
function formatColor(colorParam) {
  if (colorParam === '') {
    colorParam = '#FFFFFF';
  }
  var tinyColor = getTinyColor(colorParam);
  var hsl = tinyColor.toHsl();
  var hsv = tinyColor.toHsv();
  if (hsl.s === 0) {
    hsl.h = colorParam.h || colorParam.hsl && colorParam.hsl.h || 0;
    hsv.h = hsl.h;
  }
  if (hsv.v < 0.0164) {
    hsv.h = colorParam.h || colorParam.hsv && colorParam.hsv.h || 0;
    hsv.s = colorParam.s || colorParam.hsv && colorParam.hsv.s || 0;
  }
  if (hsl.l < 0.01) {
    hsl.h = colorParam.h || colorParam.hsl && colorParam.hsl.h || 0;
    hsl.s = colorParam.s || colorParam.hsl && colorParam.hsl.s || 0;
  }
  return {
    hsl: hsl,
    hex: tinyColor.toHexString().toUpperCase(),
    rgba: tinyColor.toRgb(),
    hsv: hsv,
    oldHue: colorParam.h || hsl.h,
    source: colorParam.source,
    a: colorParam.a || tinyColor.getAlpha()
  };
}
function clamp(value, min, max) {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}
function getTouches(e, prop) {
  return e.touches ? e.touches[0][prop] : 0;
}
function toRGBAString(rgba) {
  var r = rgba.r,
      g = rgba.g,
      b = rgba.b,
      a = rgba.a;
  return "rgba(".concat([r, g, b, a].join(','), ")");
}

var script = {
  name: 'SaturationPanel',
  props: {
    colorObj: {
      type: Object,
      required: true
    }
  },
  setup: function setup(props, context) {
    var container = ref(null);
    var backgroundStyle = computed(function () {
      return {
        background: "hsl(".concat(props.colorObj.hsv.h, ", 100%, 50%)")
      };
    });
    var pointerStyle = computed(function () {
      return {
        top: "".concat((1 - props.colorObj.hsv.v) * 100, "%"),
        left: "".concat(props.colorObj.hsv.s * 100, "%")
      };
    });
    return {
      container: container,
      backgroundStyle: backgroundStyle,
      pointerStyle: pointerStyle,
      handleArrowKeydown: handleArrowKeydown,
      handleMouseDown: handleMouseDown
    };
    function handleArrowKeydown(e) {
      var _container$value = container.value,
          clientWidth = _container$value.clientWidth,
          clientHeight = _container$value.clientHeight;
      var left = props.colorObj.hsv.s * clientWidth;
      var top = (1 - props.colorObj.hsv.v) * clientHeight;
      var step = 10;
      switch (e.code) {
        case 'ArrowLeft':
          left = clamp(left - step, 0, clientWidth);
          break;
        case 'ArrowRight':
          left = clamp(left + step, 0, clientWidth);
          break;
        case 'ArrowUp':
          top = clamp(top - step, 0, clientHeight);
          break;
        case 'ArrowDown':
          top = clamp(top + step, 0, clientHeight);
          break;
        default:
          return;
      }
      handlePointChange(null, left, top);
    }
    function handleMouseDown(e) {
      container.value.focus();
      handlePointChange(e);
      window.addEventListener('mousemove', handlePointChange, {
        passive: true
      });
      window.addEventListener('mouseup', handleMouseUp);
    }
    function handleMouseUp() {
      window.removeEventListener('mousemove', handlePointChange);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    function handlePointChange(e, appointedLeft, appointedTop) {
      var _container$value2 = container.value,
          clientWidth = _container$value2.clientWidth,
          clientHeight = _container$value2.clientHeight;
      var left = appointedLeft !== undefined ? appointedLeft : getLeft(e);
      var top = appointedTop !== undefined ? appointedTop : getTop(e);
      var saturation = left / clientWidth;
      var bright = 1 - top / clientHeight;
      changeColor(props.colorObj.hsv.h, saturation, bright, props.colorObj.hsv.a);
    }
    function getLeft(e) {
      var xOffset = container.value.getBoundingClientRect().left + window.pageXOffset;
      var pageX = e.pageX || getTouches(e, 'PageX');
      return clamp(pageX - xOffset, 0, container.value.clientWidth);
    }
    function getTop(e) {
      var yOffset = container.value.getBoundingClientRect().top + window.pageYOffset;
      var pageY = e.pageY || getTouches(e, 'PageY');
      return clamp(pageY - yOffset, 0, container.value.clientHeight);
    }
    function changeColor(h, s, v, a) {
      context.emit('colorChange', {
        h: h,
        s: s,
        v: v,
        a: a,
        source: 'hsva'
      });
    }
  }
};

const _hoisted_1 = /*#__PURE__*/createVNode("div", { class: "a-color-picker-saturation-white" }, null, -1 /* HOISTED */);
const _hoisted_2 = /*#__PURE__*/createVNode("div", { class: "a-color-picker-saturation-black" }, null, -1 /* HOISTED */);
const _hoisted_3 = /*#__PURE__*/createVNode("div", { class: "a-color-picker-circle" }, null, -1 /* HOISTED */);

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div", {
    ref: "container",
    tabindex: "0",
    class: "a-color-picker-saturation",
    style: _ctx.backgroundStyle,
    onKeydown: _cache[1] || (_cache[1] = (...args) => (_ctx.handleArrowKeydown(...args))),
    onMousedown: _cache[2] || (_cache[2] = withModifiers((...args) => (_ctx.handleMouseDown(...args)), ["stop"]))
  }, [
    createCommentVNode(" 从左到右饱和度 saturation 增大 "),
    _hoisted_1,
    createCommentVNode(" 从上到下明度 lightness 减小 "),
    _hoisted_2,
    createVNode("div", {
      class: "a-color-picker-pointer",
      style: _ctx.pointerStyle
    }, [
      _hoisted_3
    ], 4 /* STYLE */)
  ], 36 /* STYLE, HYDRATE_EVENTS */))
}

script.render = render;
script.__file = "src/components/color-picker/components/saturation-panel.vue";

var script$1 = {
  name: 'HueSlider',
  props: {
    colorObj: {
      type: Object,
      required: true
    }
  },
  setup: function setup(props, context) {
    var container = ref(null);
    var pointerStyle = computed(function () {
      return {
        left: "".concat(props.colorObj.hsv.h / 360 * 100, "%")
      };
    });
    return {
      container: container,
      pointerStyle: pointerStyle,
      handleArrowKeydown: handleArrowKeydown,
      handleMouseDown: handleMouseDown
    };
    function handleArrowKeydown(e) {
      var clientWidth = container.value.clientWidth;
      var left = props.colorObj.hsv.h / 360 * clientWidth;
      var step = 2;
      var hugeStep = 10;
      switch (e.code) {
        case 'ArrowLeft':
          left = clamp(left - step, 0, clientWidth);
          break;
        case 'ArrowRight':
          left = clamp(left + step, 0, clientWidth);
          break;
        case 'ArrowUp':
          left = clamp(left - hugeStep, 0, clientWidth);
          break;
        case 'ArrowDown':
          left = clamp(left + hugeStep, 0, clientWidth);
          break;
        default:
          return;
      }
      handlePointChange(null, left);
    }
    function handleMouseDown(e) {
      container.value.focus();
      handlePointChange(e);
      window.addEventListener('mousemove', handlePointChange, {
        passive: true
      });
      window.addEventListener('mouseup', handleMouseUp);
    }
    function handleMouseUp() {
      window.removeEventListener('mousemove', handlePointChange);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    function handlePointChange(e, appointedLeft) {
      var left = appointedLeft !== undefined ? appointedLeft : getLeft(e);
      changeColor(left / container.value.clientWidth);
    }
    function getLeft(e) {
      var xOffset = container.value.getBoundingClientRect().left + window.pageXOffset;
      var pageX = e.pageX || getTouches(e, 'PageX');
      return clamp(pageX - xOffset, 0, container.value.clientWidth);
    }
    function changeColor(ratio) {
      var _props$colorObj$hsl = props.colorObj.hsl,
          h = _props$colorObj$hsl.h,
          s = _props$colorObj$hsl.s,
          l = _props$colorObj$hsl.l,
          a = _props$colorObj$hsl.a;
      var newHue = ratio * 360;
      if (h !== newHue) {
        context.emit('colorChange', {
          h: newHue,
          s: s,
          l: l,
          a: a,
          source: 'hsl'
        });
      }
    }
  }
};

const _hoisted_1$1 = /*#__PURE__*/createVNode("div", { class: "a-color-picker-hue-rectangle" }, null, -1 /* HOISTED */);

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div", {
    ref: "container",
    tabindex: "0",
    class: "a-color-picker-hue",
    onKeydown: _cache[1] || (_cache[1] = (...args) => (_ctx.handleArrowKeydown(...args))),
    onMousedown: _cache[2] || (_cache[2] = withModifiers((...args) => (_ctx.handleMouseDown(...args)), ["stop"]))
  }, [
    createVNode("div", {
      class: "a-color-picker-hue-pointer",
      style: _ctx.pointerStyle
    }, [
      _hoisted_1$1
    ], 4 /* STYLE */)
  ], 544 /* HYDRATE_EVENTS, NEED_PATCH */))
}

script$1.render = render$1;
script$1.__file = "src/components/color-picker/components/hue-slider.vue";

var script$2 = {
  name: 'InputContainer',
  props: {
    colorInfo: {
      type: Object,
      required: true
    }
  },
  setup: function setup(props, context) {
    return {
      handleTab: handleTab,
      handleInput: handleInput
    };
    function handleTab() {
      if (props.colorInfo.key === 'a') {
        context.emit('tab');
      }
    }
    function handleInput(e) {
      var key = props.colorInfo.key;
      var value = e.target.value;
      context.emit('inputChange', {
        key: key,
        value: value
      });
    }
  }
};

const _hoisted_1$2 = { class: "a-color-picker-input-part" };
const _hoisted_2$1 = { class: "a-color-picker-input-text" };

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div", _hoisted_1$2, [
    createVNode("input", {
      type: _ctx.colorInfo.name === 'HEX' ? 'text' : 'number',
      class: ['a-color-picker-input-value', _ctx.colorInfo.error && 'error'],
      value: _ctx.colorInfo.value,
      onKeydown: _cache[1] || (_cache[1] = withKeys((...args) => (_ctx.handleTab(...args)), ["native","tab"])),
      onInput: _cache[2] || (_cache[2] = (...args) => (_ctx.handleInput(...args)))
    }, null, 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["type", "value"]),
    createVNode("span", _hoisted_2$1, toDisplayString(_ctx.colorInfo.name), 1 /* TEXT */)
  ]))
}

script$2.render = render$2;
script$2.__file = "src/components/color-picker/components/input-container.vue";

var script$3 = {
  name: 'ColorInput',
  components: {
    InputContainer: script$2
  },
  props: {
    colorObj: {
      type: Object,
      required: true
    }
  },
  setup: function setup(props, context) {
    var colorState = reactive({
      hex: {
        key: 'hex',
        name: 'HEX',
        value: props.colorObj.hex,
        error: false
      },
      r: {
        key: 'r',
        name: 'R',
        value: props.colorObj.rgba.r.toString(),
        error: false
      },
      g: {
        key: 'g',
        name: 'G',
        value: props.colorObj.rgba.g.toString(),
        error: false
      },
      b: {
        key: 'b',
        name: 'B',
        value: props.colorObj.rgba.b.toString(),
        error: false
      },
      a: {
        key: 'a',
        name: 'Alpha',
        value: props.colorObj.rgba.a.toString(),
        error: false
      }
    });
    watch(function () {
      return props.colorObj;
    }, function (val) {
      if (tinycolor(val.hex).toString() !== tinycolor(colorState.hex.value).toString()) {
        colorState.hex.value = val.hex;
      }
      colorState.r.value = val.rgba.r.toString();
      colorState.g.value = val.rgba.g.toString();
      colorState.b.value = val.rgba.b.toString();
      colorState.a.value = val.rgba.a.toString();
      validate(colorState);
    });
    return {
      colorState: colorState,
      handleInput: handleInput
    };
    function handleInput(_ref) {
      var key = _ref.key,
          value = _ref.value;
      colorState[key].value = value;
      if (validate(colorState)) {
        var colorStr = key === 'hex' ? colorState.hex.value : "rgba(".concat(colorState.r.value, ", ").concat(colorState.g.value, ", ").concat(colorState.b.value, ", ").concat(colorState.a.value, ")");
        context.emit('colorChange', colorStr);
      }
    }
    function validate(colorState) {
      var result = true;
      var hex = colorState.hex,
          r = colorState.r,
          g = colorState.g,
          b = colorState.b,
          a = colorState.a;
      if (hex.value.startsWith('#') && (hex.value.length === 4 || hex.value.length === 7) && !hex.value.slice(1).match(/[^0-9a-fA-F]/)) {
        hex.error = false;
      } else {
        hex.error = true;
        result = false;
      }
      if (a.value !== '' && a.value >= 0 && a.value <= 1) {
        a.error = false;
      } else {
        a.error = true;
        result = false;
      }
      for (var _i = 0, _arr = [r, g, b]; _i < _arr.length; _i++) {
        var colorInfo = _arr[_i];
        var value = colorInfo.value;
        if (value !== '' && value >= 0 && value <= 255) {
          colorInfo.error = false;
        } else {
          colorInfo.error = true;
          result = false;
        }
      }
      return result;
    }
  }
};

const _hoisted_1$3 = { class: "a-color-picker-input" };
const _hoisted_2$2 = { class: "a-color-picker-input-hex" };
const _hoisted_3$1 = { class: "a-color-picker-input-rgba" };

function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_InputContainer = resolveComponent("InputContainer");

  return (openBlock(), createBlock("div", _hoisted_1$3, [
    createVNode("div", _hoisted_2$2, [
      createVNode(_component_InputContainer, {
        "color-info": _ctx.colorState.hex,
        onInputChange: _ctx.handleInput
      }, null, 8 /* PROPS */, ["color-info", "onInputChange"])
    ]),
    createVNode("div", _hoisted_3$1, [
      createVNode(_component_InputContainer, {
        "color-info": _ctx.colorState.r,
        onInputChange: _ctx.handleInput
      }, null, 8 /* PROPS */, ["color-info", "onInputChange"]),
      createVNode(_component_InputContainer, {
        "color-info": _ctx.colorState.g,
        onInputChange: _ctx.handleInput
      }, null, 8 /* PROPS */, ["color-info", "onInputChange"]),
      createVNode(_component_InputContainer, {
        "color-info": _ctx.colorState.b,
        onInputChange: _ctx.handleInput
      }, null, 8 /* PROPS */, ["color-info", "onInputChange"]),
      createVNode(_component_InputContainer, {
        "color-info": _ctx.colorState.a,
        onInputChange: _ctx.handleInput,
        onTab: _cache[1] || (_cache[1] = $event => (_ctx.$emit('tab')))
      }, null, 8 /* PROPS */, ["color-info", "onInputChange"])
    ])
  ]))
}

script$3.render = render$3;
script$3.__file = "src/components/color-picker/components/color-input.vue";

var script$4 = {
  name: 'RecommendColors',
  props: {
    colorObj: {
      type: Object,
      required: true
    },
    recommend: {
      type: [Boolean, Array],
      "default": true
    }
  },
  setup: function setup(props, context) {
    var colors = computed(function () {
      return getColorsFromRecommend(props.recommend);
    });
    var selectedIndex = ref(-1);
    var selectedColor = ref(null);
    watch(function () {
      return props.colorObj;
    }, function () {
      selectedIndex.value = -1;
      selectedColor.value = null;
    });
    return {
      isFocused: ref(false),
      colors: colors,
      selectedIndex: selectedIndex,
      selectedColor: selectedColor,
      selectColor: selectColor,
      handleKeydown: handleKeydown
    };
    function handleKeydown(e) {
      if (e.code === 'Tab') {
        context.emit('tab');
      } else {
        var index = 0;
        var rowNum = 10;
        var max = colors.value.length - 1;
        switch (e.code) {
          case 'ArrowLeft':
            index = clamp(selectedIndex.value - 1, 0, max);
            break;
          case 'ArrowRight':
            index = clamp(selectedIndex.value + 1, 0, max);
            break;
          case 'ArrowUp':
            index = clamp(selectedIndex.value - rowNum, 0, max);
            break;
          case 'ArrowDown':
            index = clamp(selectedIndex.value + rowNum, 0, max);
            break;
          default:
            return;
        }
        selectColor(index);
      }
    }
    function selectColor(index) {
      var color = colors.value[index];
      context.emit('colorChange', color);
      nextTick(function () {
        selectedIndex.value = index;
        selectedColor.value = color;
      });
    }
    function getColorsFromRecommend(recommend) {
      if (recommend === true) {
        return ['', '#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#ddffff', '#00ced1', '#3a84ff', '#a933f5', '#db7093', '#000000', '#494949', '#9B9B9B', '#ffffff'];
      } else if (Array.isArray(recommend)) {
        return recommend.map(function (color) {
          return tinycolor(color).isValid() ? color : '';
        });
      } else {
        return [];
      }
    }
  }
};

const _hoisted_1$4 = { class: "a-color-picker-pointer" };
const _hoisted_2$3 = /*#__PURE__*/createVNode("div", { class: "a-color-picker-circle" }, null, -1 /* HOISTED */);

function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div", {
    tabindex: "0",
    class: "a-color-picker-recommend",
    onFocus: _cache[1] || (_cache[1] = $event => (_ctx.isFocused = true)),
    onBlur: _cache[2] || (_cache[2] = $event => (_ctx.isFocused = false)),
    onKeydown: _cache[3] || (_cache[3] = (...args) => (_ctx.handleKeydown(...args)))
  }, [
    (openBlock(true), createBlock(Fragment, null, renderList(_ctx.colors, (color, index) => {
      return (openBlock(), createBlock("div", {
        key: color + index,
        style: { background: color || '#fff' },
        class: ['a-color-picker-recommend-color', _ctx.isFocused && _ctx.selectedIndex === index && 'selected', color === '' && 'empty-color'],
        onClick: $event => (_ctx.selectColor(index))
      }, [
        withDirectives(createVNode("div", _hoisted_1$4, [
          _hoisted_2$3
        ], 512 /* NEED_PATCH */), [
          [vShow, _ctx.selectedIndex === index]
        ])
      ], 14 /* CLASS, STYLE, PROPS */, ["onClick"]))
    }), 128 /* KEYED_FRAGMENT */))
  ], 32 /* HYDRATE_EVENTS */))
}

script$4.render = render$4;
script$4.__file = "src/components/color-picker/components/recommend-colors.vue";

var script$5 = {
  name: 'AColorPicker',
  components: {
    AIcon: AIcon,
    APopper: APopper,
    SaturationPanel: script,
    HueSlider: script$1,
    ColorInput: script$3,
    RecommendColors: script$4
  },
  props: {
    modelValue: {
      type: String,
      "default": ''
    },
    size: {
      type: String,
      "default": '',
      validator: function validator(val) {
        return ['', 'large', 'small'].includes(val);
      }
    },
    showValue: {
      type: Boolean,
      "default": true
    },
    recommend: {
      type: [Boolean, Array],
      "default": true
    }
  },
  setup: function setup(props, context) {
    var reference = ref(null);
    var showPopper = ref(false);
    var isRenderRecommend = computed(function () {
      return Boolean(props.recommend === true || Array.isArray(props.recommend) && props.recommend.length);
    });
    var _useColorInfo = useColorInfo(props, context),
        colorStr = _useColorInfo.colorStr,
        colorObj = _useColorInfo.colorObj,
        handleColorChange = _useColorInfo.handleColorChange,
        changeColorFromProps = _useColorInfo.changeColorFromProps;
    changeColorFromProps({
      isCreated: true
    });
    watch(function () {
      return props.modelValue;
    }, function () {
      changeColorFromProps();
    });
    onMounted(function () {
      document.addEventListener('click', handleClickOutside);
    });
    onUnmounted(function () {
      console.log('unmounted!');
      document.removeEventListener('click', handleClickOutside);
    });
    return {
      reference: reference,
      isRenderRecommend: isRenderRecommend,
      showPopper: showPopper,
      colorStr: colorStr,
      colorObj: colorObj,
      togglePopper: togglePopper,
      handleColorChange: handleColorChange,
      handleKeydown: handleKeydown,
      handleTabInput: handleTabInput,
      handleTabRecommend: handleTabRecommend
    };
    function closePopper() {
      showPopper.value = false;
      reference.value.focus();
      changeColorFromProps();
    }
    function openPopper() {
      showPopper.value = true;
      nextTick(function () {
        reference.value.querySelector('.a-color-picker-saturation').focus();
      });
    }
    function togglePopper() {
      showPopper.value ? closePopper() : openPopper();
    }
    function handleClickOutside(e) {
      if (!reference.value.contains(e.target)) {
        showPopper.value && closePopper();
      }
    }
    function handleKeydown(e) {
      if (e.code === 'Enter' || e.code === 'NumpadEnter') {
        togglePopper();
      } else if (e.code === 'Escape') {
        showPopper.value && closePopper();
      }
    }
    function handleTabInput() {
      if (!isRenderRecommend.value) {
        reference.value.focus();
      }
    }
    function handleTabRecommend() {
      reference.value.focus();
    }
  }
};
function useColorInfo(props, context) {
  var colorStr = ref('');
  var colorObj = ref(formatColor('#FFFFFF'));
  var handleColorChange = function handleColorChange(val) {
    if (val === '') {
      colorStr.value = '';
      colorObj.value = formatColor('#FFFFFF');
      context.emit('update:modelValue', '');
      return;
    }
    var obj = formatColor(val);
    var str = obj.rgba.a === 1 ? obj.hex : toRGBAString(obj.rgba);
    colorObj.value = obj;
    colorStr.value = str;
    context.emit('update:modelValue', str);
  };
  var changeColorFromProps = function changeColorFromProps() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$isCreated = _ref.isCreated,
        isCreated = _ref$isCreated === void 0 ? false : _ref$isCreated;
    if (props.modelValue === '') {
      if (colorStr.value !== '') {
        colorStr.value = '';
        colorObj.value = formatColor('#FFFFFF');
      }
      return;
    }
    var newColorObj = formatColor(props.modelValue);
    var newColorStr = newColorObj.rgba.a === 1 ? newColorObj.hex : toRGBAString(newColorObj.rgba);
    if (newColorStr !== colorStr.value) {
      var isValid = tinycolor(props.modelValue).isValid();
      if (isCreated) {
        if (!isValid) {
          colorObj.value = formatColor('#FFFFFF');
          context.emit('update:modelValue', '');
        } else {
          colorStr.value = newColorStr.toLowerCase() === props.modelValue.toLowerCase() ? props.modelValue
          : newColorStr;
          colorObj.value = newColorObj;
        }
      } else {
        if (!isValid) {
          colorStr.value = '';
          colorObj.value = formatColor('#FFFFFF');
        } else if (newColorStr.toLowerCase() !== colorStr.value.toLowerCase()) {
          colorObj.value = newColorObj;
          colorStr.value = newColorStr;
        }
      }
    }
  };
  return {
    colorStr: colorStr,
    colorObj: colorObj,
    handleColorChange: handleColorChange,
    changeColorFromProps: changeColorFromProps
  };
}

const _hoisted_1$5 = { class: "a-color-picker-color" };
const _hoisted_2$4 = {
  key: 0,
  class: "a-color-picker-text"
};
const _hoisted_3$2 = { class: "a-color-picker-icon" };
const _hoisted_4 = { class: "a-color-picker-dropdown" };
const _hoisted_5 = { class: "a-color-picker-saturation-container" };
const _hoisted_6 = { class: "a-color-picker-hue-container" };
const _hoisted_7 = { class: "a-color-picker-input-container" };
const _hoisted_8 = {
  key: 0,
  class: "a-color-picker-recommend-container"
};

function render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_AIcon = resolveComponent("AIcon");
  const _component_SaturationPanel = resolveComponent("SaturationPanel");
  const _component_HueSlider = resolveComponent("HueSlider");
  const _component_ColorInput = resolveComponent("ColorInput");
  const _component_RecommendColors = resolveComponent("RecommendColors");
  const _component_APopper = resolveComponent("APopper");

  return (openBlock(), createBlock("div", {
    ref: "reference",
    tabindex: "0",
    class: ['a-color-picker',`a-color-picker-${_ctx.size}` , _ctx.showPopper && 'active', _ctx.showValue && 'a-color-picker-show-value'],
    onKeydown: _cache[1] || (_cache[1] = (...args) => (_ctx.handleKeydown(...args))),
    onClick: _cache[2] || (_cache[2] = (...args) => (_ctx.togglePopper(...args)))
  }, [
    createVNode("div", _hoisted_1$5, [
      createCommentVNode(" 如果传入的色值为空字符串或者没有传值默认白色背景 + 中间一个叉 "),
      (_ctx.colorStr === '')
        ? createVNode(_component_AIcon, {
            key: 0,
            name: "close-bold",
            class: "a-color-picker-color-square"
          })
        : (openBlock(), createBlock("span", {
            key: 1,
            class: "a-color-picker-color-square",
            style: { background: _ctx.colorStr }
          }, null, 4 /* STYLE */))
    ]),
    (_ctx.showValue)
      ? (openBlock(), createBlock("div", _hoisted_2$4, [
          createVNode("span", null, toDisplayString(_ctx.colorStr), 1 /* TEXT */)
        ]))
      : createCommentVNode("v-if", true),
    createVNode("div", _hoisted_3$2, [
      createVNode(_component_AIcon, {
        name: "odd-arrow",
        class: "icon-odd-arrow"
      })
    ]),
    createVNode(_component_APopper, {
      value: _ctx.showPopper,
      reference: _ctx.reference
    }, {
      default: withCtx(() => [
        createVNode("div", _hoisted_4, [
          createCommentVNode(" 饱和度面板 "),
          createVNode("div", _hoisted_5, [
            createVNode(_component_SaturationPanel, {
              "color-obj": _ctx.colorObj,
              onColorChange: _ctx.handleColorChange
            }, null, 8 /* PROPS */, ["color-obj", "onColorChange"])
          ]),
          createCommentVNode(" 色彩条 "),
          createVNode("div", _hoisted_6, [
            createVNode(_component_HueSlider, {
              "color-obj": _ctx.colorObj,
              onColorChange: _ctx.handleColorChange
            }, null, 8 /* PROPS */, ["color-obj", "onColorChange"])
          ]),
          createCommentVNode(" 色彩值 "),
          createVNode("div", _hoisted_7, [
            createVNode(_component_ColorInput, {
              "color-obj": _ctx.colorObj,
              onTab: _ctx.handleTabInput,
              onColorChange: _ctx.handleColorChange
            }, null, 8 /* PROPS */, ["color-obj", "onTab", "onColorChange"])
          ]),
          createCommentVNode(" 预设值 "),
          (_ctx.isRenderRecommend)
            ? (openBlock(), createBlock("div", _hoisted_8, [
                createVNode(_component_RecommendColors, {
                  "color-obj": _ctx.colorObj,
                  recommend: _ctx.recommend,
                  onTab: _ctx.handleTabRecommend,
                  onColorChange: _ctx.handleColorChange
                }, null, 8 /* PROPS */, ["color-obj", "recommend", "onTab", "onColorChange"])
              ]))
            : createCommentVNode("v-if", true)
        ])
      ]),
      _: 1
    }, 8 /* PROPS */, ["value", "reference"])
  ], 34 /* CLASS, HYDRATE_EVENTS */))
}

script$5.render = render$5;
script$5.__file = "src/components/color-picker/color-picker.vue";

export default script$5;
