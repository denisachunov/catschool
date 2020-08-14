import React from 'react';
import { useSelector } from 'react-redux';
import { selectCount } from './counterSlice';
import LinearProgress from '@material-ui/core/LinearProgress';
import Question from './Question';
import Result from './Result';
import Log from './Log';
import IceCreamDialog from './IceCreamDialog';
import AppBar from '../AppBar';
import pics from '../../images';

export default () => {

  const { total, next, iceCream } = useSelector ( selectCount );

  return (
    <>

      <AppBar />

      <LinearProgress
        variant="determinate"
        value={total*10}
        style={{margin: '50px 50px 0'}}
      />

      <header className="App-header">

        { next ? <Result /> : <Question /> }

        <Log />

        { !!total && <div style={{fontSize: '14px'}}>Правильных ответов подряд: {total}</div> }
      </header>

      <IceCreamDialog />

      {
        !!iceCream && (
          <div className="iceCream-list">
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