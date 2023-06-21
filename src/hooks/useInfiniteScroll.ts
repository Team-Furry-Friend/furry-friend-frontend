import { useEffect, useRef, useState } from 'react';

interface useInfiniteScrollProps<G> {
  fetcher: (page: number) => Promise<G[]>;
  viewPerPage: number;
  initialPage?: number;
}

const useInfiniteScroll = <T>({
  fetcher,
  viewPerPage,
  initialPage = 1,
}: useInfiniteScrollProps<T>) => {
  const [postsGroup, setPostsGroup] = useState<T[][]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  const spinnerRef = useRef<HTMLUListElement>(null);
  const page = useRef(initialPage);

  useEffect(() => {
    const observer = new IntersectionObserver(async entries => {
      if (
        entries[0].isIntersecting &&
        entries[0].intersectionRatio > 0 &&
        !isLoading
      ) {
        setIsLoading(true);
        const fetchedPosts = (await fetcher(page.current++)) as T[];

        setPostsGroup(prev => [...prev, fetchedPosts]);

        if (fetchedPosts.length < viewPerPage) {
          setIsEnd(true);
          spinnerRef.current!.style.display = 'none';
        }

        setIsLoading(false);
      }
    });

    spinnerRef.current && observer.observe(spinnerRef.current);
  }, []);

  return {
    postsGroup,
    isLoading,
    spinnerRef,
    isEnd,
    page,
  };
};

export default useInfiniteScroll;
