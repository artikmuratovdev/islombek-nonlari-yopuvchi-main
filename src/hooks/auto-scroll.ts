import { useEffect, useRef } from "react";

export const useAutoScroll = () => {
  const chatRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      if (chatRef.current) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
    }, 100);
  }, [chatRef.current?.children?.length]);

  return chatRef;
};
