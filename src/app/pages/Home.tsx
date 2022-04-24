import { Stack, Typography } from '@mui/material';
import { AppBox } from '../shared/AppBox/AppBox';
import { FeedingContainer } from '../features/feeding/components/FeedingContainer';
import { StarterContainer } from '../features/starter/components/StarterContainer';

export function Home() {
  /* Markup */
  return (
    <>
      <Stack direction='row' spacing={2}>
        <AppBox title='Welcome to Sourdough Startup' sx={{ flex: 1 }}>
          <Typography variant='body1' component='p'>
            Here you can see this app in component mode. Use the navigation menu
            to view it in page mode.
          </Typography>
        </AppBox>
      </Stack>

      <Stack direction='row' spacing={3}>
        <Stack width={'50%'}>
          <FeedingContainer />
        </Stack>
        <Stack direction='column' width={'50%'} justifyContent='space-between'>
          <StarterContainer />
          {/* TODO Loaves */}
          <AppBox title='Loaves' />
        </Stack>
      </Stack>
    </>
  );
}
