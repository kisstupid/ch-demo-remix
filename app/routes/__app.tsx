import type { LoaderFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { Layout } from "~/components/layout";
import SideBar from "~/layouts/side-bar";
import { requireUserId } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserId(request);
  return null;
};

export default function AppLayout() {
  return (
    <Layout>
      <SideBar />
      <Outlet />
    </Layout>
  );
}
