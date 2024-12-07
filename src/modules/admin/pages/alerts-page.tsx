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

// Mock data for alerts
const initialAlerts = [
  {
    id: 1,
    message: "Oil level low in System A",
    systemName: "System A",
    date: "2023-05-01",
    resolved: false
  },
  {
    id: 2,
    message: "Pressure exceeds threshold in System B",
    systemName: "System B",
    date: "2023-05-02",
    resolved: false
  },
  {
    id: 3,
    message: "Maintenance required for System C",
    systemName: "System C",
    date: "2023-05-03",
    resolved: true
  }
]

export const AlertsView = () => {
  const [alerts, setAlerts] = useState(initialAlerts)
  const [filter, setFilter] = useState("all")

  const handleMarkAsResolved = (id: number) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === id ? { ...alert, resolved: true } : alert
      )
    )
  }

  const filteredAlerts = alerts.filter((alert) => {
    if (filter === "all") return true
    if (filter === "unresolved") return !alert.resolved
    if (filter === "resolved") return alert.resolved
    return true
  })

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Alerts</h1>
      <div className="mb-4">
        <Select
          onValueChange={setFilter}
          defaultValue="all"
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter alerts" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Alerts</SelectItem>
            <SelectItem value="unresolved">Unresolved</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Alert Message</TableHead>
            <TableHead>System Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAlerts.map((alert) => (
            <TableRow key={alert.id}>
              <TableCell>{alert.message}</TableCell>
              <TableCell>{alert.systemName}</TableCell>
              <TableCell>{alert.date}</TableCell>
              <TableCell>
                {alert.resolved ? "Resolved" : "Unresolved"}
              </TableCell>
              <TableCell>
                {!alert.resolved && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleMarkAsResolved(alert.id)}
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
