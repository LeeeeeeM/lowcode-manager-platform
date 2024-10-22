import { useCallback, useMemo, FC } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Menu, Layout, type MenuProps } from 'antd'
import { HeartTwoTone } from '@ant-design/icons'
import { useBoolean } from 'ahooks'
// import cns from 'classnames'

// import { stringCapitalization } from '/@/utils/string'
import { routes } from '/@/router/routes'

export const Nav: FC = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [collapsed, { toggle }] = useBoolean(false)

  const handleClick = useCallback<NonNullable<MenuProps['onClick']>>(
    ({ key }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      pathname !== key && navigate(key)
    },
    [navigate, pathname],
  )

  const menus = useMemo(
    () => routes.map(({ path, label, icon }) => ({ key: path, label, icon })),
    [],
  )

  return (
    <Layout.Sider
      className="min-h-screen"
      width={200}
      collapsed={collapsed}
      collapsible
      onCollapse={toggle}
    >
      <div
        className="sticky top-0 z-[1] flex h-[70px] w-full cursor-pointer select-none items-center justify-center"
        onClick={toggle}
      >
        <HeartTwoTone className="text-xl" />
      </div>

      {/* <div
        className={cns(
          collapsed ? 'text-[40px] leading-[40px]' : 'text-[100px] leading-[100px]',
          'absolute bottom-20 w-full text-center text-white opacity-20 transition-all duration-[0.2s] ease-[ease]',
        )}
      >
        {stringCapitalization(import.meta.env.VITE_APP_NODE_ENV.slice(0, 3))}
      </div> */}

      <Menu
        theme="dark"
        mode="inline"
        forceSubMenuRender={false}
        defaultSelectedKeys={[pathname]}
        onClick={handleClick}
        items={menus}
      />
    </Layout.Sider>
  )
}