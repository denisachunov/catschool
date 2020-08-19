import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectABC, setText, setCompleted, resetCompleted, change } from './abcSlice';
import { TextField } from '@material-ui/core';
import Keyboard from 'react-simple-keyboard';
import AppBar from '../AppBar';
import Langs from './translations';
import pics from '../../images';
import useSound from 'use-sound';
import sound from '../../sounds';
import IceCream from '../IceCream';
import { abcYoutube } from '../../const';
import { hiddenKeyboardButtons } from '../../const';
import { debounce } from 'lodash';
import 'react-simple-keyboard/build/css/index.css';

export default () => {

  const [ errButtons, setErrButtons ] = useState ( '' );
  const [ pressedButton, setPressedButton ] = useState ( '' );
  const keyboardRef = useRef();
  const textFieldRef = useRef();

  const [ playSound ] = useSound ( sound.right );
  const [ playSoundErr ] = useSound ( sound.error );

  const dispatch = useDispatch();
  const { lang, text, completed } = useSelector ( selectABC );

  useEffect (() => {
    textFieldRef.current.querySelector ( 'textarea' ).focus();
  }, [ lang ]);

  const validate = val => {
    const { abc } = Langs[ lang ];
    return val.toLowerCase() === abc.substring ( 0, text.length+1 );
  }

  const changeText = val => {
    textFieldRef.current.querySelector ( 'textarea' ).focus();
    if ( validate ( val )) {
      dispatch ( setText ( val ));
      setErrButtons ( '' );
      setPressedButton ( val[ val.length-1 ] );
      debounce ( () => setPressedButton ( '' ), 200 )();
      playSound();
      if ( val.length === Langs[ lang ].abc.length ) {
        dispatch ( setCompleted ( lang ));
        dispatch ( setText ( '' ));
        if ( completed.length < 3 ) {
          const nextLang = Object.keys ( Langs ).find ( el => el !== lang && !completed.includes ( el ));
          nextLang && dispatch ( change ( nextLang ));
        }
      }
    }
    else {
      const errArr = errButtons.split ( ' ' );
      errArr.push ( val[ val.length-1 ] );
      setErrButtons ( errArr.join ( ' ' ));
      playSoundErr();
    }
  }

  const onChangeInput = ({ target }) => {
    const { value } = target;
    changeText ( value );
    keyboardRef.current.setInput ( value );
  };

  const handleCloseIceCream = () => {
    dispatch ( resetCompleted() );
    dispatch ( setText ( '' ));
  }

  return (
    <>
      <AppBar />
      <div className="abc">
        <TextField
            id="outlined-multiline-static"
            label={Langs[ lang ].label}
            multiline
            rows={12}
            variant="outlined"
            fullWidth
            value={text}
            onChange={onChangeInput}
            className={`textField-${lang}`}
            autoFocus
            ref={textFieldRef}
        />
        <Keyboard
          keyboardRef={r => (keyboardRef.current = r)}
          onKeyReleased={val => changeText ( `${text}${val}` )}
          buttonTheme={[
            { class: 'error-btn', buttons: errButtons }, 
            { class: 'hidden', buttons: hiddenKeyboardButtons },
            { class: 'pressed-btn', buttons: pressedButton }
          ]}
          layout={Langs[ lang ].layout}
        />
      </div>
      <div className="iceCream-list">
        {
          completed.map (( el, index ) => (
            <div key={index} className="iceCream-item">
              <span>{Langs[el].name}</span>
              <img src={pics[ 4-index ]} alt="" />
            </div>
          ))
        }
      </div>
      <IceCream
        handleClose={handleCloseIceCream}
        isDialogOpen={completed.length === 3}
        iceCreamNumber={completed.length+1}
        youtube={abcYoutube}
      />
    </>
  );
}