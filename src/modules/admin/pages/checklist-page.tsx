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

interface ChecklistProps {
  data: ITask[]
}

export const ChecklistsView = (props: ChecklistProps) => {
  const { data } = props
  const [search, setSearch] = useState("")

  const filteredChecklists = data.filter(
    (checklist) =>
      checklist.description.toLowerCase().includes(search.toLowerCase()) ||
      checklist.date.includes(search) ||
      checklist.system.name.toLowerCase().includes(search.toLowerCase())
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
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredChecklists.map((checklist) => (
            <TableRow key={checklist.id}>
              <TableCell>{checklist.system.name}</TableCell>
              <TableCell>{checklist.description}</TableCell>
              <TableCell>{checklist.date}</TableCell>
              <TableCell>
                {checklist.status ? "Completed" : "Pending"}
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                >
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
