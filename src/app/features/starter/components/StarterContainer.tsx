import { useLayoutEffect } from 'react';
import {
  getStartersAsync,
  selectStarterIsLoading,
  selectStarters,
  selectSelectedStarter,
} from '../store/starterSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';

import { StarterDataGrid } from './StarterDataGrid';
import { StarterForm } from './StarterForm';

export function StarterContainer() {
  /* Shortcuts */
  const dispatch = useAppDispatch();

  /* Selectors */
  const starters = useAppSelector(selectStarters);
  const selectedStarter = useAppSelector(selectSelectedStarter);
  const starterIsLoading = useAppSelector(selectStarterIsLoading);

  /* - Trigger initial get call here */
  useLayoutEffect(() => {
    dispatch(getStartersAsync());
  }, [dispatch]);

  /* Testing */

  /* Markup */
  return (
    <>
      <StarterForm
        isLoading={starterIsLoading}
        selectedStarter={selectedStarter}
      />
      <StarterDataGrid starters={starters} />
    </>
  );
}
