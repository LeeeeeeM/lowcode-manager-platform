import { configureStore } from '@reduxjs/toolkit'

import { registrantReducer } from './Reducer/Registrant/registrantReducer'
import { countReducer } from './Reducer/Count/countReducer';

const store = configureStore({
  reducer: { registrantReducer, countReducer },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).__store__ = store;

// Infer the `RootState` and `AppDispatch` types from the store itself
type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
type AppDispatch = typeof store.dispatch

export type { RootState, AppDispatch }
export { store }
export { useAppDispatch, useAppSelector } from './hooks'
