"use server"
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"

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
