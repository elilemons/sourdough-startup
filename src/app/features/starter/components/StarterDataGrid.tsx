import {
    GridCallbackDetails, GridCellEditCommitParams, GridColDef, GridRowId, MuiBaseEvent, MuiEvent
} from '@mui/x-data-grid';

import { Labels } from '../../../../enums';
import { camelCase } from '../../../../utils';
import { useAppDispatch } from '../../../hooks';
import { AppBox } from '../../../shared/AppBox/AppBox';
import { AppDataGrid } from '../../../shared/AppDataGrid/AppDataGrid';
import {
    deleteStarterAsync, setSelectedFeatureId, updateStarterAsync
} from '../store/starterSlice';

interface Props {
  starters: Starter[];
}

export function StarterDataGrid(props: Props) {
  /* Shortcuts */
  const { starters } = props;
  const dispatch = useAppDispatch();

  /* Page Logic */
  const onRowClick = (id: GridRowId) => {
    // TODO Remove this test code
    console.log('ELITEST onRowClick', { id });
    // ^ TODO Remove this test code
    return dispatch(setSelectedFeatureId(id as string));
  };
  const onDeleteClick = (id: GridRowId) =>
    dispatch(deleteStarterAsync(id as string));

  const onCellEditCommit = (
    params: GridCellEditCommitParams,
    event: MuiEvent<MuiBaseEvent>,
    details: GridCallbackDetails
  ) => {
    // TODO Remove this test code
    console.log('ELITEST onCellEditCommit', { params, event, details });
    //^ TODO Remove this test code
    const newItem = starters
      .filter((item) => item.id === params.id)
      .map((item) => ({
        ...item,
        [params.field]: params.value,
      }));
    // TODO Remove this test code
    console.log('ELITEST onCellEditCommit', { newItem });
    //^ TODO Remove this test code
    dispatch(updateStarterAsync({ ...newItem[0] } as Starter));
  };
  /* - Columns */
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: Labels.ID,
      hide: true,
    },
    {
      field: camelCase(Labels.ACQUIRED),
      headerName: Labels.ACQUIRED,
      flex: 1,
      editable: true,
      type: 'date',
    },
    {
      field: camelCase(Labels.NAME),
      headerName: Labels.NAME,
      flex: 3,
      editable: true,
      type: 'string',
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
      <AppBox title={Labels.STARTERS} height={500}>
        <AppDataGrid
          rows={starters}
          columns={columns}
          rowIdKey={'id'}
          onCellEditCommit={onCellEditCommit}
          onRowClick={onRowClick}
          onDeleteClick={onDeleteClick}
          includeActions={true}
          sortModel={[
            {
              field: camelCase(Labels.ACQUIRED),
              sort: 'asc',
            },
          ]}
        />
      </AppBox>
    </>
  );
}
