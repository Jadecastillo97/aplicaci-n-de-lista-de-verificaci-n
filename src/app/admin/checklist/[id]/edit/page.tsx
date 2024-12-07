import { fetchTaskById } from "@/api"
import { ContentLayout } from "@/components/admin-panel/content-layout"
import { UpdateTaskForm } from "@/modules/admin"

interface PropsPage {
  params: {
    id: string
  }
}

export default async function page(props: PropsPage) {
  const { id } = props.params

  const { task, error } = await fetchTaskById(id)
  return (
    <ContentLayout title="Editar checklist">
      {error && <div>Failed to load task</div>}
      {!error && <UpdateTaskForm dataDetail={task} />}
    </ContentLayout>
  )
}
