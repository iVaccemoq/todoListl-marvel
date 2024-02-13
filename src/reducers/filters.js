const initialState = {
    filters: [],
    selectFilter: 'all'
}
 
const filters = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FILTER':
            return {
                ...state,
                filters: action.payload
            }
        case 'SELECT_FILTER':
            return {
                ...state,
                selectFilter: action.payload
            }
        default: return state
    }
}

export default filters;