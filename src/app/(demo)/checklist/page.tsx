import PlaceholderContent from "@/components/demo/placeholder-content"
import { ContentLayout } from "@/components/admin-panel/content-layout"

import { CheckListPage } from "@/modules/checkList"
import { fetchTaskList } from "@/api"
import { Suspense } from "react"
import { HeaderSection } from "@/modules/core"

export default async function Page() {
  const { tasksList, error } = await fetchTaskList()
  console.log(tasksList)

  return (
    <ContentLayout title="Sistemas">
      <HeaderSection
        title="Historial de tareas"
        description="Administre las tareas de la organización. Para agregar una nueva tarea, haga clic en el botón 'Agregar'."
        href="/checklist/new"
      />
      <Suspense fallback={<div>System loading...</div>}>
        {error && <PlaceholderContent />}
        {/* {!error && <SystemList data={systems || []} />} */}
        <CheckListPage />
      </Suspense>
    </ContentLayout>
  )
}
