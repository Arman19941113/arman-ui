interface Input {
    name: 'AInput'
    props: {
        modelValue?: string
        type?: 'text' | 'number'
        placeholder?: string
        rightIcon?: string
        disabled?: boolean
        round?: boolean
    }
}

export const Input: Input
