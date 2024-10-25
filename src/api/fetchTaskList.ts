"use server"
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import { ITaskListForm } from "@/types"

export async function fetchTaskList() {
  const supabase = createClient(cookies())

  const { data: tasksList, error } = await supabase
    .from("tasks_list")
    .select("*")
    .order("created_at", { ascending: false })

  return { tasksList, error }
}

export async function saveTaskList(data: ITaskListForm) {
  const supabase = createClient(cookies())

  const { data: taskList, error } = await supabase
    .from("tasks_list")
    .insert([data])
  return { taskList, error }
}

export async function updateTaskList(id: string, data: ITaskListForm) {
  const supabase = createClient(cookies())

  const { data: tasksList, error } = await supabase
    .from("tasks_list")
    .update(data)
    .eq("id", id)
  return { tasksList, error }
}

export async function fetchTaskListById(id: string) {
  const supabase = createClient(cookies())

  const { data: tasksList, error } = await supabase
    .from("tasks_list")
    .select("*")
    .eq("id", id)
    .single()

  return { tasksList, error }
}
