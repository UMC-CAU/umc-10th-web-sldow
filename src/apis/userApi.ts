import axiosInstance from './axiosInstance';

export const getMyInfo = async () => {
  const response = await axiosInstance.get('/v1/users/me');
  return response.data.data;
};

export const getLpsList = async (sort: 'latest' | 'oldest' = 'latest') => {
  // sort 파라미터를 order로 변환 (latest → desc, oldest → asc)
  const order = sort === 'latest' ? 'desc' : 'asc';
  const response = await axiosInstance.get(`/v1/lps`, {
    params: { order },
  });
  return response.data.data.data;
};
