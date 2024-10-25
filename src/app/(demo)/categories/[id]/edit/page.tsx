import { ContentLayout } from "@/components/admin-panel/content-layout"

import { FrmSystemEditor } from "@/modules/systems"
import Link from "next/link"
import { fetchSystem } from "@/api"

interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params

  const { system, error } = await fetchSystem(id)
  if (error) {
    return <div>Error loading system</div>
  }

  return (
    <ContentLayout title="Agregar nuevo sistema">
      <section className="w-full h-full flex flex-col justify-center items-center">
        <main className="w-full max-w-3xl pt-6">
          <FrmSystemEditor defaultValues={system} />
        </main>
      </section>
    </ContentLayout>
  )
}
