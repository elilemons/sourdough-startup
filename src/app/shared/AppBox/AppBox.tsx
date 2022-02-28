import {
  AppBar,
  Card,
  Container,
  Stack,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';

interface Props {
  title: string;
  children?: JSX.Element | JSX.Element[];
  height?: number | string;
  width?: number | string;
  sx?: SxProps<Theme>;
}
export function AppBox({ children, title, height, width, sx }: Props) {
  return (
    <Stack sx={{ ...sx, flex: 1, width: width }}>
      <AppBar position='static' color='secondary' component='div'>
        <Container maxWidth='xl' sx={{ px: 3, py: 1 }}>
          <Typography variant='button' component='div'>
            {title}
          </Typography>
        </Container>
      </AppBar>
      <Card sx={{ height: '100%', mb: 3 }}>
        <Container
          maxWidth='xl'
          sx={{ p: 3, height: height ? height : 'inherit' }}
        >
          {children}
        </Container>
      </Card>
    </Stack>
  );
}
