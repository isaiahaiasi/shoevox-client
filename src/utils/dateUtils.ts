import { formatRelative } from 'date-fns';

// eslint-disable-next-line import/prefer-default-export
export function getTimestampText(timestamp: string) {
  return formatRelative(new Date(timestamp), new Date());
}
