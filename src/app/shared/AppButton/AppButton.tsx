import { LoadingButton } from '@mui/lab';
import { BaseSyntheticEvent } from 'react';

interface Props {
  label: string;
  type: 'button' | 'submit';
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
    | undefined;
  isLoading?: boolean;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;

  onClick?: (event: BaseSyntheticEvent) => void;
}

export function AppButton({
  isLoading,
  label,
  startIcon,
  type,
  endIcon,
  color,

  onClick,
}: Props) {
  return (
    <LoadingButton
      color={color}
      endIcon={endIcon}
      loading={isLoading}
      startIcon={startIcon}
      onClick={onClick}
      type={type}
    >
      {label}
    </LoadingButton>
  );
}
