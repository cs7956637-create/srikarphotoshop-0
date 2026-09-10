import { createContext, useContext, useState, useEffect } from 'react';
import API from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Backend lo token verify chese endpoint undali (e.g., /auth/verify or /admin/me)
        const response = await API.get('/auth/verify'); 
        if (response.data) {
          setAdmin(response.data);
        }
      } catch (error) {
        // Token invalid aithe local storage clean cheseyyali
        localStorage.removeItem('token');
        localStorage.removeItem('adminInfo');
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await API.post('/auth/login', { username, password });

      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('adminInfo', JSON.stringify(response.data));
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