import { ITaskDetail, ITasksForSystem } from "@/types"

export function groupTasksBySystem(tasks: ITaskDetail[]): ITasksForSystem[] {
  const taskMap: { [key: string]: ITaskDetail[] } = {}
  // Seleccionar el sistema de en comun de la lista
  const system = tasks[0].system

  // Agrupar tareas por system_id
  tasks.forEach((task) => {
    const systemId = JSON.stringify(task.system.id) // Serializar para usar como clave

    if (!taskMap[systemId]) {
      taskMap[systemId] = []
    }
    taskMap[systemId].push(task)
  })

  // Convertir el mapa a un array de ITasksForSystem
  return Object.keys(taskMap).map((systemId) => ({
    system: system,
    data: taskMap[systemId]
  }))
}
