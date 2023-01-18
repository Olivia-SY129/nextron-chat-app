import { styled } from "@mui/material";

const ErrorMsg = styled("span")(({ theme }) => {
  return {
    margin: theme.spacing(2),
    color: theme.palette.error.main,
    fontSize: theme.typography.caption.fontSize,
  };
});

export default ErrorMsg;
