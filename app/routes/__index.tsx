import { Outlet } from '@remix-run/react';

import { Wrapper } from '~/layouts/wrapper';

export default function DefaultLayout() {
  return (
    <Wrapper $full>
      <Outlet />
    </Wrapper>
  );
}
