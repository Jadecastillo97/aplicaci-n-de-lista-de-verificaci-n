"use server"
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import { TaskMany } from "@/modules/core/schemas/TaskListSchema"
import { revalidatePath } from "next/cache"
import { taskSchema } from "@/modules/core/schemas/TaskListSchema"
import { z } from "zod"

export async function fetchTasks(date: string) {
  const supabase = createClient(cookies())

  const { data: tasks, error } = await supabase
    .from("tasks")
    .select("*, system:system_id(*)")
    .eq("date", date)
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
  revalidatePath("/admin/checklists")
  return { task, error }
}

export async function saveOrUpdateTask(
  data: z.infer<typeof taskSchema>,
  id?: string
) {
  const supabase = createClient(cookies())

  const { data: task, error } = id
    ? await supabase.from("tasks").update(data).eq("id", id)
    : await supabase.from("tasks").insert(data)

  revalidatePath("/admin/checklists")
  return { task, error }
}
