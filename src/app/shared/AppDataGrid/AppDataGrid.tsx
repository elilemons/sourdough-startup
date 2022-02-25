import { Delete } from '@mui/icons-material';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridRowParams,
} from '@mui/x-data-grid';
import { Labels } from '../../../enums';
interface Props<T> {
  columns: GridColDef[];
  rows: T[];
  rowIdKey: string;

  includeActions?: boolean;

  onRowClick: (id: GridRowId) => void;
  onDeleteClick?: (id: GridRowId) => void;
}

export function AppDataGrid<T extends { [key: string]: any }>({
  columns,
  includeActions,
  rows,
  rowIdKey,

  onRowClick,
  onDeleteClick,
}: Props<T>) {
  /* State */
  /* The markup */
  return (
    <>
      <DataGrid
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
      />
    </>
  );
}
