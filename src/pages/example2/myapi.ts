import axios from 'axios';

export const getTodos = () => {
  return axios.get('/user').then((res) => res.data);
};

export const getPerson = () => {
  return axios.get('/personalInfo').then((res) => res.data);
};

export const postPerson = () => {
  return axios.post('/personalInfo').then((res) => res.data);
};
