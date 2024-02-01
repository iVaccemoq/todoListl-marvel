const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    selectFilter: 'all'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
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

export default reducer;