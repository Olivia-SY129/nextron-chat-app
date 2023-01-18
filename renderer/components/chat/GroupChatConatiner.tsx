import { styled } from "@mui/material";

const GroupChatConatiner = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  paddingBottom: 10,
  borderBottom: `2px solid ${theme.palette.primary.main}`,
}));

export default GroupChatConatiner;
