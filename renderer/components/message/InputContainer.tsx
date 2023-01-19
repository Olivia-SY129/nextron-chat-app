import { styled } from "@mui/material";
import { MARGIN } from "../../pages/chat-room/[id]";

const InputContainer = styled("form")(() => {
  return {
    display: "grid",
    gridTemplateColumns: "1fr 100px",
    gap: 10,
    backgroundColor: "white",
    margin: MARGIN,
  };
});

export default InputContainer;
