import axios from 'axios';

export const getUserData = async () => {
  const { data } = await axios.get('/v1/user');
  return data;
};
