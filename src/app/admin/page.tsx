import { ContentLayout } from "@/components/admin-panel/content-layout"
import { AdminDashboard } from "@/modules/admin"
import React from "react"

export default function page() {
  return (
    <>
      <ContentLayout title="Inicio">
        <AdminDashboard />
      </ContentLayout>
    </>
  )
}
