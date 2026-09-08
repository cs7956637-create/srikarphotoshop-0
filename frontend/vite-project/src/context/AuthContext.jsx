import { createContext, useContext, useState, useEffect } from 'react';
import API from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedAdmin = localStorage.getItem('adminInfo');
    if (token && storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await API.post('/auth/login', { username, password });

      if (response.data && response.data.token) {
        // Save token and admin info using matching keys
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('adminInfo', JSON.stringify(response.data));
        
        // Update state using 'setAdmin' (not 'setUser')
        setAdmin(response.data);
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('adminInfo');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);