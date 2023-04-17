import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HeaderBar from "./components/common/headerBar";
import Dashboard from "./pages/dashboard";
import Devices from "./pages/devices";

function App() {
  return (
    <div>
      <BrowserRouter>
        <HeaderBar />
        <Routes>
          <Route exact path="/devices" element={<Devices />}></Route>
          <Route exact path="/" element={<Dashboard />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
