import { useCookies } from 'react-cookie';

const UseAccessToken = () => {
  const [cookies] = useCookies(['accessToken']);

  const accessToken = cookies.accessToken;
  return accessToken;
};

export default UseAccessToken;
