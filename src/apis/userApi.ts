import axiosInstance from './axiosInstance';

export const getMyInfo = async () => {
  const response = await axiosInstance.get('/v1/users/me');
  return response.data.data;
};

// useInfiniteQuery용 LP 목록 조회
export const getLpsListInfinite = async ({
  order,
  cursor,
  limit = 10,
}: {
  order: 'asc' | 'desc';
  cursor?: number;
  limit?: number;
}) => {
  const response = await axiosInstance.get(`/v1/lps`, {
    params: { order, cursor, limit },
  });
  return response.data.data;
};

// 댓글 목록 조회 (useInfiniteQuery용)
export const getCommentsList = async ({
  lpId,
  order,
  cursor,
  limit = 10,
}: {
  lpId: number;
  order: 'asc' | 'desc';
  cursor?: number;
  limit?: number;
}) => {
  const response = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
    params: { order, cursor, limit },
  });
  return response.data.data;
};

// 댓글 생성
export const createComment = async ({
  lpId,
  content,
}: {
  lpId: number;
  content: string;
}) => {
  const response = await axiosInstance.post(`/v1/lps/${lpId}/comments`, {
    content,
  });
  return response.data.data;
};

// 댓글 수정
export const updateComment = async ({
  lpId,
  commentId,
  content,
}: {
  lpId: number;
  commentId: number;
  content: string;
}) => {
  const response = await axiosInstance.patch(
    `/v1/lps/${lpId}/comments/${commentId}`,
    { content }
  );
  return response.data.data;
};

// 댓글 삭제
export const deleteComment = async ({
  lpId,
  commentId,
}: {
  lpId: number;
  commentId: number;
}) => {
  const response = await axiosInstance.delete(
    `/v1/lps/${lpId}/comments/${commentId}`
  );
  return response.data.data;
};

// LP 상세 조회
export const getLpDetail = async (lpId: number) => {
  const response = await axiosInstance.get(`/v1/lps/${lpId}`);
  return response.data.data;
};
