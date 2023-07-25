import { useEffect, useState } from 'react';

export const useAutoScroll = () => {
  const [chatListElement, setChatListElement] =
    useState<HTMLUListElement | null>(null);

  useEffect(() => {
    if (chatListElement) {
      chatListElement.scroll({
        top: chatListElement.scrollHeight,
      });

      const observer = new MutationObserver(mutations => {
        const target = mutations[0].target as HTMLUListElement;

        target.scrollTo({
          top: target.scrollHeight,
        });
      });

      observer.observe(chatListElement, {
        childList: true,
      });

      return () => {
        observer.disconnect();
      };
    }
  }, [chatListElement]);

  return {
    setChatListElement,
    chatListElement,
  };
};
