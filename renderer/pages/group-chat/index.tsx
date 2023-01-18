import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import ChatBox from "../../components/chat/ChatBox";
import GroupChatConatiner from "../../components/chat/GroupChatConatiner";
import UserAddForm from "../../components/chat/UserAddForm";
import { ButtonContainer } from "../../components/common/ButtonContainer";
import Layout from "../../components/common/Layout";
import { auth } from "../../lib/firebase/app";
import {
  addChatRooms,
  addUserInChatRoom,
  getChatRoomList,
} from "../../lib/firebase/chats";
import { getUserList } from "../../lib/firebase/users";

const GroupChatPage = () => {
  const [chatRooms, setChatRooms] = useState([]);

  const handleCreateChat = () => {
    addChatRooms([auth.currentUser.email], { isGroup: true });
  };

  const handleAddUser =
    (chatRoomId: string, currentUsers: string[]) =>
    async (e: React.FormEvent) => {
      e.preventDefault();

      const target = e.target as typeof e.target & {
        user: {
          value: string;
        };
      };
      const userToAdd = target.user.value;

      if (currentUsers.includes(userToAdd)) {
        alert("이미 존재하는 유저입니다");
        return;
      }

      const userDtoList = await getUserList();
      const userList = userDtoList.map((userDto) => userDto.email);

      if (userList.includes(userToAdd)) {
        addUserInChatRoom(chatRoomId, userToAdd);
        target.user.value = "";
      } else {
        alert("존재하지 않는 유저입니다");
      }
    };

  useEffect(() => {
    getChatRoomList(auth.currentUser?.email, setChatRooms, { isGroup: true });
  }, []);

  return (
    <Layout>
      <ButtonContainer>
        <Button variant="contained" onClick={handleCreateChat}>
          그룹 채팅방 생성하기
        </Button>
      </ButtonContainer>
      {chatRooms.map((chatRoom) => (
        <GroupChatConatiner key={chatRoom.id}>
          <ChatBox chatRoomId={chatRoom.id} users={chatRoom.users} />
          <UserAddForm onSubmit={handleAddUser(chatRoom.id, chatRoom.users)}>
            <TextField
              type="text"
              name="user"
              size="small"
              placeholder="이메일을 적어주세요"
            />
            <Button type="submit">인원 추가하기</Button>
          </UserAddForm>
        </GroupChatConatiner>
      ))}
    </Layout>
  );
};

export default GroupChatPage;
