import { createSlice } from '@reduxjs/toolkit';
import store from 'store';

export const abcSlice = createSlice ({
  name: 'abc',
  initialState: {
    value: {
        lang: 'en',
        text: '',
        completed: store.get ( 'abc' ) || []
    }
  },
  reducers: {
    change: ( state, { payload }) => {
      state.value.lang = payload;
    },
    setText: ( state, { payload }) => {
      state.value.text = payload;
    },
    setCompleted: ( state, { payload }) => {
      state.value.completed = [ ...state.value.completed, payload ];
      store.set ( 'abc', state.value.completed );
    },
    resetCompleted: state => {
      state.value.completed = [];
      store.set ( 'abc', null );
    }
  },
});

export const { change, setText, setCompleted, resetCompleted } = abcSlice.actions;

export const selectABC = state => state.abc.value;

export default abcSlice.reducer;