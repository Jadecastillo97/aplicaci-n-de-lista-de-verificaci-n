import { ISystem } from "./ISystem"
import { ITasksList } from "./ITaskList"

export interface ITask {
  id: string
  // uid?: string
  // task_list_id: number
  system_id: number
  system: ISystem
  date: string
  created_at: string
  frequency: string
  description: string
  notes: string
  status: boolean
}

export interface ITaskDetail {
  id: string
  uid?: string
  task_list: ITasksList
  system: ISystem
  chekList: string
  frecuency: string
  status: string
  review: boolean
  note: string
  created_at: string
  updated_at: string
}

export interface ITasksForSystem {
  system: ISystem
  data: ITaskDetail[]
}

export interface ITaskForm {
  task_list_id: string
  system_id: string
  checklist: string
  frequency: string
  status: string
  review: boolean
  note: string
}
