# Boilerplate Web

This project is built with [Vite + React + Typescript](https://vitejs.dev/guide/).

## Prerequisites

- Node v16
- [Ant Design v4.24.0](https://ant.design/components/overview/)
- [React Router](https://reactrouter.com/en/main)\
  Library for routing in React application and heart of our navigation system
- [@tanstack-query](https://tanstack.com/query/v4/docs/adapters/react-query)\
  Data-fetching library and it makes `fetching`, `caching`, `synchronizing and updating server state` in your React applications a breeze.
- [react-i18next](https://react.i18next.com/)\
  Library for `i18n` in React application
- VSCode with `Prettier` Plugin
- VSCode with `ESLint` Plugin
- Turn On `Format on Save` in VSCode Setting

<br />

## Folder Structure

```
.
├── public/
│   ├── images/
│   │   ├── coming-soon.svg
│   │   ├── launcpad.svg
│   │   └── etc.png
│   │
│   └── locales/
│       ├── en/
│       │   └── translation.json
│       └── id/
│           └── translation.json
│
├── src
│   ├── __mocks__/
│   │   └── react-i18next.ts
│   │
│   ├── __tests__/
│   │   └── root.test.ts
│   │
│   ├── components/
│   │   ├── application-mode/
│   │   │   ├── application-mode.tsx
│   │   │   └── application-mode.less
│   │   └── change-language/
│   │       ├── change-language.test.tsx
│   │       └── change-language.tsx
│   │
│   ├── constants/
│   │   ├── endpoint.constant.ts
│   │   ├── environment.constant.ts
│   │   ├── label.constant.ts
│   │   ├── message.constant.ts
│   │   └── placeholder.constant.ts
│   │
│   ├── contexts/
│   │   ├── app/
│   │   │   ├── app.context.tsx
│   │   │   └── use-app.tsx
│   │   └── app/
│   │       ├── auth.action.ts
│   │       ├── auth.context.tsx
│   │       ├── auth.store.ts
│   │       └── use-auth.tsx
│   ├── hooks/
│   │   └── use-interval.ts
│   │
│   ├── initializers/
│   │   ├── auth-initializer.ts
│   │   └── i18n-initializer.ts
│   │
│   ├── models/
│   │   ├── user.model.ts
│   │   └── post.model.ts
│   │
│   ├── pages/
│   │   ├── dashboard/
│   │   │   └── dashboard.tsx
│   │   └── posts/
│   │   │   ├── form/
│   │   │   │   └── post-form.tsx
│   │   │   ├── shared/
│   │   │   │   ├── components/
│   │   │   │   │   └── post-headers-filter.tsx
│   │   │   │   └── hooks/
│   │   │   │       ├── use-posts.mutation.ts
│   │   │   │       └── use-posts.query.ts
│   │   │   └── posts.tsx
│   │   └── root.tsx
│   │
│   ├── services/
│   │   └── api.service.ts
│   │
│   ├── styles/
│   │   └── style.less
│   │
│   ├── utils/
│   │   ├── __tests__/
│   │   │   └── jwt-helper.test.ts
│   │   ├── auth.util.ts
│   │   ├── date.util.ts
│   │   └── storage.util.ts
│   │
│   ├── main.tsx
│   └── routes.tsx
│
└── index.html
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/{page_name}.tsx`.\
The page auto-updates as you edit the file.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run preview`

Preview your build result in local environment.\
Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

### `npm run format`

Format all files with Prettier.

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).
