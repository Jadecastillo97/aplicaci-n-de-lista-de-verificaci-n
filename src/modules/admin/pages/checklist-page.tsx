"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { ITask } from "@/types"
import { format } from "date-fns"
import { Edit, ImagePlus, Plus } from "lucide-react"
import Link from "next/link"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { Badge } from "@/components/ui/badge"
interface ChecklistProps {
  data: ITask[]
}

export const ChecklistsView = (props: ChecklistProps) => {
  const { data } = props
  const [search, setSearch] = useState("")

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const dateValue = searchParams.get("date") || new Date().toISOString()
  const newDate = new Date(dateValue)
  if (searchParams.get("date")) {
    newDate.setDate(newDate.getDate() + 1)
  }
  const formattedDate = format(newDate, "yyyy-MM-dd")

  // Filtrar los datos según el término de búsqueda
  const filteredChecklists = data.filter(
    (checklist) =>
      checklist.description.toLowerCase().includes(search.toLowerCase()) ||
      checklist.date.includes(search) ||
      checklist.system.name.toLowerCase().includes(search.toLowerCase())
  )

  // Agrupar los datos por sistema
  const groupedChecklists: Record<string, ITask[]> = filteredChecklists.reduce(
    (groups, checklist) => {
      const systemName = checklist.system.name
      if (!groups[systemName]) {
        groups[systemName] = []
      }
      groups[systemName].push(checklist)
      return groups
    },
    {} as Record<string, ITask[]>
  )

  const handleDateChange = (date: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (date) {
      const newDate = new Date(date)
      newDate.setDate(newDate.getDate() + 1)
      params.set("date", format(newDate, "yyyy-MM-dd"))
    } else {
      params.delete("date")
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Daily Checklists</h1>

      <div className="mb-4 flex gap-4">
        <Input
          type="text"
          placeholder="Search by system, description, or date"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />

        <Input
          type="date"
          value={formattedDate}
          onChange={(e) => handleDateChange(e.target.value)}
          className="max-w-[200px]"
          max={format(new Date(), "yyyy-MM-dd")}
        />

        <Button
          disabled={!(formattedDate === format(new Date(), "yyyy-MM-dd"))}
          asChild
        >
          <Link href="/admin/checklist/create">
            <Plus size={20} />
            New Checklist
          </Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>System Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Frecuencia</TableHead>
            <TableHead>Notas</TableHead>
            <TableHead>OK / NOK</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(groupedChecklists).map(([systemName, tasks]) =>
            tasks.map((checklist, index) => (
              <TableRow key={checklist.id}>
                {/* Mostrar el nombre del sistema solo en la primera fila del grupo */}
                {index === 0 && (
                  <TableCell rowSpan={tasks.length}>{systemName}</TableCell>
                )}
                <TableCell>{checklist.description}</TableCell>
                <TableCell>
                  {format(new Date(checklist.date), "MM/dd/yyyy")}
                </TableCell>
                <TableCell>{checklist.frequency}</TableCell>
                <TableCell className="max-w-xs truncate">
                  <div
                    className="line-clamp-3 min-w-[200px] max-w-[200px]"
                    title={checklist.notes}
                  >
                    {checklist.notes}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    className={`rounded-full text-xs font-semibold ${
                      checklist.status
                        ? "bg-lime-300 text-black dark:bg-lime-400 dark:text-gray-800"
                        : "bg-red-500 dark:bg-red-600"
                    }`}
                  >
                    {checklist.status ? "OK" : "NOK"}
                  </Badge>
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                  >
                    <Link href={`/admin/checklist/${checklist.id}/edit`}>
                      <Edit size={20} />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                  >
                    <ImagePlus size={20} />
                  </Button>
                  {/* <Button
                    variant="outline"
                    size="icon"
                  >
                    <Info size={20} />
                  </Button> */}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
