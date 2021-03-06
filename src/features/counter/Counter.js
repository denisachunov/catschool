import React from 'react';
import { useSelector } from 'react-redux';
import { selectCount } from './counterSlice';
import LinearProgress from '@material-ui/core/LinearProgress';
import Question from './Question';
import Result from './Result';
import Log from './Log';
import IceCreamDialog from './IceCreamDialog';
import AppBar from '../AppBar';
import { REQUIRED_CORRECT_ANSWERS } from '../../const';
import pics from '../../images';

export default () => {

  const { total, next, iceCream } = useSelector ( selectCount );

  return (
    <>

      <AppBar />

      <LinearProgress
        variant="determinate"
        value={total * 100 / REQUIRED_CORRECT_ANSWERS}
        className="progress"
      />

      <header className="App-header">

        { next ? <Result /> : <Question /> }

        <Log />

        { !!total && <div className="correct-answers-number">Правильных ответов подряд: {total}</div> }
      </header>

      <IceCreamDialog />

      {
        !!iceCream && (
          <div className="iceCream-list iceCream-list--math">
            {
              Array ( iceCream ).fill().map (( el, index ) => (
                <div key={index} className="iceCream-item">
                  <img src={pics[ index+1 ]} alt="" />
                </div>
              ))
            }
          </div>
        )
      }
    </>
  );
}