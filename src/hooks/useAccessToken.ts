import { useCookies } from 'react-cookie';
import useDecodedJWT from './useDecodedToken';
import { reIssueToken } from '@/services/Login/LoginAPI';
import { useEffect } from 'react';

const UseAccessToken = () => {
  const [cookies, setCookie] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken;

  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token found');
        }

        const newTokens = await reIssueToken(refreshToken);
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = newTokens;

        const decodedToken = useDecodedJWT(newAccessToken);
        if (decodedToken && decodedToken.exp) {
          const expires = new Date(decodedToken.exp * 1000);
          setCookie('accessToken', newAccessToken, { path: '/', expires });
        }

        localStorage.setItem('refreshToken', newRefreshToken);
      } catch (error) {
        console.error('Failed to reissue token:', error);
      }
    };

    if (accessToken) {
      const decodedToken = useDecodedJWT(accessToken);
      if (decodedToken && decodedToken.exp) {
        const currentTime = Date.now() / 1000;
        const tokenExpiryTime = decodedToken.exp;

        // 토큰 만료 시간이 현재 시간보다 작거나 같으면 토큰을 갱신합니다.
        if (tokenExpiryTime <= currentTime) {
          refreshAccessToken();
        } else {
          const expires = new Date(tokenExpiryTime * 1000);
          setCookie('accessToken', accessToken, { path: '/', expires });
        }
      }
    }
  }, [accessToken, setCookie]);

  return accessToken;
};

export default UseAccessToken;
