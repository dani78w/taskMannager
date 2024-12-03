import { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Register from './components/Register';
import SupabaseService from './SupabaseService';
import Login from './components/Login';
import DocsPage from './pages/about';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const supaService = SupabaseService.getInstance(); // Usar la instancia única

    supaService.initializeSession();

    supaService.getCurrentUser().then(({ data, error }) => {
      if (data?.user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false); // Finaliza la carga
    });
  }, []);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to="/docs" /> : <Navigate to="/Login" />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/register" element={<Register />}/>
      <Route path="/docs" element={isAuthenticated ? <DocsPage /> : <Navigate to="/Login" />} />
    </Routes>
  );
}

export default App;
