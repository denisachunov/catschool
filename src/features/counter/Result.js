import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCount, newVals, setCorrects, clearCorrects, setData, setNext, setSum } from './counterSlice';
import { value, row, correctValue, incorrectValue } from './Counter.module.scss';
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { uniqueId } from 'lodash';
import useSound from 'use-sound';
import sound from '../../sounds';

export default () => {

    const { first, second, operation, check, data, sum } = useSelector ( selectCount );
    const dispatch = useDispatch();

    const [ playSound ] = useSound ( check ? sound.correct : sound.wrong );

    const go = () => {
        dispatch ( setNext ( false ));
        dispatch ( newVals() );
    }

    const correctResult = operation === '+' ? first+second : first-second;

    const log = () => {
        const newData = [
            ...data,
            {
                id: uniqueId (),
                correct: check,
                task: `${first} ${operation} ${second} = ${correctResult}` 
            }
        ];
        dispatch ( setData ( newData ));
    }

    useEffect ( () => {
        log();
        dispatch ( check ? setCorrects() : clearCorrects() );
        const keypressFn = ({ key }) => {
            key === 'Enter' && go();
        }
        document.addEventListener ( 'keypress', keypressFn );
        return () => {
            dispatch ( setSum ( '' ));
            document.removeEventListener ( 'keypress', keypressFn );
        }
    }, [] );

    useEffect ( () => {
        check !== 0 && playSound();
    }, [ check, playSound ])

    let answerClass = value;
    if ( check ) {
      answerClass = correctValue;
    }
    else if ( check === false ) {
      answerClass = incorrectValue;
    }

    return (
        <>
            <div className={row}>
                <div className={answerClass}>
                    {first} {operation} {second} = {sum}
                </div>
            </div>
            {
                check === false && (
                <div className={value}>
                    {first} {operation} {second} = {correctResult}
                </div>
                )
            }
            <div className={row}>
                <Button onClick={go} variant="contained" color="primary" style={{ width: '50px', alignSelf: 'center' }}>
                    <ArrowForwardIcon /> 
                </Button>
            </div>
        </>
    );
}