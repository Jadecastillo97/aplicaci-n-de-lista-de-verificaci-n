'use client'
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
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

// Mock data for a checklist
const checklist = {
  systemName: "System A",
  operatorName: "John Doe",
  date: "2023-05-01",
  tasks: [
    {
      id: 1,
      description: "Check oil levels",
      status: "OK",
      notes: "All levels normal"
    },
    {
      id: 2,
      description: "Inspect belts",
      status: "NOK",
      notes: "Belt 2 needs replacement"
    },
    {
      id: 3,
      description: "Test emergency stop",
      status: "OK",
      notes: "Functioning correctly"
    }
  ]
}

export const ChecklistDetailView = () => {
  const handleExportPDF = () => {
    // Implement PDF export logic here
    console.log("Exporting checklist as PDF")
  }

  return (
    <Card className="w-full max-w-4xl mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Checklist Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 space-y-2">
          <p>
            <strong>System Name:</strong> {checklist.systemName}
          </p>
          <p>
            <strong>Operator Name:</strong> {checklist.operatorName}
          </p>
          <p>
            <strong>Date:</strong> {checklist.date}
          </p>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {checklist.tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.description}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>{task.notes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => window.history.back()}
        >
          Back
        </Button>
        <Button onClick={handleExportPDF}>Export as PDF</Button>
      </CardFooter>
    </Card>
  )
}
