import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { resetCounter } from './counter/counterSlice';
import { resetAbc } from './alphabet/abcSlice';
import Button from '@material-ui/core/Button';
import images from '../images';

export default () => {

  const dispatch = useDispatch();
  const history = useHistory();

  const goto = path => () => {
    history.push ( `/${path}` );
  }

  useEffect ( () => () => {
    dispatch ( resetCounter() );
    dispatch ( resetAbc() );
  }, []);

  return (
    <>
        <div className="App-logo">
            <img src={images.logo} alt="" />
        </div>
        <Button className="home-btn abc" onClick={goto ( 'abc' )}>
            Алфавит
        </Button>
        <Button className="home-btn math" onClick={goto ( 'math' )}>
            Арифметика
        </Button>
    </>
  );
}