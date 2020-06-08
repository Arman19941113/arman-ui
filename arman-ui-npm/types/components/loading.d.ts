type LoadingType = 'linear' | 'wave' | 'dots' | 'default'

interface Loading {
    name: 'ALoading'
    props: {
        value?: boolean
        type?: LoadingType
        width?: string | number
        global?: boolean
        index?: string
        background?: string
        text?: string
    }
}

export const Loading: Loading
