import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Admin from './pages/Admin';
import Professor from './pages/Coordenador';
import Aluno from './pages/Aluno';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/coordenador" element={<Professor />} />
        <Route path="/aluno" element={<Aluno />} />
      </Routes>
    </Router>
  );
}

export default App;
