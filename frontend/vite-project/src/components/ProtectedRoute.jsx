import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { admin, loading } = useAuth();

  if (loading) {
    return <div className="text-center p-10">Loading studio portal...</div>;
  }

  // Token & Admin check fail aithe login page ki send cheyyi
  return admin ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;