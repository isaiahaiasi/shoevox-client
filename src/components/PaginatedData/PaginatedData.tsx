import { RootPaginatedResponse } from '@isaiahaiasi/voxelatlas-spec';
import React from 'react';
import { InfiniteData } from 'react-query';

interface Params<T extends RootPaginatedResponse> {
  data: InfiniteData<T>,
  renderFn: (item: T) => React.ReactNode;
}

/** Helper Component to abstract nested map nonsense */
export default function PaginatedData<T extends RootPaginatedResponse>(
  { data, renderFn }: Params<T>,
) {
  return (
    <div>
      {data.pages.map((page: T) => (
        <React.Fragment key={page.data[0].id}>
          {page.data.map(renderFn)}
        </React.Fragment>
      ))}
    </div>
  );
}
