import { useEffect, useState } from 'react';
import useScrollDirection from '@/hooks/useScrollDirection';

export const useAutoScroll = () => {
  const [chatListElement, setChatListElement] = useState<HTMLElement | null>(
    null
  );

  const isDown = useScrollDirection({ target: chatListElement });
  const [isFirst, setIsFirst] = useState(true);

  useEffect(() => {
    if (chatListElement) {
      isFirst &&
        chatListElement.scroll({
          top: chatListElement.scrollHeight,
        });

      setIsFirst(false);

      const observer = new MutationObserver(() => {
        chatListElement.scrollTo({
          top: isDown ? chatListElement.scrollHeight : 800,
        });
      });

      observer.observe(chatListElement, {
        childList: true,
        subtree: true,
      });

      return () => {
        observer.disconnect();
      };
    }
  }, [chatListElement, isDown]);

  return {
    setChatListElement,
    chatListElement,
  };
};
