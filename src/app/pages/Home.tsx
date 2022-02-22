import { useLayoutEffect } from 'react';
import {
  getFeedingsAsync,
  selectFeatureItems,
} from '../features/feeding/feedingSlice';
import { useAppDispatch, useAppSelector } from '../hooks';

import { Feeding } from '../features/feeding/Feeding';
import { AppBar, Card, Container, Paper, Typography } from '@mui/material';

export function Home() {
  /* Shortcuts */
  const dispatch = useAppDispatch();

  /* Selectors */
  const feedings = useAppSelector(selectFeatureItems);

  /* Page Logic */
  /* - Trigger initial get call here */
  useLayoutEffect(() => {
    // TODO Remove this test code
    console.log('Home useLayoutEffect');
    //^ TODO Remove this test code
    dispatch(getFeedingsAsync());
  });

  /* Testing */

  /* Markup */
  return (
    <>
      <AppBar position='static'>
        <Typography sx={{ ml: 1, my: 1 }} variant='button' component='div'>
          Feedings
        </Typography>
      </AppBar>
      <Paper>
        <Container sx={{ p: 3, height: 500 }}>
          <Feeding feedings={feedings} />
        </Container>
      </Paper>
    </>
  );
}