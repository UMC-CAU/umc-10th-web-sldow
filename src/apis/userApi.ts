import axiosInstance from './axiosInstance';

export const getMyInfo = async () => {
  const response = await axiosInstance.get('/v1/users/me');
  return response.data.data;
};
