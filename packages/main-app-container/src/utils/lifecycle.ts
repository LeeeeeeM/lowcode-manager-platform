
import { loadErrorHandler } from 'wujie';
import { lifecycle } from 'wujie/esm/sandbox';

interface life {
  beforeLoad: lifecycle,
  beforeMount: lifecycle,
  afterMount: lifecycle,
  beforeUnmount: lifecycle,
  afterUnmount: lifecycle,
  activated: lifecycle,
  deactivated: lifecycle,
  loadError: loadErrorHandler
}


const lifecycles: life = {
  beforeLoad: (appWindow) => console.log(`${appWindow.__WUJIE.id} beforeLoad 生命周期`),
  beforeMount: (appWindow) => console.log(`${appWindow.__WUJIE.id} beforeMount 生命周期`),
  afterMount: (appWindow) => console.log(`${appWindow.__WUJIE.id} afterMount 生命周期`),
  beforeUnmount: (appWindow) => console.log(`${appWindow.__WUJIE.id} beforeUnmount 生命周期`),
  afterUnmount: (appWindow) => console.log(`${appWindow.__WUJIE.id} afterUnmount 生命周期`),
  activated: (appWindow) => console.log(`${appWindow.__WUJIE.id} activated 生命周期`),
  deactivated: (appWindow) => console.log(`${appWindow.__WUJIE.id} deactivated 生命周期`),
  loadError: (url: string, e: Error) => console.log(`${url} 加载失败`, e),
};

export default lifecycles;
