import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

//cart 상태를 변경하는 reducer 등록
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
