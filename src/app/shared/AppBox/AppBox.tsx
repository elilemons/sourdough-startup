import { AppBar, Card, Container, Stack, Typography } from '@mui/material';

interface Props {
  title: string;
  children?: JSX.Element | JSX.Element[];
  height?: number | string;
}
export function AppBox({ children, title, height }: Props) {
  return (
    <Stack sx={{ flex: 1 }}>
      <AppBar position='static' color='secondary'>
        <Container sx={{ px: 3, py: 1 }}>
          <Typography variant='button' component='div'>
            {title}
          </Typography>
        </Container>
      </AppBar>
      <Card sx={{ height: '100%', mb: 3 }}>
        <Container sx={{ p: 3, height: height ? height : 'inherit' }}>
          {children}
        </Container>
      </Card>
    </Stack>
  );
}
