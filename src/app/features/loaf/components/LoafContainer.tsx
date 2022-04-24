import { useLayoutEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectStarters } from '../../starter/store/starterSlice';
import { LoafDataGrid } from './LoafDataGrid';
import { LoafForm } from './LoafForm';
import {
  getLoavesAsync,
  selectLoafIsLoading,
  selectLoaves,
  selectSelectedLoaf,
} from '../store/loafSlice';

export function LoafContainer() {
  /* Shortcuts */
  const dispatch = useAppDispatch();

  /* Selectors */
  const loaves = useAppSelector(selectLoaves);
  const selectedLoaf = useAppSelector(selectSelectedLoaf);
  const loafIsLoading = useAppSelector(selectLoafIsLoading);

  const starters = useAppSelector(selectStarters);

  /* - Trigger initial get call here */
  useLayoutEffect(() => {
    dispatch(getLoavesAsync());
  }, [dispatch]);

  /* Testing */

  /* Markup */
  return (
    <>
      <LoafForm
        isLoading={loafIsLoading}
        selectedLoaf={selectedLoaf}
        starters={starters}
      />
      <LoafDataGrid loaves={loaves} starters={starters} />
    </>
  );
}
