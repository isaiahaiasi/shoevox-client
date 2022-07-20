import React from 'react';
import { InfiniteData } from 'react-query';
import { ApiPageData, RootApiObject } from '../../types/apiTypes';

interface Params<T extends RootApiObject> {
  data: InfiniteData<ApiPageData<T>>,
  renderFn: (item: T) => React.ReactNode;
}

/** Helper Component to abstract nested map nonsense */
export default function PaginatedData<T extends RootApiObject>(
  { data, renderFn }: Params<T>,
) {
  return (
    <div>
      {data.pages.map((page: ApiPageData<T>) => (
        <React.Fragment key={page.data[0].id}>
          {page.data.map(renderFn)}
        </React.Fragment>
      ))}
    </div>
  );
}
