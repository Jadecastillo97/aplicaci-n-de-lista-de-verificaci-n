import { ContentLayout } from "@/components/admin-panel/content-layout"
import { RegisterChecklistForm } from "@/modules/admin"

export default async function page() {
  return (
    <ContentLayout title="Nuevo checklist">
      <RegisterChecklistForm />
    </ContentLayout>
  )
}
