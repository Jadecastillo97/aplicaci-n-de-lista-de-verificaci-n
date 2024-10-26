"use server"
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import { TaskMany } from "@/modules/core/schemas/TaskListSchema"

export async function fetchTasks() {
  const supabase = createClient(cookies())

  const { data: tasks, error } = await supabase
    .from("tasks")
    .select("*")
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
    .single()

  return { task, error }
}
