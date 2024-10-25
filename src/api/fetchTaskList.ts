"use server"
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import { ITaskListForm } from "@/types"

export async function fetchTaskList() {
  const supabase = createClient(cookies())

  const { data: tasksList, error } = await supabase
    .from("task_lists")
    .select("*")
    .order("created_at", { ascending: false })

  return { tasksList, error }
}

export async function saveTaskList(data: ITaskListForm) {
  const supabase = createClient(cookies())

  const { data: taskList, error } = await supabase
    .from("task_lists")
    .insert(data)
    .single()

  return { taskList, error }
}

export async function updateTaskList(id: string, data: ITaskListForm) {
  const supabase = createClient(cookies())

  const { data: tasksList, error } = await supabase
    .from("task_lists")
    .update(data)
    .eq("id", id)
  return { tasksList, error }
}

export async function fetchTaskListById(id: string) {
  const supabase = createClient(cookies())

  const { data: tasksList, error } = await supabase
    .from("task_lists")
    .select("*")
    .eq("id", id)
    .single()

  return { tasksList, error }
}
