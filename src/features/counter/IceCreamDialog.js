import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import IceCream from '../IceCream';
import { mathYoutube, REQUIRED_CORRECT_ANSWERS } from '../../const';
import { selectCount, newVals, clearCorrects, clearLog, setNext, setIceCream, resetCounter } from './counterSlice';

export default () => {

    const dispatch = useDispatch();
    const { total, iceCream } = useSelector ( selectCount );

    const handleClose = () => {
        dispatch ( setIceCream() );
        dispatch ( clearCorrects() );
        dispatch ( clearLog() );
        dispatch ( setNext ( false ));
        dispatch ( newVals() );
    };

    const isDialogOpen = total === REQUIRED_CORRECT_ANSWERS;

    return <IceCream {...{ handleClose, isDialogOpen, youtube: mathYoutube, iceCreamNumber: iceCream, reset: resetCounter }} />;
}