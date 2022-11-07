import { Button, Col, Input, Row } from 'antd';
import { t } from 'i18next';

import { LabelConstant } from 'constants/label.constant';
import { PlaceholderConstant } from 'constants/placeholder.constant';
import { useState } from 'react';

interface UserHeaderFilterProps {
  isLoading: boolean;
  filters: {
    searchTerm: string;
  };
  onFiltersChange: (filters: Record<string, string>) => void;
}

export function UserHeaderFilter(props: UserHeaderFilterProps) {
  const [searchValue, setSearchValue] = useState(() => props.filters.searchTerm);

  function onSearchClick() {
    props.onFiltersChange({ q: searchValue });
  }

  return (
    <Row align="middle" gutter={[20, 10]}>
      <Col xs={24} lg={12} xl={12}>
        <Row align="middle" gutter={[10, 10]}>
          <Col xs={24} sm={17} md={17} lg={15}>
            <Input
              disabled={props.isLoading}
              name="search"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={t(PlaceholderConstant.SEARCH_BY_NAME_OR_EMAIL_OR_PHONE)}
            />
          </Col>
          <Col xs={24} sm={7} md={4} lg={5}>
            <Button disabled={props.isLoading} style={{ width: '100%' }} type="primary" onClick={onSearchClick}>
              {t(LabelConstant.SEARCH)}
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
