export const heroesFetch = (request) => (dispatch) => {
    dispatch(heroesFetching());

    request("http://localhost:3001/heroes")
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()))
}

export const filtersFetch = (request) => (dispatch) => {
    request('http://localhost:3001/filters')
        .then(data => {
            dispatch(heroesFilters(
                data.map(item => {
                    return <button onClick={() => dispatch(filter(item.select))} className={item.btnClass}>{item.value}</button>
                })
            )) 
        })
}

export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const heroesFilters = (filters) => {
    return {
        type: 'HEROES_FILTER',
        payload: filters
    }
}

export const filter = (filter) => {
    return {
        type: 'SELECT_FILTER',
        payload: filter
    }
}