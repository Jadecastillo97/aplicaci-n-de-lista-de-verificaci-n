import { Button } from "@/components/ui/button"
import { parseDate } from "@/lib/parse-date"
import { ITasksList } from "@/types"
import { ListPlus, Sheet } from "lucide-react"
import Link from "next/link"

interface DetailsTaskListProps {
  data: ITasksList
  hiddenActions?: boolean
}
export const DetailsTaskList = (props: DetailsTaskListProps) => {
  const { data, hiddenActions } = props

  return (
    <div className="pt-4">
      <header className="p-4 border bg-white rounded-md flex flex-col gap-3">
        <section className="flex flex-col gap-2 sm:flex-row justify-between items-center">
          <section className="flex flex-col gap-2">
            <div>
              <span className="bg-yellow-50 text-yellow-800 px-4 py-1 rounded-full text-xs font-medium">
                {data.date ? parseDate(data.date) : "Ninguna"}
              </span>
            </div>
            <h1 className="text-2xl font-bold">{data.name}</h1>
          </section>
          {!hiddenActions && (
            <section className="flex gap-3 items-center">
              <Button asChild>
                <Link href={`/checklist/${data.id}/cards/new`}>
                  <ListPlus size={24} />
                  Añadir tarjeta
                </Link>
              </Button>
              <Button variant="secondary">
                <Sheet size={24} />
                Descargar Excel
              </Button>
            </section>
          )}
        </section>
        <hr />
        <section className="text-xs text-gray-500">
          <p>{data.description || "Ninguna observavión"}</p>
          <p>Lugar: {data.location || "Ninguno"}</p>
        </section>
      </header>
    </div>
  )
}
