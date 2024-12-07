"use server"
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import { ISystemForm } from "@/types"
import { revalidatePath } from "next/cache"

export async function fetchSystems() {
  const supabase = createClient(cookies())

  const { data: systems, error } = await supabase
    .from("systems")
    .select("*")
    .order("created_at", { ascending: false })
  return { systems, error }
}

export async function saveSystem(data: ISystemForm) {
  const supabase = createClient(cookies())

  const { data: system, error } = await supabase.from("systems").insert(data)
  revalidatePath("/admin/alerts")
  return { system, error }
}

export async function updateSystem(id: string, data: ISystemForm) {
  const supabase = createClient(cookies())

  const { data: system, error } = await supabase
    .from("systems")
    .update(data)
    .eq("id", id)
  revalidatePath("/admin/alerts")
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
