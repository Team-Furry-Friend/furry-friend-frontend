import { products } from '@/libs/api';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import BannerSwiper from '@/app/(main)/BannerSwiper';

const Banner = async () => {
  const posts = await products.getPopularity();

  return <BannerSwiper posts={posts} />;
};

export default Banner;
