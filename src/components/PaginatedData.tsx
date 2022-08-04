import { PaginatedOperationId, PaginatedResponse, PaginatedResponseData } from '@isaiahaiasi/voxelatlas-spec';
import React from 'react';
import { InfiniteData } from '@tanstack/react-query';
import { Stack } from './primitives';

interface PaginatedDataProps<S extends PaginatedOperationId> {
  pages: InfiniteData<PaginatedResponse<S>>['pages'],
  renderFn: (item: PaginatedResponseData<S>) => React.ReactNode;
}

/** Helper Component to abstract nested map nonsense */
export default function PaginatedData<S extends PaginatedOperationId>(
  { pages, renderFn }: PaginatedDataProps<S>,
) {
  return (
    <Stack>{pages
      .filter((page: PaginatedResponse<S>) => page.data.length > 0)
      .map(({ data }: PaginatedResponse<S>) => (
        <React.Fragment key={data[0].id}>
          {data.map((instanceData) => (
            <div key={instanceData.id}>
              {renderFn(instanceData)}
            </div>
          ))}
        </React.Fragment>
      ))}
    </Stack>
  );
}
