import SendIcon from '@mui/icons-material/Send';
import { Button, styled, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import InputContainer from '../../components/chat/InputContainer';
import MessageBox from '../../components/chat/MessageBox';
import ErrorMsg from '../../components/common/ErrorMessage';
import Layout from '../../components/common/Layout';
import { addMessage, getMessageList } from '../../lib/firebase/chats';
import { removeWhiteSpace } from '../../lib/string';
import { TMessage } from '../../lib/types';

export const MARGIN = 20;

const Container = styled('div')(() => {
  return {
    display: 'grid',
    height: 'calc(100vh - 117px)',
    gridTemplateRows: '90% 10%',
    marginTop: 0,
  };
});

const MessageContainer = styled('div')(() => {
  return {
    overflowY: 'scroll',
    display: 'flex',
    flexDirection: 'column',
    padding: MARGIN,
    paddingTop: 0,
    paddingBottom: 0,
    overflowAnchor: 'none',
  };
});

const Anchor = styled('div')(() => {
  return {
    overflowAnchor: 'auto',
    height: 1,
  };
});

const ChatRoom = () => {
  const router = useRouter();
  const { id: chatRoomId } = router.query;
  const msgRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();

    // 에러 메세지 초기화
    setErrorMsg('');

    const value = e.target['msg-input'].value;

    if (removeWhiteSpace(value) === '') {
      setErrorMsg('내용을 입력해주세요');
      return;
    }

    if (typeof chatRoomId === 'string') {
      const isSent = await addMessage(value, chatRoomId);

      if (!isSent) {
        setErrorMsg('메세지 전송 실패!');
        return;
      }
    }

    // 메세지 전송 성공 시 input 내용 삭제
    // (통신이 느릴 경우 input이 느리게 지워질 수 있음)
    e.target['msg-input'].value = '';
  };

  useEffect(() => {
    if (typeof chatRoomId === 'string') {
      getMessageList(chatRoomId, setMessages);
    }

    const config = { childList: true };

    const callback: MutationCallback = (mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          msgRef.current.scrollTo(0, msgRef.current.scrollHeight);
        }
      }
    };

    const observer = new MutationObserver(callback);
    observer.observe(msgRef.current, config);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Layout>
      <Container>
        <MessageContainer ref={msgRef}>
          {messages.map((message) => (
            <MessageBox
              key={message.id}
              name={message.user}
              content={message.text}
            ></MessageBox>
          ))}
          <Anchor></Anchor>
          {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
        </MessageContainer>
        <InputContainer onSubmit={handleSend}>
          <TextField
            variant="outlined"
            type="text"
            name="msg-input"
            autoFocus
          />
          <Button
            variant="contained"
            size="large"
            endIcon={<SendIcon />}
            type="submit"
          >
            Send
          </Button>
        </InputContainer>
      </Container>
    </Layout>
  );
};

export default ChatRoom;
