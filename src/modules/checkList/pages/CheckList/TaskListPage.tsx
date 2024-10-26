import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { groupTasksBySystem } from "@/lib/parse-data-task"
import { ITaskDetail } from "@/types"
import { FilePenLine, Info, SquarePen } from "lucide-react"
import Link from "next/link"

interface ITasksPageProps {
  data: ITaskDetail[]
}
export const TaskListPage = (props: ITasksPageProps) => {
  const { data } = props
  const dataGroup = groupTasksBySystem(data)

  return (
    <main>
      <ul className="flex flex-col w-full gap-5">
        {dataGroup.map((Task, i) => (
          <li
            key={i}
            className="w-full"
          >
            <Card>
              <CardHeader>
                <CardTitle>
                  <div className="flex flex-col gap-2 sm:flex-row sm:justify-between items-center">
                    <div>
                      <span className="bg-gray-50 text-gray-800 px-5 border py-1 text-sm rounded-full font-medium">
                        Sistema: {Task.system.name}
                      </span>
                    </div>
                    <div>
                      <Button
                        className="btn btn-primary"
                        asChild
                        variant="outline"
                        size="sm"
                      >
                        <Link
                          href={`/checklist/${Task.data[0].task_list.id}/cards/new?system_id=${Task.system.id}`}
                        >
                          <SquarePen className="w-4 h-4" />
                          Editar tarjeta
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="py-0 pb-2">
                <CardDescription>
                  <section className="w-full">
                    <ul className="w-full">
                      {Task.data.map((task) => (
                        <li
                          key={task.id}
                          className="mb-2"
                        >
                          <div>
                            <h1 className="text-sm">
                              {task.chekList}, Frecuencia: {task.frecuency},
                              Revisión: {task.review ? "OK" : "Pendiente"}
                            </h1>
                          </div>
                          <div className="text-sm">
                            <span className="text-gray-500">
                              nota: {task.note || "Sin notas"}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </section>
                </CardDescription>
              </CardContent>
              {/* <hr />
              <CardFooter>
                <div className="flex justify-end gap-3 pt-2">
                  
                  <Button
                    className="btn btn-primary"
                    variant="secondary"
                    size="sm"
                    asChild
                  >
                    <Link href={`/checklist/${Task.system.id}/edit`}>
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
                    <Link href={`/checklist/${Task.system.id}`}>
                      <Info className="w-4 h-4" />
                      Ver detalles
                    </Link>
                  </Button>
                </div>
              </CardFooter> */}
            </Card>
          </li>
        ))}
      </ul>
    </main>
  )
}
