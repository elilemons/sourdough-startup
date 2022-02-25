import { GridColDef, GridRowId } from '@mui/x-data-grid';
import { Labels } from '../../../../enums';
import { camelCase } from '../../../../utils';
import { useAppDispatch } from '../../../hooks';
import { AppBox } from '../../../shared/AppBox/AppBox';
import { AppDataGrid } from '../../../shared/AppDataGrid/AppDataGrid';
import { deleteFeature, setSelectedFeatureId } from '../store/feedingSlice';

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
    dispatch(deleteFeature(id as string));
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
          rowIdKey={Labels._ID}
          onRowClick={onRowClick}
          onDeleteClick={onDeleteClick}
          includeActions={true}
        />
      </AppBox>
    </>
  );
}
