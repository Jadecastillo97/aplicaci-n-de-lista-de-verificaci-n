import { ContentLayout } from "@/components/admin-panel/content-layout"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import { FrmSystemEditor } from "@/modules/systems"
import Link from "next/link"
import { fetchSystem } from "@/api"
import { HeaderSection } from "@/modules/core"
import { Suspense } from "react"
import PlaceholderContent from "@/components/demo/placeholder-content"

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
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/checklist">Lista de tarjetas</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <HeaderSection
        title="Lista de sistemas"
        description="Administre los sistemas de la organización. Para agregar un nuevo sistema, haga clic en el botón 'Agregar'."
        href="categories/new"
      />
      <Suspense fallback={<div>System loading...</div>}>
        {error && <PlaceholderContent />}
        {/* {!error && <SystemList data={systems || []} />} */}
      </Suspense>
    </ContentLayout>
  )
}
