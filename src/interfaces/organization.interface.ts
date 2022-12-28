export interface OrganizationInterface {
  id?: number,
  oi?: string,
  name?: string,
  subOrganizations?: any,
  mainOrganization?: {
    value?: boolean
  },
  hierarchyCode?: string,
  internalCode?: any,
  razaoSocial?: string,
  idCliente?: any,
  isSoftwareHouse?: boolean,
  securityManager?: boolean,
  mainUser?: any,
  logo?: string,
  maxShortTokens?: any,
  isMatrix?: boolean,
  isFranchisor?: boolean
}