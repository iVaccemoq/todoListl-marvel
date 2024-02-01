
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { useEffect } from 'react'

import { useHttp } from '../../hooks/http.hook';
import { useDispatch, useSelector } from 'react-redux';

import { heroesFilters } from '../../actions';

const HeroesFilters = () => {

    const {filters} = useSelector(state => state)
    
    const {request} = useHttp();
    const dispatch = useDispatch()

    useEffect(() => {
        request('http://localhost:3001/filters')
            .then(data => {
                dispatch(heroesFilters(
                    data.map(item => {
                        return <button className={item.btnClass}>{item.value}</button>
                    })
                )) 
            })
    }, [])

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {/* <button className="btn btn-outline-dark active">Все</button>
                    <button className="btn btn-danger">Огонь</button>
                    <button className="btn btn-primary">Вода</button>
                    <button className="btn btn-success">Ветер</button>
                    <button className="btn btn-secondary">Земля</button> */}
                    {filters}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;