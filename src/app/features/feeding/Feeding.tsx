import { Labels } from '../../../enums';
import { camelCase } from '../../../utils';

import { GridColDef } from '@mui/x-data-grid';
import { AppDataGrid } from '../../shared/AppDataGrid/AppDataGrid';

interface Props {
  feedings: Feeding[];
}

export function Feeding(props: Props) {
  /* Shortcuts */
  const { feedings } = props;

  /* Testing */
  // TODO Remove this test code
  console.log('ELITEST Feeding Component', { feedings });
  //^ TODO Remove this test code

  /* - Columns */
  const columns: GridColDef[] = [
    {
      field: '_id',
      headerName: Labels.ID,
      hide: true,
    },
    {
      field: camelCase(Labels.AMOUNT),
      headerName: Labels.AMOUNT,
      flex: 1,
      editable: true,
      type: 'amount',
    },
    {
      field: camelCase(Labels.DATE),
      headerName: Labels.DATE,
      flex: 1,
      editable: true,
      type: 'date',
    },
    {
      field: camelCase(Labels.NOTES),
      headerName: Labels.NOTES,
      flex: 3,
      editable: true,
      type: 'string',
    },
  ];
  /* Markup */
  return (
    <>
      <AppDataGrid rows={feedings} columns={columns} rowIdKey={Labels._ID} />
    </>
  );
}
