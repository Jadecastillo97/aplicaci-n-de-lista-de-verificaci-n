import { Toaster } from "@/components/ui/toaster"
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout"

export default function DemoLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <AdminPanelLayout>
      {children}
      <Toaster />
    </AdminPanelLayout>
  )
}
