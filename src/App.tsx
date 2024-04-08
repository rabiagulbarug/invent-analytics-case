import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Detail from "./pages/detail/[id]";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pages/detail/:imdbID" element={<Detail />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
