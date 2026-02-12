import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Импорт стилей
import "./styles/reset.css";
import "./styles/style.css";

// Импорт настраиваемых роутов
import { routes } from './routes/index';

const App = () => {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        {routes.map(({ path, element}) => {
          return <Route key={path} path={path} element={element} />
        })}
      </Routes>
    </Router>
 )
};

export default App;