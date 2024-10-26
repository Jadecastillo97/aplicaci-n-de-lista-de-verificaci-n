"use server"
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import { TaskMany } from "@/modules/core/schemas/TaskListSchema"
import { ITask } from "@/types"

export async function fetchTasks() {
  const supabase = createClient(cookies())

  const { data: tasks, error } = await supabase
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false })

  return { tasks, error }
}

export async function fetchTasksByTaskListId(
  taskListId: string,
  systemId?: string
) {
  const supabase = createClient(cookies())

  let query = supabase
    .from("tasks")
    .select("*")
    .eq("task_list_id", taskListId)
    .order("created_at", { ascending: false })

  if (systemId) {
    query = query.eq("system_id", systemId)
  }

  const { data: tasks, error } = await query

  return { tasks, error }
}

export async function fetchTasksByTaskListDetailsId(
  taskListId: string,
  systemId?: string
) {
  const supabase = createClient(cookies())

  // Construye la consulta base
  let query = supabase
    .from("tasks")
    .select("*, system:system_id(*), task_list:task_list_id(*)")
    .eq("task_list_id", taskListId)
    .order("created_at", { ascending: false })

  // Si se proporciona `systemId`, añade la condición adicional
  if (systemId) {
    query = query.eq("system_id", systemId)
  }

  const { data: tasks, error } = await query

  return { tasks, error }
}

export async function fetchTasksByTaskListDetails() {
  const supabase = createClient(cookies())

  const { data: tasks, error } = await supabase
    .from("tasks")
    .select("*, system:system_id(*), task_list:task_list_id(*)")
    .order("created_at", { ascending: false })

  return { tasks, error }
}

export async function fetchTaskById(id: string) {
  const supabase = createClient(cookies())

  const { data: task, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("id", id)
    .single()

  return { task, error }
}

export async function saveTaskMany(arrayTask: TaskMany) {
  const supabase = createClient(cookies())
  const { data: task, error } = await supabase
    .from("tasks")
    .insert(arrayTask.tasks)

  return { task, error }
}

export async function updateTaskMany(arrayTask: TaskMany) {
  const supabase = createClient(cookies())

  // Divide las tareas en dos grupos: con `id` y sin `id`
  const tasksWithId = arrayTask.tasks.filter((task) => task.id !== undefined)
  const tasksWithoutId = arrayTask.tasks.filter((task) => task.id === undefined)

  let taskData: ITask[] = []
  let error = null

  // Actualizar las tareas que ya tienen un `id`
  if (tasksWithId.length > 0) {
    console.log(tasksWithId)
    tasksWithId.forEach(async (task) => {
      const { data, error: updateError } = await supabase
        .from("tasks")
        .update(task)
        .eq("id", task.id)
        .select()
      if (updateError) error = updateError
      taskData = taskData.concat(data || [])
    })
  }

  // Insertar las nuevas tareas sin `id`
  if (tasksWithoutId.length > 0) {
    const { data, error: insertError } = await supabase
      .from("tasks")
      .insert(tasksWithoutId)
      .select()
    if (insertError) error = insertError
    taskData = taskData.concat(data || [])
  }

  return { task: taskData, error }
}
