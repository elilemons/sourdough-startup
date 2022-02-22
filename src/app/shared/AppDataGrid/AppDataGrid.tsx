import { DataGrid, GridColDef } from '@mui/x-data-grid';
interface Props<T> {
  columns: GridColDef[];
  rows: T[];
  rowIdKey: string;
}

export function AppDataGrid<T extends { [key: string]: any }>(props: Props<T>) {
  /* Shortcuts */
  const { columns, rows, rowIdKey } = props;

  /* State */
  /* The markup */
  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(item) => item[rowIdKey]}
      />
    </>
  );
}
