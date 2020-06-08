interface ColorPicker {
    name: 'AColorPicker'
    props: {
        modelValue?: string
        size?: '' | 'large' | 'small'
        showValue?: boolean
        recommend?: boolean | string[]
    }
}

export const ColorPicker: ColorPicker
