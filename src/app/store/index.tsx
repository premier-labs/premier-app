import { configureStore } from "@reduxjs/toolkit";
import { reducers } from "./reducers/index";
import { combineReducers } from "redux";
import { dropApi } from "./services";
import thunkMiddleware from "redux-thunk";

const reducer = combineReducers({
  [dropApi.reducerPath]: dropApi.reducer,

  ...reducers,
});

export const store = configureStore({
  reducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([dropApi.middleware, thunkMiddleware]),
});
// socketApi.middleware

//

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
