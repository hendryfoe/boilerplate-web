import type { ItemType } from 'antd/lib/menu/hooks/useItems';
import React from 'react';
import { Dropdown, Tag } from 'antd';

import { LocaleAPI } from 'models/language.enum';
import { useApp } from 'contexts/app/use-app';

const dropdownMenuItems: (onChangeLanguage: (language: string) => void) => ItemType[] = (onChangeLanguage) => [
  {
    key: LocaleAPI.id,
    label: 'ID',
    onClick: () => onChangeLanguage(LocaleAPI.id)
  },
  {
    key: LocaleAPI.en,
    label: 'EN',
    onClick: () => onChangeLanguage(LocaleAPI.en)
  }
];

const ChangeLanguage: React.FC = () => {
  const { language, setLanguage } = useApp();

  return (
    <Dropdown menu={{ items: dropdownMenuItems(setLanguage) }} placement="bottom">
      <Tag color="blue" className="hoverable" style={{ padding: '0 12px', margin: 0 }}>
        {language.toUpperCase()}
      </Tag>
    </Dropdown>
  );
};

export { ChangeLanguage };
