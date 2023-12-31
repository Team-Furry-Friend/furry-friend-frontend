export interface LoginResponse {
  statusCode: number;
  status: string;
  message: string;
  data: Tokens;
}

export interface Tokens {
  refreshToken: string;
  accessToken: string;
}

export interface RegisterResponse {
  statusCode: number;
  status: string;
  message: string;
}

export interface ProductListResponse {
  statusCode: number;
  status: string;
  message: string;
  data: ProductData;
}

export interface ProductData {
  dtoList: Product[];
  totalPage: number;
  page: number;
  size: number;
  start: number;
  end: number;
  prev: boolean;
  next: boolean;
  pageList: number[];
  del: boolean;
}

export interface Product {
  pid: number;
  pcategory: string;
  pname: string;
  pexplain: string;
  pprice: number;
  del: boolean;
  mid: null;
  regDate: Date;
  modDate: Date;
  imageDTOList: ImageDTOList[];
}

export interface ImageDTOList {
  imgName: string;
  path: string;
}

export interface ProductDetailResponse {
  statusCode: number;
  status: string;
  message: string;
  data: Detail;
}

export interface Detail {
  pid: number;
  pcategory: string;
  pname: string;
  mname: string;
  pexplain: string;
  pprice: number;
  del: boolean;
  mid: number;
  regDate: Date;
  modDate: Date;
  imageDTOList: ImageDTOList[];
}

export interface BasketResponse {
  statusCode: number;
  status?: string;
  message?: string;
  data?: Datum[];
}

export interface Datum {
  bid: number;
  pid: number;
  mid: number;
}

export interface TokenResponse {
  statusCode: number;
  status: string;
  message: string;
  data?: {
    memberId: number;
    memberName: string;
  };
}

export interface CommentResponse {
  statusCode: number;
  status: string;
  message: string;
  data: Comment[];
}

export interface Comment {
  rid: number;
  pid: number;
  mid: number;
  nickname: string;
  email: null;
  text: string;
  regDate: Date;
  modDate: Date;
}

export interface PopularityResponse {
  statusCode: number;
  status: string;
  message: string;
  data: Popularity[];
}

export interface Popularity {
  pid: number;
  pcategory: string;
  pname: string;
  pexplain: string;
  pprice: number;
  del: boolean;
  mid: number;
  regDate: Date;
  modDate: Date;
  imageDTOList: ImageDTOList[];
  mname: null;
}

export interface CreateChatRoomResponse {
  statusCode: number;
  status: string;
  message: string;
  data: ChatRoomData;
}

export interface ChatRoomData {
  chatParticipantsId: number;
  chatParticipantsMemberId: number;
  chatParticipantsMemberName: string;
  chatParticipantsDel: boolean;
  chatRoomResponseDTO: ChatRoomResponseDTO;
}

export interface ChatRoomResponseDTO {
  chatRoomId: number;
  chatName: string;
  chatCreator: number;
  chatDel: boolean;
}

export interface MessageResponse {
  statusCode: number;
  message: string;
  data: MessageData;
}

export interface MessageData {
  chatMessageId: number;
  chatMessageSenderId: number;
  chatMessageSerderName: string;
  chatMessageContent: string;
  chatMessageRead: boolean;
  chatMessageDel: boolean;
  regDate: Date;
  modDate: Date;
}

export interface ChatRoomsResponse {
  statusCode: number;
  status: string;
  message: string;
  data: ChatRoomsData[];
}

export interface ChatRoomsData {
  chatMessageResponseDTO: ChatMessageResponseDTO;
  chatParticipantsResponseDTO: ChatParticipantsResponseDTO;
  notReadCount: number;
}

export interface ChatMessageResponseDTO {
  chatMessageId: number;
  chatMessageSenderId: number;
  chatMessageSerderName: string;
  chatMessageContent: string | null;
  chatMessageRead: boolean;
  chatMessageDel: boolean;
  regDate: Date;
  modDate: Date;
}

export interface ChatParticipantsResponseDTO {
  chatParticipantsId: number;
  chatParticipantsMemberId: number;
  chatParticipantsMemberName: string;
  chatParticipantsDel: boolean;
  chatRoomResponseDTO: ChatRoomResponseDTO;
}

export interface ChatRoomResponseDTO {
  chatRoomId: number;
  chatName: string;
  chatCreator: number;
  chatCreatorName: string;
  chatDel: boolean;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  mid: number;
  email: string;
  name: string | null;
  address: string;
  phone: string;
  social: string;
  del: false;
}

export interface SocialResponse {
  statusCode: number;
  status: string;
  data?: Partial<Tokens> & User;
}

export interface EditProfileResponse {
  statusCode: number;
  status: string;
  message: string;
  data?: Tokens;
}

export interface MessageListResponse {
  statusCode: number;
  status: string;
  message: string;
  data: MessageListData;
}

export interface MessageListData {
  dtoList: MessageData[];
  totalPage: number;
  page: number;
  size: number;
  start: number;
  end: number;
  prev: boolean;
  next: boolean;
  pageList: number[];
}
