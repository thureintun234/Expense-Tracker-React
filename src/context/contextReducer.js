const contextReducer = (state,action) => {
    let transitions;

    switch(action.type) {
        case 'DELETE_TRANSITION':
            transitions = state.filter(t => t.id !== action.payload)

            localStorage.setItem('transactions',JSON.stringify(transitions))

            return transitions;
        case 'ADD_TRANSITION':
            transitions = [action.payload,...state]

            localStorage.setItem('transitions',JSON.stringify(transitions))

            return transitions;
        default:
            return state;
    }
}

export default contextReducer