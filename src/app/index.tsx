import React, { FC, useEffect } from "react";

import Navbar from "./navbar";

import { store } from "./store";
import { init, login } from "./store/services/web3";

import { Provider } from "react-redux";
import { useDispatch } from "./store/hooks";

import { Route, Routes } from "react-router-dom";

import DropRoutes from "./routes/drop";
import Style from "./style";

const AppWrapper: FC = ({ children }) => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const App: FC = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(init());
    dispatch(login());
  }, []);

  return (
    <Style.RootApp>
      <Navbar />

      <Routes>
        <Route path="/drop/*" element={<DropRoutes />} />
      </Routes>
    </Style.RootApp>
  );
};

export default AppWrapper;
