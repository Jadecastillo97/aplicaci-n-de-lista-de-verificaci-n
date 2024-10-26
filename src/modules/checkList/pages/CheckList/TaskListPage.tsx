import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { groupTasksBySystem } from "@/lib/parse-data-task"
import { parseDate } from "@/lib/parse-date"
import { ITaskDetail } from "@/types"
import { CirclePlus, FilePenLine, Info } from "lucide-react"
import Link from "next/link"
import { date } from "zod"

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
                  <div className="flex flex-col gap-2">
                    <div>
                      <span className="bg-gray-50 text-gray-800 px-5 border py-1 text-sm rounded-full font-medium">
                        Sistema: {Task.system.name}
                      </span>
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  <section>
                    {Task.data.map((task) => (
                      <div key={task.id}>
                        <div>
                          <span className="bg-yellow-50 text-yellow-800 px-4 py-1 rounded-full text-xs font-medium">
                            {task.created_at
                              ? parseDate(task.created_at)
                              : "Ninguna"}
                          </span>
                        </div>
                        <div>
                          <h1>{task.chekList}</h1>
                        </div>
                      </div>
                    ))}
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
                    <Link href={`/checklist/${Task.system.id}/cards`}>
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
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
    </main>
  )
}
