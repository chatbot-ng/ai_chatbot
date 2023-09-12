let initialState ={
    user: 'new',
    chat:['Ask me a question']
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
               ...state,
                user: action.user
            }
        case 'NEW-MESSAGE':
            return {
                ...state,
                chat: [...state.chat, action.payload]
            }
        default:
            return state
    }
}

export default reducer;