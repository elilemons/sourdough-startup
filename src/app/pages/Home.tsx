import { useLayoutEffect } from 'react';
import {
  getFeedingsAsync,
  selectFeatureItems,
} from '../features/feeding/feedingSlice';
import { useAppDispatch, useAppSelector } from '../hooks';

import { Feeding } from '../features/feeding/Feeding';
import { AppBar, Container, Paper, Stack, Typography } from '@mui/material';
import { AppBox } from '../shared/AppBox/AppBox';

export function Home() {
  /* Shortcuts */
  const dispatch = useAppDispatch();

  /* Selectors */
  const feedings = useAppSelector(selectFeatureItems);

  /* Page Logic */
  /* - Trigger initial get call here */
  useLayoutEffect(() => {
    dispatch(getFeedingsAsync());
  });

  /* Testing */

  /* Markup */
  return (
    <>
      <AppBox title='Welcome to Sourdough Startup'>
        <Typography variant='body1' component='p'>
          Here you can see this app in component mode. Use the navigation menu
          to view it in page mode.
        </Typography>
      </AppBox>

      <Stack direction='row' spacing={3}>
        <Stack width={'50%'}>
          <Feeding feedings={feedings} />
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
