import { ReactElement } from 'react';
import { useSelector } from '../../services/store';
import { getUserState } from '../../slices/userSlice/userSlice';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  children: ReactElement;
  unAuthRequired?: boolean;
};

export const ProtectedRoute = ({
  children,
  unAuthRequired = false
}: ProtectedRouteProps) => {
  const location = useLocation();
  const { isAuthenticated, loading } = useSelector(getUserState);
  if (loading) {
    return <Preloader />;
  }
  const from = (location.state as any)?.from || '/';
  if (isAuthenticated && unAuthRequired && !loading) {
    return <Navigate to={from} replace />;
  }

  if (!isAuthenticated && !unAuthRequired && !loading) {
    return <Navigate to='/login' replace state={{ from: location.pathname }} />;
  }

  return children;
};
