import React, { FC, useEffect } from "react";

import { Route, Routes, useLocation } from "react-router-dom";

import { Navbar } from "@static/components/navbar";
import { Footer } from "@static/components/footer";

import Home from "@static/routes/home/index";
import OrderingPayments from "@static/routes/policy/Ordering&Payments";
import ReturnsRefunds from "@static/routes/policy/Returns&Refunds";
import ShippingDelivery from "@static/routes/policy/Shipping&Delivery";

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
        <Route path="/policy/returns-refunds" element={<ReturnsRefunds />} />
        <Route path="/policy/ordering-payment" element={<OrderingPayments />} />
        <Route path="/policy/shipping-delivery" element={<ShippingDelivery />} />

        {/* Home */}
        <Route path="/" element={<Home />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
