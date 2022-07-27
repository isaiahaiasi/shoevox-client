import { PaginatedOperationId, PaginatedResponseData, zSchemas } from '@isaiahaiasi/voxelatlas-spec';
import React from 'react';
import { InfiniteData } from 'react-query';
import { z } from 'zod';

// TODO: extract to spec lib
type PaginatedResponse<S extends PaginatedOperationId> = z.infer<typeof zSchemas.responses[S]>;

interface Params<S extends PaginatedOperationId> {
  data: InfiniteData<PaginatedResponse<S>>,
  renderFn: (item: PaginatedResponseData<S>) => React.ReactNode;
}

/** Helper Component to abstract nested map nonsense */
export default function PaginatedData<S extends PaginatedOperationId>(
  { data, renderFn }: Params<S>,
) {
  return (
    <div>
      {data.pages
        .filter((page: PaginatedResponse<S>) => page.data.length)
        .map((page: PaginatedResponse<S>) => (
          <React.Fragment key={page.data[0].id}>
            {page.data.map(renderFn)}
          </React.Fragment>
        ))}
    </div>
  );
}
