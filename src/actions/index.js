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