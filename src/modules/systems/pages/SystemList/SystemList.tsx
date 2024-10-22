import { ISystem } from "@/types"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ISystemListProps {
  data: ISystem[]
}

export const SystemList = (props: ISystemListProps) => {
  const { data } = props

  return (
    <main className="pt-5">
      <ul className="flex flex-col w-full gap-5">
        {data.map((system) => (
          <li
            key={system.id}
            className="w-full"
          >
            <Card>
              <CardHeader>
                <CardTitle>{system.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  {system.description || "Ninguno"}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <div className="flex justify-end">
                  <Button
                    className="btn btn-primary"
                    asChild
                  >
                    <Link href={`/categories/${system.id}/edit`}>Editar</Link>
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
