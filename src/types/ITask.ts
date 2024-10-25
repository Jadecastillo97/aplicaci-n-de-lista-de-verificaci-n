import { ISystem } from "./ISystem"
import { ITasksList } from "./ITaskList"

export interface ITask {
  id: string
  uid?: string
  task_list_id: string
  system_id: string
  checklist: string
  frequency: string
  status: string
  review: boolean
  note: string
}

export interface ITaskDetail {
  id: string
  uid?: string
  task_list: ITasksList
  system_id: ISystem
  checklist: string
  frequency: string
  status: string
  review: boolean
  note: string
  created_at: string
  updated_at: string
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
