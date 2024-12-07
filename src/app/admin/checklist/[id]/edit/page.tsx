import { ContentLayout } from "@/components/admin-panel/content-layout"
import { ConfigureTasksForm } from "@/modules/admin"

export default async function page() {
  return (
    <ContentLayout title="Editar checklist">
      <ConfigureTasksForm />
    </ContentLayout>
  )
}
