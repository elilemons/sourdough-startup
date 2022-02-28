import { Delete } from '@mui/icons-material';
import {
  DataGrid,
  GridActionsCellItem,
  GridCallbackDetails,
  GridCellEditCommitParams,
  GridColDef,
  GridRowId,
  GridRowParams,
  GridSortingInitialState,
  GridSortModel,
  MuiBaseEvent,
  MuiEvent,
} from '@mui/x-data-grid';
import { Labels } from '../../../enums';
import { camelCase } from '../../../utils';
interface Props<T> {
  columns: GridColDef[];
  rows: T[];
  rowIdKey: string;

  includeActions?: boolean;

  sortModel?: GridSortModel;

  onRowClick: (id: GridRowId) => void;
  onCellEditCommit: (
    params: GridCellEditCommitParams,
    event: MuiEvent<MuiBaseEvent>,
    details: GridCallbackDetails
  ) => void;
  onDeleteClick?: (id: GridRowId) => void;
}

export function AppDataGrid<T extends { [key: string]: any }>({
  columns,
  includeActions,
  rows,
  rowIdKey,
  sortModel,

  onRowClick,
  onDeleteClick,
  onCellEditCommit,
}: Props<T>) {
  /* State */
  /* The markup */
  return (
    <>
      <DataGrid
        initialState={{
          sorting: {
            sortModel: sortModel,
          },
        }}
        rows={rows}
        columns={
          !includeActions
            ? columns
            : columns.concat({
                field: 'actions',
                type: 'actions',
                width: 80,
                getActions: (params: GridRowParams) => [
                  <GridActionsCellItem
                    color='error'
                    icon={<Delete />}
                    label={Labels.DELETE}
                    onClick={
                      onDeleteClick ? () => onDeleteClick(params.id) : () => {}
                    }
                  />,
                ],
              } as GridColDef)
        }
        getRowId={(item) => item[rowIdKey]}
        onRowClick={(params: GridRowParams) => onRowClick(params.id)}
        onCellEditCommit={onCellEditCommit}
      />
    </>
  );
}
