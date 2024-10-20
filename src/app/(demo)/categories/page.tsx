import Link from "next/link"

import PlaceholderContent from "@/components/demo/placeholder-content"
import { ContentLayout } from "@/components/admin-panel/content-layout"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import { SystemList } from "@/modules/systems"
import { fetchSystems } from "@/api"
import { Suspense } from "react"
import { HeaderSection } from "@/modules/core"

export default async function CategoriesPage() {
  const { systems, error } = await fetchSystems()

  return (
    <ContentLayout title="Categories">
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
            <BreadcrumbPage>Sistemas</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <HeaderSection />
      <Suspense fallback={<div>System loading...</div>}>
        {error && <PlaceholderContent />}
        {!error && <SystemList data={systems || []} />}
      </Suspense>
    </ContentLayout>
  )
}
