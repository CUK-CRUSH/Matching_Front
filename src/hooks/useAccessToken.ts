import { useCookies } from 'react-cookie';
import useDecodedJWT from './useDecodedToken';
import { reIssueToken } from '@/services/Login/LoginAPI';
import { useEffect, useState } from 'react';

const UseAccessToken = () => {
  const [cookies, setCookie] = useCookies(['accessToken']);
  const [accessToken, setAccessToken] = useState(cookies.accessToken);

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
          setAccessToken(newAccessToken);
        }

        localStorage.setItem('refreshToken', newRefreshToken);
      } catch (error) {
        console.error('Failed to reissue token:', error);
        setAccessToken(null);
      }
    };

    const validateToken = () => {
      if (accessToken) {
        const decodedToken = useDecodedJWT(accessToken);
        if (decodedToken && decodedToken.exp) {
          const currentTime = Math.floor(Date.now() / 1000); // 현재 시간을 초 단위로 변환
          const tokenExpiryTime = decodedToken.exp;

          // 토큰 만료 시간이 현재 시간보다 작거나 같으면 토큰을 갱신합니다.
          if (tokenExpiryTime <= currentTime) {
            refreshAccessToken();
          } else {
            const expires = new Date(tokenExpiryTime * 1000);
            setCookie('accessToken', accessToken, { path: '/', expires });

            // 토큰 만료 시간 이전에 갱신을 시도합니다. (예: 만료 1분 전)
            const refreshTime = (tokenExpiryTime - currentTime - 60) * 1000;
            setTimeout(refreshAccessToken, refreshTime);
          }
        } else {
          // Access Token이 유효하지 않으면 새로 발급받기
          refreshAccessToken();
        }
      } else {
        // Access Token이 없으면 새로 발급받기
        refreshAccessToken();
      }
    };

    validateToken();
  }, [accessToken, setCookie]);

  return accessToken;
};

export default UseAccessToken;
