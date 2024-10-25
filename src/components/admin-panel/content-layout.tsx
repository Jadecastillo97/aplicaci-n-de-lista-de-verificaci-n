import { Navbar } from "@/components/admin-panel/navbar"
import { BreadcrumbCustom } from "@/modules/core"

interface ContentLayoutProps {
  title: string
  children: React.ReactNode
}

export function ContentLayout({ title, children }: ContentLayoutProps) {
  return (
    <div>
      <Navbar title={title} />
      <section className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 py-2">
        <main className="container">
          <BreadcrumbCustom />
        </main>
      </section>
      <div className="container  pb-8 px-4 sm:px-8">{children}</div>
    </div>
  )
}
