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
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious
// } from "@/components/ui/pagination"

// Mock data
const checklists = [
  {
    id: 1,
    systemName: "System A",
    operatorName: "John Doe",
    date: "2023-05-01",
    status: "OK"
  },
  {
    id: 2,
    systemName: "System B",
    operatorName: "Jane Smith",
    date: "2023-05-02",
    status: "NOK"
  }
  // Add more mock data as needed
]

export const ChecklistsView = () => {
  const [search, setSearch] = useState("")

  const filteredChecklists = checklists.filter(
    (checklist) =>
      checklist.systemName.toLowerCase().includes(search.toLowerCase()) ||
      checklist.date.includes(search)
  )

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Daily Checklists</h1>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search by system or date"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>System Name</TableHead>
            <TableHead>Operator Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredChecklists.map((checklist) => (
            <TableRow key={checklist.id}>
              <TableCell>{checklist.systemName}</TableCell>
              <TableCell>{checklist.operatorName}</TableCell>
              <TableCell>{checklist.date}</TableCell>
              <TableCell>{checklist.status}</TableCell>
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
      {/* <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </Pagination>
      </PaginationContent>
    </Pagination> */}
    </div>
  )
}
