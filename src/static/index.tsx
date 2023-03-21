import React, { FC, useEffect } from "react";

import { Route, Routes, useLocation } from "react-router-dom";

import { Navbar } from "@static/components/navbar";
import { Footer } from "@static/components/footer";

import Home from "@static/routes/home";
import RefundsPolicy from "@static/routes/policy/Refunds";
import PrivacyPolicy from "@static/routes/policy/Privacy";

const App: FC = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Navbar />

      <Routes>
        {/* Policy */}
        <Route path="/policy/refunds-policy" element={<RefundsPolicy />} />
        <Route path="/policy/privacy-policy" element={<PrivacyPolicy />} />

        {/* Home */}
        <Route path="/" element={<Home />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
