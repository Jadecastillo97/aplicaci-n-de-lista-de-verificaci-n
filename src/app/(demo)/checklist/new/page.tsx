import { ContentLayout } from "@/components/admin-panel/content-layout"
import { FrmTaskListEditor } from "@/modules/checkList"

export default function Page() {
  return (
    <ContentLayout title="Iniciar Checklist">
      <main className="py-4">
        <FrmTaskListEditor />
      </main>
    </ContentLayout>
  )
}
