import { ContentLayout } from "@/components/admin-panel/content-layout"
import { FrmTaskListEditor } from "@/modules/checkList"

export default function Page() {
  return (
    <ContentLayout title="Iniciar Checklist">
      <section className="w-full h-full flex flex-col justify-center items-center">
        <main className="w-full max-w-3xl pt-6">
          <FrmTaskListEditor />
        </main>
      </section>
    </ContentLayout>
  )
}
