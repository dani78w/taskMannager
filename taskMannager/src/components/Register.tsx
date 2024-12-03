import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SupabaseService from '../SupabaseService';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async () => {
    setLoading(true);
    setMessage('');
    setError(null);

    try {
      const supaService = SupabaseService.getInstance();
      await supaService.signUp(email, password);
      setMessage('¡Registro exitoso! Por favor, verifica tu correo.');
      navigate('/Login'); // Redirigir al login tras el registro
    } catch (err: any) {
      setError(`Error al registrarte: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Registrarse
        </h2>
        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          Crea tu cuenta para empezar.
        </p>
        {error && (
          <p className="text-sm text-red-500 bg-red-100 p-2 rounded-md">
            {error}
          </p>
        )}
        {message && (
          <p className="text-sm text-green-500 bg-green-100 p-2 rounded-md">
            {message}
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
            required
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
            required
          />
        </div>
        <button
          onClick={handleRegister}
          disabled={loading}
          className={`w-full py-2 text-white rounded-lg transition ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
        <p className="text-sm text-center text-gray-500 dark:text-gray-400">
          ¿Ya tienes una cuenta?{' '}
          <a
            href="/Login"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
