import React from 'react'
import { Button, Dropdown, Menu } from 'antd'

import { LOCALE_NAMES } from '../config'
import withLocale from '../app/withLocale'

const menu = (currentLocale, localizedPath) =>
  <Menu selectedKeys={[currentLocale]}>
    {Object.keys(LOCALE_NAMES)
      .map(locale =>
        <Menu.Item key={locale}>
          <a href={localizedPath(locale)}>{LOCALE_NAMES[locale]}</a>
        </Menu.Item>
      )}
  </Menu>

export default withLocale(({ locale: { currentLocale, localizedPath }, onlyIcon = false }) =>
  <Dropdown overlay={menu(currentLocale, localizedPath)} placement="topCenter">
    <Button icon="global" size="small">{!onlyIcon && LOCALE_NAMES[currentLocale]}</Button>
  </Dropdown>
)
