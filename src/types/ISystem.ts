export interface ISystem {
  id: string
  name: string
  description: string | null
  status: boolean
  created_at: string
}

export interface ISystemForm {
  name: string
  description?: string | null
  status?: boolean
}
