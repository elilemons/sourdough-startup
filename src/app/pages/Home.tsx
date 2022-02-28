import { Stack, Typography } from '@mui/material';
import { AppBox } from '../shared/AppBox/AppBox';
import { FeedingContainer } from '../features/feeding/components/FeedingContainer';

export function Home() {
  /* Markup */
  return (
    <>
      <Stack direction='row' spacing={2}>
        <AppBox title='Welcome to Sourdough Startup' width='50%'>
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
        <Stack
          direction='column'
          width={'50%'}
          justifyContent='space-between'
          spacing={3}
        >
          {/* TODO Starters and Loaves */}
          <AppBox title='Starters' />
          <AppBox title='Loaves' />
        </Stack>
      </Stack>
    </>
  );
}
