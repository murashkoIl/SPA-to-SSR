import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import NotFound from "./NotFound";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/something" element={<div>Something</div>} />
      <Route path="/notfound" element={<NotFound />} />
    </Routes>
  );
};
