import { styled } from '@mui/material';

export const ButtonContainer = styled('div')(({ theme }) => ({
  padding: 10,
  display: 'flex',
  justifyContent: 'center',
  borderBottom: `2px solid ${theme.palette.primary.main}`,
}));
