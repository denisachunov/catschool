import { createSlice } from '@reduxjs/toolkit';
import { random, last } from 'lodash';
import store from 'store';

const initialize = () => {
  const data = store.get ( 'taskList' ) || [];
  const first = random ( 2, 20 );
  if ( data.length ) {
    const prevFirst = parseInt ( last ( data ).task.split ( ' + ' )[ 0 ]);
    if ( prevFirst === first ) {
      return initialize();
    }
  }
  const operation = [ '-', '+' ][ random ( 0, 1 )];
  const second = operation === '-' ? random ( 1, first ) : random ( 2, 20 );
  const correctResult = operation === '-' ? first-second : first+second;
  return {
    data,
    first,
    second,
    operation,
    correctResult,
    check: 0,
    sum: '',
    next: false,
    total: store.get ( 'total' ) || 0,
    iceCream: store.get ( 'iceCream' ) || 0
  }
}

export const counterSlice = createSlice ({
  name: 'counter',
  initialState: {
    value: initialize()
  },
  reducers: {
    add: ({ value }, { payload }) => {
      value.check = payload === value.correctResult;
    },
    newVals: state => {
      state.value = initialize();
    },
    setCorrects: state => {
      const newTotal = ++state.value.total;
      store.set ( 'total', newTotal );
    },
    clearCorrects: state => {
      state.value.total = 0;
      store.set ( 'total', 0 );
    },
    setData: ( state, { payload }) => {
      state.value.data = payload;
      store.set ( 'taskList', payload );
    },
    clearLog: state => {
      state.value.total = 0;
      store.set ( 'total', 0 );
      state.value.data = [];
      store.set ( 'taskList', [] );
    },
    setNext: ( state, { payload }) => {
      state.value.next = payload;
    },
    setSum: ( state, { payload }) => {
      state.value.sum = payload;
    },
    setIceCream: state => {
      state.value.iceCream = state.value.iceCream > 2 ? 0 : state.value.iceCream+1;
      store.set ( 'iceCream', state.value.iceCream );
    },
    resetCounter: state => {
      store.set ( 'total', 0 );
      store.set ( 'iceCream', 0 );
      store.set ( 'taskList', [] );
      state.value = initialize();
    }
  },
});

export const { add, newVals, setCorrects, clearCorrects, setData, clearLog, setNext, setSum, setIceCream, resetCounter } = counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = state => state.counter.value;

export default counterSlice.reducer;