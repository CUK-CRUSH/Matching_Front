import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UseAccessToken from '@/hooks/useAccessToken';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const accessToken = UseAccessToken();

  useEffect(() => {
    if (!accessToken) {
      navigate('/');
    }
  }, [accessToken, navigate]);

  return <>{accessToken ? children : null}</>;
};

export default ProtectedRoute;
