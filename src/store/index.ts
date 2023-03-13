import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import { useDispatch, useSelector } from 'react-redux';
import { TypedUseSelectorHook } from 'react-redux';

const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


export default store;