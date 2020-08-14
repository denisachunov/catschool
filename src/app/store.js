import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import abcReducer from '../features/alphabet/abcSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    abc: abcReducer
  },
});
