'use client';

import { CompatClient } from '@stomp/stompjs';

const ChatList = ({ stompClient }: { stompClient: CompatClient }) => {
  return <div className='h-[calc(100%-48px)]'>ChatList</div>;
};

export default ChatList;
