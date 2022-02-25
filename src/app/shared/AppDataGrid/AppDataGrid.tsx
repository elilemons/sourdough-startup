import {
  DataGrid,
  GridColDef,
  GridRowId,
  GridRowParams,
} from '@mui/x-data-grid';
interface Props<T> {
  columns: GridColDef[];
  rows: T[];
  rowIdKey: string;

  onRowClick: (id: GridRowId) => void;
}

export function AppDataGrid<T extends { [key: string]: any }>({
  columns,
  rows,
  rowIdKey,

  onRowClick,
}: Props<T>) {
  /* State */
  /* The markup */
  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(item) => item[rowIdKey]}
        onRowClick={(params: GridRowParams) => onRowClick(params.id)}
      />
    </>
  );
}
