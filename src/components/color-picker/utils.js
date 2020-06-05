import tinycolor from 'tinycolor2'

/**
 * 返回含透明度的tinycolor，如果参数不合法会返回黑色#000相关信息
 * @param {String | Object} colorParam 色值信息
 * @param {Number} alpha colorParam 是否自带的透明度
 * @return {Object} tinycolor标准化的色值对象
 */
function setAlpha (colorParam, alpha) {
    const tinyColor = tinycolor(colorParam)
    const { _a } = tinyColor

    if (_a === undefined || _a === null) {
        tinyColor.setAlpha(alpha)
    }

    return tinyColor
}

/**
 * 用tinycolor转换色值
 * @param {String | Object} colorParam 色值信息
 * @return {Object} tinycolor标准化的色值对象
 */
function getTinyColor (colorParam) {
    const alpha = colorParam.a || 1

    // hsl is better than hex between conversions
    if (colorParam.hsl) {
        return setAlpha(colorParam.hsl, alpha)
    }

    if (colorParam.hex && colorParam.hex.length > 0) {
        return setAlpha(colorParam.hex, alpha)
    }

    return setAlpha(colorParam, alpha)
}

/**
 * 根据饱和度面板、色值面板或普通色值标准化颜色信息
 * @param {String | Object} colorParam 色值信息
 * @return {Object} 标准化的色值对象
 */
export function formatColor (colorParam) {
    if (colorParam === '') {
        colorParam = '#FFFFFF'
    }
    const tinyColor = getTinyColor(colorParam)
    const hsl = tinyColor.toHsl()
    const hsv = tinyColor.toHsv()

    if (hsl.s === 0) {
        hsl.h = colorParam.h || (colorParam.hsl && colorParam.hsl.h) || 0
        hsv.h = hsl.h
    }

    // when the hsv.v is less than 0.0164 (base on test)
    // because of possible loss of precision
    // the result of hue and saturation would be miscalculated
    if (hsv.v < 0.0164) {
        hsv.h = colorParam.h || (colorParam.hsv && colorParam.hsv.h) || 0
        hsv.s = colorParam.s || (colorParam.hsv && colorParam.hsv.s) || 0
    }

    if (hsl.l < 0.01) {
        hsl.h = colorParam.h || (colorParam.hsl && colorParam.hsl.h) || 0
        hsl.s = colorParam.s || (colorParam.hsl && colorParam.hsl.s) || 0
    }

    return {
        hsl,
        hex: tinyColor.toHexString().toUpperCase(),
        rgba: tinyColor.toRgb(),
        hsv,
        oldHue: colorParam.h || hsl.h,
        source: colorParam.source,
        a: colorParam.a || tinyColor.getAlpha()
    }
}

/**
 * 返回指定闭区间数值
 * @param {Number} value
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 */
export function clamp (value, min, max) {
    if (value < min) {
        return min
    }

    if (value > max) {
        return max
    }

    return value
}

/**
 * 移动端获取事件位置
 * @param {Object} e
 * @param {String} prop
 * @return {Number}
 */
export function getTouches (e, prop) {
    return e.touches ? e.touches[0][prop] : 0
}

/**
 * 标准化 rgba 色值字符串
 * @param {Object} rgba
 * @return {String}
 */
export function toRGBAString (rgba) {
    const { r, g, b, a } = rgba

    return `rgba(${[r, g, b, a].join(',')})`
}
