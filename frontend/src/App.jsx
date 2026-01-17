import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Createpage from "./pages/Createpage";
import Notedetailspage from "./pages/Notedetailspage";

const App = () => {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 -z-10 min-h-screen w-full 
  bg-[radial-gradient(125%_125%_at_50%_80%,#000000_60%,#FF6B6B40_90%,#FF8C0040_100%)]" />



      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create" element={<Createpage />} />
        <Route path="/note/:id" element={<Notedetailspage />} />
      </Routes>
    </div>
  );
};

export default App;
