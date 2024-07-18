import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UseAccessToken from '@/hooks/useAccessToken';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const accessToken = UseAccessToken();

  useEffect(() => {
    if (accessToken) {
      navigate('/mypage');
    }
  }, [accessToken, navigate]);

  return <>{children}</>;
};

export default PrivateRoute;
