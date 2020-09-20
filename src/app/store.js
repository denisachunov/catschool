import { configureStore } from '@reduxjs/toolkit';
import counter from '../features/counter/counterSlice';
import abc from '../features/alphabet/abcSlice';

export default configureStore ({
  reducer: {
    counter,
    abc
  }
});