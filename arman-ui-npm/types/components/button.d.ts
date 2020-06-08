type ButtonTheme = 'primary' | 'success' | 'warning' | 'danger' | 'default'

interface Button {
    name: 'AButton'
    props: {
        theme?: ButtonTheme
        leftIcon?: string
        rightIcon?: string
        loading?: boolean
        loadingText?: string
        round?: boolean
        disabled?: boolean
    }
}

export const Button: Button
