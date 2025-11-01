import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Импорт стилей
import "./styles/reset.css";
import "./styles/styles.css";

// Импорт компонентов
import MainMenu from "./main_menu"
import Nowell from './nowell';
import ExplosionComponent from './explosion';
import ApiComponent from './data';
import Credits from './authors';
import Confirm from './confirm';
import Settings from './settings';
import News from './news';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Confirm />} />
        <Route path="/news" element={<News />} />
        <Route path="/main-menu" element={<MainMenu />} />
        <Route path="/nowell" element={<Nowell />} />
        <Route path="/party" element={<ApiComponent />}/>
        <Route path="/credits" element={<Credits />} />
        <Route path="/settings" element={<Settings />} /> 
        <Route path="*" element={<ExplosionComponent />} />
      </Routes>
    </BrowserRouter>
 )
};

export default App;