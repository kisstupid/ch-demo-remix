import { Outlet } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { getUser } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  // If there's already a user in the session, redirect to the home page
  return (await getUser(request)) ? redirect("/dashboard") : null;
};

export default function AuthLayout() {
  return (
    <div>
      <p>Auth</p>
      <Outlet />
    </div>
  );
}
