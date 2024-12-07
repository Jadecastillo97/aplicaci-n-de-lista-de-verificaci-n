import { ContentLayout } from "@/components/admin-panel/content-layout"
import { RegisterSystemForm } from "@/modules/admin"

export default async function page() {
  return (
    <ContentLayout title="Nuevo sistema">
      <RegisterSystemForm />
    </ContentLayout>
  )
}
