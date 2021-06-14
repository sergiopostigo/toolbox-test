const textListReducer = (state = [], action) => {
    switch (action.type) {
        case 'NUEVO_TEXTO':
            return [action.text, ...state]
        case 'SIN_TEXTO':
            return [action.error, ...state]
        default:
            return state
    }
}

export default textListReducer