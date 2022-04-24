import { useLayoutEffect } from 'react';
import {
  getFeedingsAsync,
  selectFeatureIsLoading,
  selectFeatureItems,
  selectSelectedFeatureItem,
} from '../store/feedingSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';

import { FeedingDataGrid } from '../components/FeedingDataGrid';
import { FeedingForm } from '../components/FeedingForm';

export function FeedingContainer() {
  /* Shortcuts */
  const dispatch = useAppDispatch();

  /* Selectors */
  const feedings = useAppSelector(selectFeatureItems);
  const selectedFeeding = useAppSelector(selectSelectedFeatureItem);
  const selectFeedingIsLoading = useAppSelector(selectFeatureIsLoading);
  // const starters = useAppSelector(selectFeatureItems);

  /* - Trigger initial get call here */
  useLayoutEffect(() => {
    dispatch(getFeedingsAsync());
  }, [dispatch]);

  /* Testing */

  /* Markup */
  return (
    <>
      <FeedingForm
        isLoading={selectFeedingIsLoading}
        selectedFeeding={selectedFeeding}
      />
      <FeedingDataGrid feedings={feedings} />
    </>
  );
}
