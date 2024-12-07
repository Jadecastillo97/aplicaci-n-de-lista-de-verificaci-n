import { fetchSystems } from "@/api"
import { ContentLayout } from "@/components/admin-panel/content-layout"
import { AlertsView } from "@/modules/admin"

export default async function page() {
  const { systems, error } = await fetchSystems()

  return (
    <ContentLayout title="Sistemas">
      {error && <div>Failed to load systems</div>}
      {!error && <AlertsView data={systems || []} />}
    </ContentLayout>
  )
}
