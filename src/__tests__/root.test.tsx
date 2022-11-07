import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import { Root } from 'pages/root';

describe('Root', () => {
  const routes = [
    {
      path: '/',
      element: <Root />
    }
  ];
  const router = createMemoryRouter(routes, {
    initialEntries: ['/'],
    initialIndex: 0
  });
  const wrapProviders = () => <RouterProvider router={router} />;

  it('should be defined', () => {
    render(wrapProviders());

    expect(screen).toBeDefined();
  });
});
