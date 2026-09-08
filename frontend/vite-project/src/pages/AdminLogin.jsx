import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();


  // AdminLogin.jsx lo handleSubmit logic update cheyyi:

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // ⚠️ Send as 'email' instead of 'username'
    await login(username, password); // ensure AuthContext sends { email: username, password }
    navigate('/admin');
  } catch (err) {
    setError('Invalid credentials');
  }
};


  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#09090b', color: '#fff' }}>
      <form onSubmit={handleSubmit} style={{ backgroundColor: '#18181b', padding: '2rem', borderRadius: '12px', width: '100%', maxWidth: '400px', border: '1px solid #27272a' }}>
        <h2 style={{ color: '#fbbf24', textAlign: 'center', marginBottom: '1.5rem', fontFamily: 'serif' }}>Srikar Studio Admin</h2>
        {error && <p style={{ color: '#f43f5e', fontSize: '0.875rem', marginBottom: '1rem' }}>{error}</p>}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#a1a1aa' }}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', backgroundColor: '#09090b', border: '1px solid #3f3f46', borderRadius: '6px', color: '#fff' }}
            required
          />
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#a1a1aa' }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', backgroundColor: '#09090b', border: '1px solid #3f3f46', borderRadius: '6px', color: '#fff' }}
            required
          />
        </div>
        <button
          type="submit"
          style={{ width: '100%', padding: '0.75rem', backgroundColor: '#fbbf24', border: 'none', borderRadius: '6px', fontWeight: 'bold', color: '#000', cursor: 'pointer' }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

// ⚠️ E LINE ADD CHEYYI MAWA:
export default AdminLogin;