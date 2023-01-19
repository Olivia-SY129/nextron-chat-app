import { styled } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { auth } from "../../lib/firebase/app";

interface IMessageType {
  name: string;
  user: string;
}

const Container = styled("div")<IMessageType>((props) => {
  return {
    display: "flex",
    justifyContent: props.name === props.user ? "flex-end" : "flex-start",
    flexWrap: "wrap",
  };
});

const Message = styled("div")<IMessageType>((props) => {
  return {
    padding: 10,
    marginTop: 10,
    minWidth: 200,
    maxWidth: 300,
    width: "fit-content",
    backgroundColor:
      props.name === props.user
        ? props.theme.palette.primary.main
        : props.theme.palette.primary.light,
    borderRadius: 5,
  };
});

const MessageBox = ({ name, content }) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    setUser(auth.currentUser?.email);
  }, []);

  return (
    <Container name={name} user={user}>
      <Message name={name} user={user}>
        <Typography variant="subtitle2" color="white">
          {name}
        </Typography>
        <Typography
          variant="subtitle1"
          color="white"
          sx={{
            wordBreak: "break-all",
          }}
        >
          {content}
        </Typography>
      </Message>
    </Container>
  );
};

export default MessageBox;
