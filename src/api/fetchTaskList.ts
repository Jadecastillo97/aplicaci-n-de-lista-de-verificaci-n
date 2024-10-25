"use server"
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import { ISystemForm } from "@/types"

export async function fetchTaskList() {
  const supabase = createClient(cookies())

  const { data: tasksList, error } = await supabase
    .from("tasks_list")
    .select("*")
    .order("created_at", { ascending: false })

  return { tasksList, error }
}

export async function saveTaskList(data: ISystemForm) {
  const supabase = createClient(cookies())

  const { data: system, error } = await supabase.from("systems").insert(data)
  return { system, error }
}

export async function updateSystem(id: string, data: ISystemForm) {
  const supabase = createClient(cookies())

  const { data: system, error } = await supabase
    .from("systems")
    .update(data)
    .eq("id", id)
  return { system, error }
}

export async function fetchSystem(id: string) {
  const supabase = createClient(cookies())

  const { data: system, error } = await supabase
    .from("systems")
    .select("*")
    .eq("id", id)
    .single()

  return { system, error }
}
