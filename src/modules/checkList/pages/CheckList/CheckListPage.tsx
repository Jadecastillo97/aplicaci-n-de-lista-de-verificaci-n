import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { ITasksList } from "@/types"
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
                <CardTitle>{taskList.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  {taskList.description || "Ninguno"}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <div className="flex justify-end gap-3">
                  <Button
                    className="btn btn-primary"
                    asChild
                  >
                    <Link href={`/categories/${taskList.id}/edit`}>Editar</Link>
                  </Button>
                  <Button
                    className="btn btn-primary"
                    asChild
                  >
                    <Link href={`/checklist/${taskList.id}/cards`}>
                      Añadir tarjetas
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
