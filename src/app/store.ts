import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import counterReducer from './features/counter/counterSlice';
import feedingReducer from './features/feeding/store/feedingSlice';
import starterReducer from './features/starter/store/starterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    feeding: feedingReducer,
    starter: starterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
