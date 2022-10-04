import type { LoaderFunction } from '@remix-run/node';
import { Outlet } from '@remix-run/react';

import SideBar from '~/layouts/side-bar';
import { Wrapper } from '~/layouts/wrapper';
import { requireUserId } from '~/utils/auth.server';

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserId(request);
  return null;
};

export default function AppLayout() {
  return (
    <Wrapper $full $center>
      <SideBar />
      <Outlet />
    </Wrapper>
  );
}
