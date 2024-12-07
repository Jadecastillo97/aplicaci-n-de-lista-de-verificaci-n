import { ChecklistsView } from "@/modules/admin"
import { fetchTasks } from "@/api"
import { Suspense } from "react"

interface PropsPage {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function page(props: PropsPage) {
  const { searchParams } = props
  const date =
    (searchParams.date as string) || new Date().toISOString().split("T")[0]
  console.log("date", date)

  const { tasks, error } = await fetchTasks(date)

  return (
    <>
      {error && <div>Failed to load tasks</div>}
      <Suspense fallback={<div>Loading...</div>}>
        {!error && <ChecklistsView data={tasks || []} />}
      </Suspense>
    </>
  )
}
