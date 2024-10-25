import { ContentLayout } from "@/components/admin-panel/content-layout"
import { FrmSystemEditor } from "@/modules/systems"

export default function Page() {
  return (
    <ContentLayout title="Agregar nuevo sistema">
      <section className="w-full h-full flex flex-col justify-center items-center">
        <main className="w-full max-w-3xl pt-6">
          <FrmSystemEditor />
        </main>
      </section>
    </ContentLayout>
  )
}
