export enum DataSourceIdentityType {
  FETCH = 'fetch',
  JSONP = 'jsonp',
  VARIABLE = 'variable'
}

export interface DataSourceIdentityInterface {
  type: DataSourceIdentityType
}