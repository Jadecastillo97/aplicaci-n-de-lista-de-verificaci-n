import PlaceholderContent from "@/components/demo/placeholder-content"
import { ContentLayout } from "@/components/admin-panel/content-layout"
import { SystemList } from "@/modules/systems"
import { fetchSystems } from "@/api"
import { Suspense } from "react"
import { HeaderSection } from "@/modules/core"

export default async function CategoriesPage() {
  const { systems, error } = await fetchSystems()

  return (
    <ContentLayout title="Sistemas">
      <HeaderSection
        title="Lista de sistemas"
        description="Administre los sistemas de la organización. Para agregar un nuevo sistema, haga clic en el botón 'Agregar'."
        href="categories/new"
      />
      <Suspense fallback={<div>System loading...</div>}>
        {error && <PlaceholderContent />}
        {!error && <SystemList data={systems || []} />}
      </Suspense>
    </ContentLayout>
  )
}
