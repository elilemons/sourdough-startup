import { useLayoutEffect } from 'react';
import {
  getFeedingsAsync,
  selectFeedingIsLoading,
  selectFeedings,
  selectSelectedFeeding,
} from '../store/feedingSlice';
import {
  getStartersAsync,
  selectStarters,
} from '../../starter/store/starterSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';

import { FeedingDataGrid } from '../components/FeedingDataGrid';
import { FeedingForm } from '../components/FeedingForm';

export function FeedingContainer() {
  /* Shortcuts */
  const dispatch = useAppDispatch();

  /* Selectors */
  const feedings = useAppSelector(selectFeedings);
  const selectedFeeding = useAppSelector(selectSelectedFeeding);
  const feedingIsLoading = useAppSelector(selectFeedingIsLoading);

  const starters = useAppSelector(selectStarters);

  /* - Trigger initial get call here */
  useLayoutEffect(() => {
    dispatch(getFeedingsAsync());
  }, [dispatch]);

  /* Testing */

  /* Markup */
  return (
    <>
      <FeedingForm
        isLoading={feedingIsLoading}
        selectedFeeding={selectedFeeding}
        starters={starters}
      />
      <FeedingDataGrid feedings={feedings} starters={starters} />
    </>
  );
}
