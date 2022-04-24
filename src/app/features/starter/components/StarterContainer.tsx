import { useLayoutEffect } from 'react';
import {
  getStartersAsync,
  selectFeatureIsLoading,
  selectFeatureItems,
  selectSelectedFeatureItem,
} from '../store/starterSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';

import { StarterDataGrid } from './StarterDataGrid';
import { StarterForm } from './StarterForm';

export function StarterContainer() {
  /* Shortcuts */
  const dispatch = useAppDispatch();

  /* Selectors */
  const starters = useAppSelector(selectFeatureItems);
  const selectedStarter = useAppSelector(selectSelectedFeatureItem);
  const selectStarterIsLoading = useAppSelector(selectFeatureIsLoading);
  // const starters = useAppSelector(selectFeatureItems);

  /* - Trigger initial get call here */
  useLayoutEffect(() => {
    dispatch(getStartersAsync());
  }, [dispatch]);

  /* Testing */

  /* Markup */
  return (
    <>
      <StarterForm
        isLoading={selectStarterIsLoading}
        selectedStarter={selectedStarter}
      />
      <StarterDataGrid starters={starters} />
    </>
  );
}
