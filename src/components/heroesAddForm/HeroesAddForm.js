
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';

import { heroesFetching, heroesFetched, heroesFetchingError, heroesFilters } from '../../actions';

import { v4 as uuidv4 } from 'uuid';

import { useDispatch, useSelector } from 'react-redux';

const HeroesAddForm = () => {

    const {heroes} = useSelector(state => state.heroes);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        request('http://localhost:3001/filters')
            .then(data => {
                dispatch(heroesFilters(
                    data.map(item => {
                        return <option value={item.value}>{item.value}</option>
                    })
                )) 
            })
    }, [])

    return (   
        <Formik
        initialValues={{ name: '', description: '', element: ''  }}
        validate={values => {
            const errors = {};
            if (!values.name) {
                errors.name = 'Required';
            }
            if (!values.description) {
                errors.description = 'Required';
            }
            if (!values.element) {
                errors.element = 'Required';
            }
            return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {

            const data = JSON.stringify({...values, id: uuidv4()})

            dispatch(heroesFetching())

            request('http://localhost:3001/heroes', 'POST', data)
                .then(data => {
                    dispatch(heroesFetched([...heroes, data]))
                    setSubmitting(false);
                })
                .catch(data => {
                    dispatch(heroesFetchingError());
                    setSubmitting(false);
                })

        }}
        >
        {({ 
        isSubmitting, 
        values,
        errors,
        touched }) => (
            <Form className="border p-4 shadow-lg rounded">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                    <Field
                        style={{border: touched.name && errors.name ? '1px solid red' : '1px solid white'}} 
                        required
                        type="text" 
                        name="name" 
                        className="form-control" 
                        id="name" 
                        placeholder="Как меня зовут?"/>
                    <ErrorMessage name='name' component={'div'}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="text" className="form-label fs-4">Описание</label>
                    <Field
                        as='textarea'
                        required
                        name="description" 
                        className="form-control" 
                        id="text" 
                        placeholder="Что я умею?"
                        style={{"height": '130px', border: touched.description && errors.description ? '1px solid red' : '1px solid white'}}/>
                    <ErrorMessage name='description' component={'div'}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                    <Field
                    as='select' 
                    required
                    className="form-select" 
                    id="element" 
                    name="element">
                        <option value='0'>Я владею элементом...</option>
                        <option value='fire'>Огонь</option>
                        <option value='wind'>Земля</option>
                        <option value='water'>Вода</option>
                        <option value='earth'>Земля</option>
                    </Field>
                    <ErrorMessage name='element' component={'div'}/>
                </div>

                <button disabled={isSubmitting} type="submit" className="btn btn-primary">Создать</button>
            </Form>
        )}
        </Formik>

    )
}

export default HeroesAddForm;