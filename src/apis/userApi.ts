import axiosInstance from './axiosInstance';

export interface Like {
  id: number;
  userId: number;
  lpId: number;
}

export interface LpListItem {
  id: number;
  title: string;
  name?: string;
  subtitle?: string;
  description?: string;
  content?: string;
  thumbnail?: string | null;
  likes?: Like[];
}

export interface Tag {
  id: number;
  name: string;
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface LpDetail extends LpListItem {
  content: string;
  published?: boolean;
  authorId: number;
  createdAt?: string;
  updatedAt?: string;
  tags?: Tag[];
  likes: Like[];
  author?: UserProfile;
}

export interface CommentListItem {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt?: string;
  updatedAt?: string;
  author?: {
    id: number;
    name: string;
  };
}

export interface CursorPage<T> {
  data: T[];
  nextCursor?: number | null;
  hasNext?: boolean;
}

// 로그인
export const signin = async (payload: { email: string; password: string }) => {
  const response = await axiosInstance.post(`/v1/auth/signin`, payload);
  return response.data.data;
};

// 로그아웃
export const signout = async () => {
  const response = await axiosInstance.post(`/v1/auth/signout`);
  return response.data.data;
};

// 회원 탈퇴
export const deleteAccount = async () => {
  const response = await axiosInstance.delete(`/v1/users`);
  return response.data.data;
};

export const getMyInfo = async (): Promise<UserProfile> => {
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
}): Promise<CursorPage<LpListItem>> => {
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
}): Promise<CursorPage<CommentListItem>> => {
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
export const getLpDetail = async (lpId: number): Promise<LpDetail> => {
  const response = await axiosInstance.get(`/v1/lps/${lpId}`);
  return response.data.data;
};

// 이미지 업로드 (인증)
export const uploadImage = async (file: File): Promise<{ imageUrl: string }> => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axiosInstance.post(`/v1/uploads`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data.data;
};

// 내 정보 수정
export const updateMe = async (payload: {
  name?: string;
  bio?: string;
  avatar?: string;
}) => {
  const response = await axiosInstance.patch(`/v1/users`, payload);
  return response.data.data;
};

// LP 생성
export const createLp = async (payload: {
  title: string;
  content: string;
  thumbnail?: string;
  tags: string[];
  published: boolean;
}) => {
  const response = await axiosInstance.post(`/v1/lps`, payload);
  return response.data.data;
};

// LP 수정
export const updateLp = async ({
  lpId,
  payload,
}: {
  lpId: number;
  payload: Partial<{
    title: string;
    content: string;
    thumbnail: string;
    tags: string[];
    published: boolean;
  }>;
}) => {
  const response = await axiosInstance.patch(`/v1/lps/${lpId}`, payload);
  return response.data.data;
};

// LP 삭제
export const deleteLp = async (lpId: number) => {
  const response = await axiosInstance.delete(`/v1/lps/${lpId}`);
  return response.data.data;
};

// LP 좋아요
export const likeLp = async (lpId: number) => {
  const response = await axiosInstance.post(`/v1/lps/${lpId}/likes`);
  return response.data.data;
};

// LP 좋아요 취소
export const unlikeLp = async (lpId: number) => {
  const response = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);
  return response.data.data;
};
