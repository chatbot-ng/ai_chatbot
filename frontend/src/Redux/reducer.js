let initialState ={
    user: 'new',
    chat:['Ask me a question'],
    pipe:['Ask me a question']
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
               ...state,
                user: action.user
            }
        case 'NEW-MESSAGE':
            if(action.payload.count!==undefined){
                let newArray = [...state.chat]
                if(newArray[action.payload.count]===undefined){
                    newArray[action.payload.count]=action.payload.text
                }else{
                    newArray[action.payload.count]+=action.payload.text
                }
                return {
                ...state,
                    chat: newArray
                }
            }
            return {
                ...state,
                chat: [...state.chat, action.payload]
            }
        case 'NEW-PIPE-MESSAGE':
            if(action.payload.count!==undefined){
                let newArray = [...state.pipe]
                if(newArray[action.payload.count]===undefined){
                    newArray[action.payload.count]=action.payload.text
                }else{
                    newArray[action.payload.count]+=action.payload.text
                }
                return {
                ...state,
                    pipe: newArray
                }
            }
            return {
                ...state,
                pipe: [...state.pipe, action.payload]
            }
        default:
            return state
    }
}

export default reducer;