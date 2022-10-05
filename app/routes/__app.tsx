import type { LoaderFunction } from '@remix-run/node';
import { Outlet } from '@remix-run/react';

import Header from '~/layouts/header';
import SideBar from '~/layouts/side-bar';
import { Wrapper } from '~/layouts/wrapper';
import { requireUserId } from '~/utils/auth.server';

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserId(request);
  return null;
};

export default function AppLayout() {
  return (
    <Wrapper $full $flex="row">
      <SideBar />
      <Wrapper className="flex-grow p-4 pt-0">
        <Header />
        <Outlet />
      </Wrapper>
    </Wrapper>
  );
}
