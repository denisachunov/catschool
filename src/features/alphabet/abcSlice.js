import { createSlice } from '@reduxjs/toolkit';
import store from 'store';

const initialize = () => ({
  lang: 'en',
  text: '',
  completed: store.get ( 'abc' ) || []
});

export const abcSlice = createSlice ({
  name: 'abc',
  initialState: {
    value: initialize()
  },
  reducers: {
    change: ( state, { payload }) => {
      state.value.lang = payload;
    },
    setText: ( state, { payload }) => {
      state.value.text = payload;
    },
    setCompleted: ( state, { payload }) => {
      if ( !state.value.completed.includes ( payload )) {
        state.value.completed = [ ...state.value.completed, payload ];
        store.set ( 'abc', state.value.completed );
      }
    },
    resetCompleted: state => {
      state.value.completed = [];
      store.set ( 'abc', null );
    },
    resetAbc: state => {
      store.set ( 'abc', null );
      state.value = initialize();
    }
  },
});

export const { change, setText, setCompleted, resetCompleted, resetAbc } = abcSlice.actions;

export const selectABC = state => state.abc.value;

export default abcSlice.reducer;