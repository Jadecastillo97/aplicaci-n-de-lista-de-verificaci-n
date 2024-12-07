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

interface ChecklistProps {
  data: ITask[]
}

export const ChecklistsView = (props: ChecklistProps) => {
  const { data } = props
  const [search, setSearch] = useState("")

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

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Daily Checklists</h1>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search by system, description, or date"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>System Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Date</TableHead>
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
                <TableCell>{checklist.status ? "OK" : "NOK"}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
