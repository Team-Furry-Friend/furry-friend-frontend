import axios from 'axios';
import { createClient } from '@supabase/supabase-js';
import {
  BasketResponse,
  ChatRoomsResponse,
  CommentResponse,
  CreateChatRoomResponse,
  EditProfileResponse,
  LoginResponse,
  MessageListResponse,
  PopularityResponse,
  ProductDetailResponse,
  ProductListResponse,
  RegisterResponse,
  SocialResponse,
  TokenResponse,
} from '@/types';
import Cookies from 'js-cookie';
import { redirect } from 'next/navigation';
import { RedirectType } from 'next/dist/client/components/redirect';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

const supabaseUrl = 'https://pnfgdtoqziegilxdoirt.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string;
export const supabase = createClient(supabaseUrl, supabaseKey);

type Credentials = {
  username: string;
  password: string;
};

type RegisterFields = {
  email: string;
  mpw: string;
  name: string;
  address: string;
  phone: string;
  agreement: boolean;
};

type ProfileFields = {
  mid: string;
  name: string;
  address: string;
  phone: string;
  agreement: boolean;
};

export const auth = {
  // getToken 함수는 Server Component 에서만 사용해야 합니다.
  async getToken(at: string) {
    const { data } = await api.get<TokenResponse>('/gateway/isvalid', {
      headers: {
        Authorization: `Bearer ${at}`,
      },
    });

    if (data.statusCode === 401) {
      redirect('/refresh', RedirectType.push);
    }

    return data;
  },

  async refreshToken(rt: string) {
    const { data } = await api.post<LoginResponse>(
      '/member/refresh-token',
      {},
      {
        headers: {
          Authorization: `Bearer ${rt}`,
        },
      }
    );

    return data;
  },

  async signUp(fields: RegisterFields) {
    const { data } = await api.post<RegisterResponse>('/member/join', fields);

    return data;
  },

  async signInWithSocial({
    code,
    provider,
  }: {
    code: string;
    provider: string;
  }) {
    const { data } = await api.get<SocialResponse>(
      `/oauth2/${provider}?code=${code}`
    );

    if (data.status !== 'success') {
      throw new Error();
    }

    return data;
  },

  async signIn(credentials: Credentials) {
    const { data } = await api.post<LoginResponse>(
      '/member/login',
      credentials
    );

    return data;
  },

  signOut() {
    Cookies.set('access_token', '', {
      expires: 0,
    });

    Cookies.set('refresh_token', '', {
      expires: 0,
    });
  },

  async editProfile(params: ProfileFields) {
    const { data } = await api.patch<EditProfileResponse>(`/oauth2`, params);

    return data;
  },
};

type ProductsGetOption = {
  page: number;
  keyword?: string;
  type?: string;
};

type ProductsPostOption = {
  productDTO: {
    pcategory: string;
    pname: string;
    pexplain: string;
    pprice: number;
    imageDTOList: { path: string; imgName: string }[];
  };
  jwtRequest: {
    access_token: string;
  };
};

type ProductsPatchOption = {
  productDTO: {
    pcategory: string;
    pname: string;
    pexplain: string;
    pprice: number | string;
    pid: number;
  };
  jwtRequest: {
    access_token: string;
  };
};

export const products = {
  async get({ page, keyword, type }: ProductsGetOption) {
    return api
      .get<ProductListResponse>(
        `/products?page=${page}&size=16${keyword ? `&keyword=${keyword}` : ''}${
          type ? `&type=${type}` : ''
        }`
      )
      .then(r => r.data.data.dtoList.filter(item => !item.del));
  },

  async getProduct(pid: string) {
    const {
      data: { data: detail },
    } = await api.get<ProductDetailResponse>(`/products/detail?pid=${pid}`);

    return detail;
  },

  async post(options: ProductsPostOption) {
    return api.post('/products', options);
  },

  async patch(options: ProductsPatchOption) {
    return api.patch('/products', options);
  },

  async delete(pid: number, at: string) {
    return api.delete(`/products/${pid}`, {
      headers: {
        Authorization: `Bearer ${at}`,
      },
    });
  },

  async getPopularity() {
    const {
      data: { data: posts },
    } = await api.get<PopularityResponse>('/products/popularity');

    return posts;
  },
};

export const baskets = {
  async get(at: string) {
    const { data } = await api.get<BasketResponse>('/baskets', {
      headers: {
        Authorization: `Bearer ${at}`,
      },
    });

    return data;
  },

  async createBasket(pid: number, at: string) {
    return api.post('/baskets', {
      pid: pid,
      jwtRequest: {
        access_token: `Bearer ${at}`,
      },
    });
  },

  async removeBasket(bid: number, at: string) {
    return api.delete(`/baskets/${bid}`, {
      headers: {
        Authorization: `Bearer ${at}`,
      },
    });
  },
};

type CommentFields = {
  pid: string;
  at: string;
  text: string;
};

export const comments = {
  async get(pid: string) {
    const { data } = await api.get<CommentResponse>(`/reviews/${pid}`);

    return data;
  },

  async post({ pid, text, at }: CommentFields) {
    return api.post('/reviews/', {
      commentDTO: {
        pid,
        text,
      },
      jwtRequest: {
        access_token: at,
      },
    });
  },
};

type CreateChatRoomOptions = {
  chatParticipantsId: number | string;
  chatParticipantsName: string;
  jwtRequest: {
    access_token: string;
  };
};

export const chats = {
  async getChatList(rt: string) {
    const { data } = await api.get<ChatRoomsResponse>('/chats', {
      headers: {
        Authorization: `Bearer ${rt}`,
      },
    });
    return data;
  },

  async createChatRoom(options: CreateChatRoomOptions) {
    const { data } = await api.post<CreateChatRoomResponse>('/chats', options);

    return data;
  },

  async getMessages({
    startTime,
    page,
    chatRoomId,
    at,
  }: {
    chatRoomId: string;
    page: number;
    startTime: string;
    at: string;
  }) {
    const { data } = await api.get<MessageListResponse>(
      `/chats/${chatRoomId}`,
      {
        params: {
          page,
          size: 10,
          time: startTime.toString(),
        },

        headers: {
          Authorization: `Bearer ${at}`,
        },
      }
    );

    return data.data.dtoList;
  },
};
