import { Outlet, ScrollRestoration } from 'react-router-dom';

function Root() {
  return (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  );
}

export { Root };
