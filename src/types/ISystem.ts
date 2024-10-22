export interface ISystem {
  id: string
  uid?: string
  name: string
  description: string | null
  status: boolean
}

export interface ISystemForm {
  name: string
  description?: string | null
  status?: boolean
}
