import { useEffect, useState } from 'react';
import ChatBox from '../../components/chat/ChatBox';
import Layout from '../../components/common/Layout';
import { auth } from '../../lib/firebase/app';
import { getChatRoomList } from '../../lib/firebase/chats';
import { TChatRoom } from '../../lib/types';

const DirectMessagePage = () => {
  const [chatRooms, setChatRooms] = useState<TChatRoom[]>([]);

  useEffect(() => {
    getChatRoomList(auth.currentUser?.email, setChatRooms, { isGroup: false });
  }, []);

  return (
    <Layout>
      {chatRooms.map(
        (chatRoom) =>
          chatRoom.users.length === 2 && (
            <ChatBox
              key={chatRoom.id}
              chatRoomId={chatRoom.id}
              users={chatRoom.users.filter(
                (user: string) => user !== auth.currentUser?.email
              )}
            />
          )
      )}
    </Layout>
  );
};

export default DirectMessagePage;
