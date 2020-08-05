const defaultManager = {
    stack: 2000,
    nextStack () {
        return ++this.stack
    },
}

const stackManager = window['__STACK_MANAGER__'] || (window['__STACK_MANAGER__'] = defaultManager)

export default stackManager
