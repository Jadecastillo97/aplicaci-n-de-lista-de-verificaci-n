import { ChecklistsView } from "@/modules/admin"
import { fetchTasks } from "@/api"

export default async function page() {
  const { tasks, error } = await fetchTasks()

  return (
    <>
      {error && <div>Failed to load tasks</div>}
      {!error && <ChecklistsView data={tasks || []} />}
    </>
  )
}
