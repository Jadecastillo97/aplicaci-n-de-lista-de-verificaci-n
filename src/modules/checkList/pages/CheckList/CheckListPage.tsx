import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { parseDate } from "@/lib/parse-date"
import { ITasksList } from "@/types"
import { CirclePlus, FilePenLine, Info } from "lucide-react"
import Link from "next/link"

interface CheckListPageProps {
  data: ITasksList[]
}

export const CheckListPage = (props: CheckListPageProps) => {
  const { data } = props

  return (
    <main className="pt-5">
      <ul className="flex flex-col w-full gap-5">
        {data.map((taskList) => (
          <li
            key={taskList.id}
            className="w-full"
          >
            <Card>
              <CardHeader>
                <CardTitle>
                  <div className="flex flex-col gap-2">
                    <div>
                      <span className="bg-yellow-50 text-yellow-800 px-4 py-1 rounded-full text-xs font-medium">
                        {taskList.date ? parseDate(taskList.date) : "Ninguna"}
                      </span>
                    </div>
                    <div>
                      <h1>{taskList.name}</h1>
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="line-clamp-2">
                  <section>
                    {taskList.description || "Ninguna observavión"}
                  </section>
                  <section>
                    <p>Lugar: {taskList.location || "Ninguno"}</p>
                  </section>
                </CardDescription>
              </CardContent>
              <CardFooter>
                <div className="flex justify-end gap-3">
                  <Button
                    className="btn btn-primary"
                    asChild
                    variant="secondary"
                    size="sm"
                  >
                    <Link href={`/checklist/${taskList.id}/cards`}>
                      <CirclePlus className="w-4 h-4" />
                      Gestionar tarjetas
                    </Link>
                  </Button>
                  <Button
                    className="btn btn-primary"
                    variant="secondary"
                    size="sm"
                    asChild
                  >
                    <Link href={`/checklist/${taskList.id}/edit`}>
                      <FilePenLine className="w-4 h-4" />
                      Editar
                    </Link>
                  </Button>
                  <Button
                    className="btn btn-primary"
                    asChild
                    variant="secondary"
                    size="sm"
                  >
                    <Link href={`/checklist/${taskList.id}`}>
                      <Info className="w-4 h-4" />
                      Ver detalles
                    </Link>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
    </main>
  )
}
