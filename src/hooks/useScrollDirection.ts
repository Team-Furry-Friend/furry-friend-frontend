import { useEffect, useRef, useState } from 'react';

const useScrollDirection = ({ target }: { target: HTMLElement | null }) => {
  const [isDown, setIsDown] = useState(true);
  const lastScrollY = useRef(target?.scrollHeight || 0);

  useEffect(() => {
    if (target) {
      const handleScroll = () => {
        const { scrollTop } = target;

        setIsDown(scrollTop > lastScrollY.current);

        lastScrollY.current = scrollTop;
      };

      target.addEventListener('scroll', handleScroll);

      return () => {
        target.removeEventListener('scroll', handleScroll);
      };
    }
  }, [target]);

  return isDown;
};

export default useScrollDirection;
