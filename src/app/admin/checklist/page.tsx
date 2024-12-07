import { ChecklistsSkeleton, ChecklistsView } from "@/modules/admin"
import { fetchTasks } from "@/api"
import { Suspense } from "react"
import { ContentLayout } from "@/components/admin-panel/content-layout"

interface PropsPage {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function page(props: PropsPage) {
  const { searchParams } = props
  const date =
    (searchParams.date as string) || new Date().toISOString().split("T")[0]

  const { tasks, error } = await fetchTasks(date)

  return (
    <ContentLayout title="Checklists">
      {error && <div>Failed to load tasks</div>}
      <Suspense fallback={<ChecklistsSkeleton />}>
        {!error && <ChecklistsView data={tasks || []} />}
      </Suspense>
    </ContentLayout>
  )
}
