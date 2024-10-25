export interface ITasksList {
  id: string
  uid?: string
  name: string
  description: string
  date: string
  status: string
  location: string
  coordinates: string
}

export interface ITaskListForm {
  name: string
  description: string
  date: string
  status: string
  location: string
  coordinates: string
}
