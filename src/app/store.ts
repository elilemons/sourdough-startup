import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import counterReducer from './features/counter/counterSlice';
import feedingReducer from './features/feeding/store/feedingSlice';
import starterReducer from './features/starter/store/starterSlice';
import loafReducer from './features/loaf/store/loafSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    feeding: feedingReducer,
    starter: starterReducer,
    loaf: loafReducer,
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
