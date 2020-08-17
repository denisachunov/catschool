import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCount, add, setNext, setSum } from './counterSlice';
import { value, row, button, asyncButton, textbox, buttonInactive } from './Counter.module.scss';

export default () => {

    const { first, second, sum, operation } = useSelector ( selectCount );
    const dispatch = useDispatch();

    const checking = () => {
        if ( Number.isInteger ( sum )) {
            dispatch ( add ( sum ));
            dispatch ( setNext ( true ));
        }
        return null;
    }

    const changeSum = ({ target }) => {
        const result = parseInt ( target.value );
        dispatch ( setSum ( isNaN ( result ) ? '' : result ));
    }

    const hint = () => {
        setTimeout (
          () => {
            dispatch ( setNext ( true ));
            dispatch ( setSum ( first+second ));
          },
          1000
        )
    }

    return (
        <>
            <div className={row}>
                <div className={value}>
                    {first} {operation} {second} = 
                </div>
                <input 
                    className={textbox} 
                    value={sum} 
                    onChange={changeSum} 
                    onKeyDown={e => e.key === 'Enter' ? checking() : null}
                    autoFocus={true}
                />
            </div>
            <div className={row}>
                <button className={`${Number.isInteger ( sum ) ? button : buttonInactive}`} onClick={checking} >
                    Проверка
                </button>
                <button className={asyncButton} onClick={hint}>
                    Подсказка
                </button>
            </div>
        </>
    );
}