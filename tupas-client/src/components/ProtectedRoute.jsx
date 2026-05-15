import { Navigate, Outlet } from 'react-router-dom';
import { getAuth } from '../utils/auth';

const ProtectedRoute = ({ allowedRoles }) => {
  const auth = getAuth();
  const role = auth?.user?.role || auth?.type;

  if (!auth?.token) {
    return <Navigate to="/auth/signin" replace />;
  }

  if (allowedRoles?.length && !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
