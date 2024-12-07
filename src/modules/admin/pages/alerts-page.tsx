"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { ISystem } from "@/types"
import { format } from "date-fns"
import { Input } from "@/components/ui/input"
import Link from "next/link"

interface PropsPage {
  data: ISystem[]
}

export const AlertsView = (props: PropsPage) => {
  const { data: alerts } = props

  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")

  const filteredAlerts = alerts.filter((alert) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "true" && alert.status) ||
      (filter === "false" && !alert.status)
    const matchesSearch = alert.name
      .toLowerCase()
      .includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Sistemas diarios</h1>

      <div className="mb-4 flex justify-between">
        <Select
          onValueChange={setFilter}
          defaultValue="all"
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter alerts" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="true">Activos</SelectItem>
            <SelectItem value="false">Inactivos</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Buscar por nombre..."
            className="max-w-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            size="sm"
            asChild
          >
            <Link href="/admin/alerts/create">Agregar sistema</Link>
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>System Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAlerts.map((alert) => (
            <TableRow key={alert.id}>
              <TableCell>{alert.description}</TableCell>
              <TableCell>{alert.name}</TableCell>
              <TableCell>{format(alert?.created_at, "dd/MM/yyyy")}</TableCell>
              <TableCell>{alert.status ? "Activo" : "Inactivo"}</TableCell>
              <TableCell>
                {!alert.status && (
                  <Button
                    variant="outline"
                    size="sm"
                  >
                    Mark as Resolved
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
