import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      await login(email, password);
      navigate('/docs'); // Redirigir a la ruta de docs
    } catch (err: any) {
      setError('Error al iniciar sesión: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Iniciar Sesión
        </h2>
        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          Accede a tu cuenta para continuar.
        </p>
        {error && (
          <p className="text-sm text-red-500 bg-red-100 p-2 rounded-md">
            {error}
          </p>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Correo
          </label>
          <input
            type="email"
            placeholder="Tu correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mt-1 text-sm bg-gray-100 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Contraseña
          </label>
          <input
            type="password"
            placeholder="Tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mt-1 text-sm bg-gray-100 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          />
        </div>
        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full py-2 text-white rounded-lg transition ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Cargando...' : 'Iniciar Sesión'}
        </button>
        <p className="text-sm text-center text-gray-500 dark:text-gray-400">
          ¿No tienes una cuenta?{' '}
          <a
            href="/register"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
