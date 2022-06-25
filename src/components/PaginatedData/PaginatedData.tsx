import React from 'react';
import { InfiniteData } from 'react-query';

interface Params<T, D> {
  data: InfiniteData<T>,
  renderFn: (item: D) => React.ReactNode;
}

/** Helper Component to abstract nested map nonsense */
export default function PaginatedData<T, D>({ data, renderFn }: Params<T, D>) {
  return (
    <div>
      {data.pages.map((page: any) => (
        <React.Fragment key={page.data[0].id}>
          {page.data.map(renderFn)}
        </React.Fragment>
      ))}
    </div>
  );
}
