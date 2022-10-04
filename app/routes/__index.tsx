import { Outlet } from "@remix-run/react";

export default function DefaultLayout() {
  return (
    <div className="h-screen w-full bg-gray-600 font-mono">
      <Outlet />
    </div>
  );
}
