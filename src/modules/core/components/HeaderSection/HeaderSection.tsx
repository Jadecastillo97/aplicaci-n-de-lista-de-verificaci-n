import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

interface IHeaderSectionProps {
  title?: string
  description?: string
  href?: string
}
export const HeaderSection = (props: IHeaderSectionProps) => {
  const {
    description = "Sin descripcion",
    href,
    title = "Titulo de seccion"
  } = props
  return (
    <main className="flex flex-col gap-2">
      <section className="flex flex-col pt-4">
        <h1 className="font-bold text-lg">{title}</h1>
        <h2 className="text-sm text-gray-500">{description}</h2>
      </section>
      <section>
        <Button asChild>
          <Link href={href || "#"}>
            Agregar
            <Plus className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </section>
    </main>
  )
}
