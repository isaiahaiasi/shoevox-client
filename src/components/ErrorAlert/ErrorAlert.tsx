/* eslint-disable react/require-default-props */
import { Alert, AlertTitle } from '@mui/material';

interface ErrorProps {
  title?: string;
  content?: string;
}

export default function Error({ title, content }: ErrorProps) {
  return (
    <Alert severity="error">
      <AlertTitle>{title ?? 'Error'}</AlertTitle>
      {content ?? 'Something went wrong!'}
    </Alert>
  );
}
