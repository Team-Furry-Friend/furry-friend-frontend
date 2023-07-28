import { useEffect, useRef, useState } from 'react';

interface useInfiniteScrollProps<G> {
  fetcher: (page: number) => Promise<G[]>;
  viewPerPage: number;
  initialPage?: number;
  onFetched?: (data: G[]) => void;
}

const useInfiniteScroll = <T>({
  fetcher,
  viewPerPage,
  initialPage = 1,
  onFetched,
}: useInfiniteScrollProps<T>) => {
  const [postsGroup, setPostsGroup] = useState<T[][]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  const [spinner, setSpinner] = useState<HTMLUListElement | null>(null);
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

        onFetched && onFetched(fetchedPosts);

        setPostsGroup(prev => [...prev, fetchedPosts]);

        if (fetchedPosts.length < viewPerPage) {
          setIsEnd(true);
          spinner!.style.display = 'none';
        }

        setIsLoading(false);
      }
    });

    spinner && observer.observe(spinner);

    return () => {
      observer.disconnect();
    };
  }, [spinner]);

  return {
    postsGroup,
    isLoading,
    setSpinner,
    isEnd,
    page,
    setPostsGroup,
  };
};

export default useInfiniteScroll;
