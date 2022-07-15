import { Rating } from '@mui/material';
import {
  GridCallbackDetails,
  GridCellEditCommitParams,
  GridColDef,
  GridRenderCellParams,
  GridRowId,
  MuiBaseEvent,
  MuiEvent,
} from '@mui/x-data-grid';

import { Labels } from '../../../../enums';
import { camelCase } from '../../../../utils';
import { useAppDispatch } from '../../../hooks';
import { AppBox } from '../../../shared/AppBox/AppBox';
import { AppDataGrid } from '../../../shared/AppDataGrid/AppDataGrid';
import {
  deleteLoafAsync,
  setSelectedFeatureId,
  updateLoafAsync,
} from '../store/loafSlice';

interface Props {
  loaves: Loaf[];
  starters: Starter[];
}

export function LoafDataGrid({ loaves, starters }: Props) {
  /* Shortcuts */
  const dispatch = useAppDispatch();

  /* Page Logic */
  const onRowClick = (id: GridRowId) =>
    dispatch(setSelectedFeatureId(id as string));
  const onDeleteClick = (id: GridRowId) =>
    dispatch(deleteLoafAsync(id as string));

  const onCellEditCommit = (
    params: GridCellEditCommitParams,
    event: MuiEvent<MuiBaseEvent>,
    details: GridCallbackDetails
  ) => {
    // TODO Remove this test code
    console.log('ELITEST onCellEditCommit', { params, event, details });
    //^ TODO Remove this test code
    const newItem = loaves
      .filter((item) => item.id === params.id)
      .map((item) => ({
        ...item,
        [params.field]: params.value,
      }));
    // TODO Remove this test code
    console.log('ELITEST onCellEditCommit', { newItem });
    //^ TODO Remove this test code
    dispatch(updateLoafAsync({ ...newItem[0] } as Loaf));
  };
  /* - Columns */
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: Labels.ID,
      hide: true,
    },
    {
      field: 'starterId',
      headerName: Labels.STARTER,
      flex: 2,
      renderCell: (params: GridRenderCellParams) =>
        starters.find(
          (starter) =>
            params.row.starterId && starter.id === params.row.starterId[0]
        )?.name,
    },
    {
      field: camelCase(Labels.NAME),
      headerName: Labels.NAME,
      flex: 2,
      editable: true,
      type: 'string',
    },
    {
      field: camelCase(Labels.DATE),
      headerName: Labels.DATE,
      flex: 1,
      editable: true,
      type: 'date',
    },
    {
      field: camelCase(Labels.RATING),
      headerName: Labels.RATING,
      flex: 1,
      editable: true,
      type: 'date',
      renderCell: (params) => <Rating value={params.value} />,
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
      <AppBox title={Labels.LOAVES} height={500}>
        <AppDataGrid
          rows={loaves}
          columns={columns}
          rowIdKey={'id'}
          onCellEditCommit={onCellEditCommit}
          onRowClick={onRowClick}
          onDeleteClick={onDeleteClick}
          includeActions={true}
          sortModel={[
            {
              field: camelCase(Labels.DATE),
              sort: 'asc',
            },
          ]}
        />
      </AppBox>
    </>
  );
}
