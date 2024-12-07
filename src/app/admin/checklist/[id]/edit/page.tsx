import { ContentLayout } from "@/components/admin-panel/content-layout"
import { UpdateTaskForm } from "@/modules/admin"

export default async function page() {
  return (
    <ContentLayout title="Editar checklist">
      <UpdateTaskForm />
    </ContentLayout>
  )
}
