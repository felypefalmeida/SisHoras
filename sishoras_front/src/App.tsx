import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login'; // Altere para o caminho correto do seu componente de Login
import Admin from './pages/Admin'
import Coordenador from './pages/Coordenador' 
import Aluno from './pages/Aluno'


const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/coordenador" element={<Coordenador />} />
        <Route path="/aluno" element={<Aluno />} />

        {/* Defina outras rotas aqui */}
      </Routes>
    </Router>
  );
  
};

export default App;
