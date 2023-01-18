import { styled } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getLastChat } from '../../lib/firebase/chats';

const Container = styled('div')(({ theme }) => {
  return {
    overflow: 'hidden',
    padding: 5,
    paddingLeft: 30,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderBottom: `1px solid ${theme.palette.primary.light}`,
    background: 'white',
    cursor: 'pointer',
    ':hover': {
      background: theme.palette.primary.contrastText,
    },
  };
});

const typoStyle = {
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  lineHeight: 2,
  display: 'inline-block',
  width: '300px',
};

interface Props {
  chatRoomId: string;
  users: string[];
}

const ChatBox = ({ chatRoomId, users }: Props) => {
  const router = useRouter();
  const [lastText, setLastText] = useState();

  useEffect(() => {
    getLastChat(chatRoomId, setLastText);
  }, []);

  return (
    <Container onClick={() => router.push(`/chat-room/${chatRoomId}`)}>
      <Typography variant="subtitle2">
        현재 입장한 유저: {users.join(', ')}
      </Typography>
      <Typography variant="subtitle1" sx={typoStyle}>
        {lastText}
      </Typography>
    </Container>
  );
};

export default ChatBox;
