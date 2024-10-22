import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'

import { store } from '/@/store'
import { Router } from '/@/router'

import '/@/styles/global.css'

const App = () => {
  return (
    <ConfigProvider>
      <Provider store={store}>
        <Router />
      </Provider>
    </ConfigProvider>
  )
}

export default App