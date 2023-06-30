import { api } from '@/libs/api';

import { PopularityResponse } from '@/types';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import BannerSwiper from '@/app/(main)/BannerSwiper';

const Banner = async () => {
  const {
    data: { data: posts },
  } = await api.get<PopularityResponse>('/products/popularity');

  return <BannerSwiper posts={posts} />;
};

export default Banner;
