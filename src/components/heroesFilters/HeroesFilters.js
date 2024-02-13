
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { useEffect } from 'react'

import { useHttp } from '../../hooks/http.hook';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect'

import { filtersFetch } from '../../actions';

const HeroesFilters = () => {

    const filterr = createSelector(
        (state) => state.filters.filters,
        (filters) => {
            return filters
        }
    )
    
    const filters = useSelector(filterr)
    
    const {request} = useHttp();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(filtersFetch(request))
    }, [])

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {filters}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;