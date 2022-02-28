import {
  GridCallbackDetails,
  GridCellEditCommitParams,
  GridColDef,
  GridRowId,
  GridSortingInitialState,
  MuiBaseEvent,
  MuiEvent,
} from '@mui/x-data-grid';
import { Labels } from '../../../../enums';
import { camelCase } from '../../../../utils';
import { useAppDispatch } from '../../../hooks';
import { AppBox } from '../../../shared/AppBox/AppBox';
import { AppDataGrid } from '../../../shared/AppDataGrid/AppDataGrid';
import {
  deleteFeedingAsync,
  setSelectedFeatureId,
  updateFeedingAsync,
} from '../store/feedingSlice';

interface Props {
  feedings: Feeding[];
}

export function FeedingDataGrid(props: Props) {
  /* Shortcuts */
  const { feedings } = props;
  const dispatch = useAppDispatch();

  /* Page Logic */
  const onRowClick = (id: GridRowId) =>
    dispatch(setSelectedFeatureId(id as string));
  const onDeleteClick = (id: GridRowId) =>
    dispatch(deleteFeedingAsync(id as string));

  const onCellEditCommit = (
    params: GridCellEditCommitParams,
    event: MuiEvent<MuiBaseEvent>,
    details: GridCallbackDetails
  ) => {
    // TODO Remove this test code
    console.log('ELITEST onCellEditCommit', { params, event, details });
    //^ TODO Remove this test code
    const newItem = feedings
      .filter((item) => item.id === params.id)
      .map((item) => ({
        ...item,
        [params.field]: params.value,
      }));
    // TODO Remove this test code
    console.log('ELITEST onCellEditCommit', { newItem });
    //^ TODO Remove this test code
    dispatch(updateFeedingAsync({ ...newItem[0] } as Feeding));
  };
  /* - Columns */
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: Labels.ID,
      hide: true,
    },
    {
      field: camelCase(Labels.AMOUNT),
      headerName: Labels.AMOUNT,
      flex: 1,
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
      <AppBox title={Labels.FEEDINGS} height={500}>
        <AppDataGrid
          rows={feedings}
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
