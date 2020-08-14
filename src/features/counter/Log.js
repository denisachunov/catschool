import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCount, clearLog } from './counterSlice';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { correctValue, incorrectValue, taskList } from './Counter.module.scss';

export default () => {

    const { data } = useSelector ( selectCount );
    const dispatch = useDispatch();

    useEffect ( () => {
        if ( data.length > 13 ) {
          const logDiv = document.querySelector ( '.log' );
          logDiv.scrollTop = 0;
        }
    }, [ data ]);

    return (
        <div className={`${taskList} log`}>
            {
                !!data.length && (
                <IconButton className="clearLog" aria-label="delete" onClick={() => dispatch ( clearLog() )}>
                    <DeleteIcon />
                </IconButton>
                )
            }
            {
                data.map (
                    ( el, i ) => (
                    <p key={el.id} className={el.correct ? correctValue : incorrectValue}>
                        {i+1}. {el.task}
                    </p>
                    )
                )
            }
        </div>
    );
}