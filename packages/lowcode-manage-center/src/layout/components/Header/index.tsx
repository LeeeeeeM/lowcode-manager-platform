import { FC, useMemo } from 'react'
import { useLocation, matchPath } from 'react-router-dom'
// import { Dropdown, type MenuProps, Avatar } from 'antd'
// import { UserOutlined } from '@ant-design/icons'

// import { stringCapitalization } from '/@/utils/string'
import { ANY_MATCH_NAME } from '/@/constants/routes'
import { allRoutes } from '/@/router/routes'

// const items: MenuProps['items'] = [
//   {
//     label: 'Logout',
//     key: '2',
//   },
// ]

export const Header: FC = () => {
  const loc = useLocation()

  const { pathname } = loc;

  const moduleTitle = useMemo(() => {
    const module = allRoutes.find((route) => {
      return matchPath({
        path: route.path
      }, pathname)
    });

    if (module) {
      return module.label;
    }

    return ANY_MATCH_NAME;
  }, [pathname]);

  console.log(loc, moduleTitle)

  // const title = useMemo(() => {
  //   const list = pathname.split('/').pop()?.split('-')

  //   return list?.map((str) => stringCapitalization(str)).join(' ')
  // }, [pathname])

  // const menuProps = useMemo(() => ({ items }), [])

  return (
    <>
      <header className="flex h-[50px] w-full items-center justify-between bg-gray-200 px-3">
        <span className="font-700 text-[20px]">{moduleTitle}</span>

        {/* <div className="flex items-center">
          <Dropdown menu={menuProps} disabled>
            <Avatar size="small" icon={<UserOutlined />} />
          </Dropdown>
        </div> */}
      </header>
    </>
  )
}
