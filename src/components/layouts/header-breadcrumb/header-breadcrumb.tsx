import { Breadcrumb } from 'antd';
import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useMatches } from 'react-router-dom';

import './header-breadcrumb.less';

interface UseMatchesProps {
  readonly params?: Record<string, string>;
  handle: { crumb: (t: (key: string) => string, params?: UseMatchesProps['params']) => React.ReactNode };
}

const HeaderBreadcrumb: React.FC = () => {
  const matches = useMatches() as UseMatchesProps[];
  const { t } = useTranslation();
  const crumbs = matches
    // first get rid of any matches that don't have handle and crumb
    .filter((match) => Boolean(match.handle?.crumb))
    // now map them into an array of elements, passing the loader
    // data to each one
    .map((match) => match.handle.crumb(t, match.params));

  return (
    <section className="header-breadcrumb">
      <Breadcrumb className="breadcrumb">
        {crumbs.map((crumb, index) => (
          <Fragment key={index}>{crumb}</Fragment>
        ))}
      </Breadcrumb>
    </section>
  );
};

export { HeaderBreadcrumb };
