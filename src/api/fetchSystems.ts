"use server"
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import { ISystem } from "@/types"

// export async function fetchEvents(props: IProps) {
//     const { query, date } = props
//     const supabase = createClient()

//     const { data: event } = await supabase
//       .from('events')
//       .select('*,summary:summary_id(*, person:person_id(*))')
//       .eq('isActived', true)
//       .ilike('name', `%${query}%`)
//       .order('created_at', { ascending: false })

//     return event
//   }
export async function fetchSystems() {
  const supabase = createClient(cookies())

  const { data: systems, error } = await supabase
    .from("systems")
    .select("*")
    .order("created_at", { ascending: false })

  return { systems, error }
}

export async function saveSystem(data: ISystem) {
  const supabase = createClient(cookies())

  const { data: system, error } = await supabase.from("systems").insert(data)
  console.log(system)
  console.log(error)
  return { system, error }
}
