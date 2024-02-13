import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { heroesFetch, heroesFetched } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {
    const {heroes, heroesLoadingStatus} = useSelector(state => state.heroes);
    const {selectFilter} = useSelector(state => state.filters)
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(heroesFetch(request))
        // eslint-disable-next-line
    }, []);


    const filterChars = (char = heroes, element = 'all' ) => {

        if (char.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        if (element === 'all') {
            return char
        }

        return char.filter(hero => {
            return hero.props.element === element;
        })
    }

    const deleteCharacter = (id) => {
        heroes.forEach((char, i) => {
            if (id === char.id) {

                const newCharsList = [...heroes]
                newCharsList.splice(i,1)

                dispatch(heroesFetched(newCharsList))
            }
        })
        
    }

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
            return <HeroesListItem key={id} id={id} {...props} deleteCharacter={deleteCharacter}/>
        })
    }

    const elements = renderHeroesList(heroes);

    return (
        <ul>
            {filterChars(elements, selectFilter)}
        </ul>
    )
}

export default HeroesList;