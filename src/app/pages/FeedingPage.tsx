import { useLayoutEffect } from 'react';
import {
  getFeedingsAsync,
  selectFeatureItems,
} from '../features/feeding/feedingSlice';
import { useAppDispatch, useAppSelector } from '../hooks';

import { Feeding } from '../features/feeding/Feeding';
import { AppBar, Container, Paper, Typography } from '@mui/material';
import { AppBox } from '../shared/AppBox/AppBox';

export function FeedingPage() {
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
      <Feeding feedings={feedings} />
    </>
  );
}
