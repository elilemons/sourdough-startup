import { useLayoutEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectStarters } from '../../starter/store/starterSlice';
import { FeedingDataGrid } from '../components/FeedingDataGrid';
import { FeedingForm } from '../components/FeedingForm';
import {
    getFeedingsAsync, selectFeedingIsLoading, selectFeedings, selectSelectedFeeding
} from '../store/feedingSlice';

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
