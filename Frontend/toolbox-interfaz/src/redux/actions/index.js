export const add_text = (text) => {
    return {
        type: 'NUEVO_TEXTO',
        text: text
    }
}

export const no_text = (error) => {
    return {
        type: 'SIN_TEXTO',
        error: error
    }
}