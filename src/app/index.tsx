import React, { FC, useEffect } from "react";

import Navbar from "./navbar";

import { store } from "./store";
import { init, login } from "./store/services/web3";

import { Provider } from "react-redux";
import { useDispatch } from "./store/hooks";

import { Route, Routes } from "react-router-dom";

import DropRoutes from "./routes/drop";

const AppWrapper: FC = ({ children }) => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const App: FC = ({ children }) => {
  if (window.innerWidth < 1000) {
    return (
      <>This website isn't yet fully working on mobile. Please come back on your computer :)</>
    );
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(init());
    dispatch(login());
  }, []);

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/drop/*" element={<DropRoutes />} />
      </Routes>
    </>
  );
};

export default AppWrapper;
