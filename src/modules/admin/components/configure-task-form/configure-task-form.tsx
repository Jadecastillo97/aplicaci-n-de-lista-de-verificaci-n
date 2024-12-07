"use client"
import { useState } from "react"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

// Define the schema and type
export const taskSchema = z.object({
  description: z.string().min(1, "La descripción es requerida"),
  status: z.enum(["true", "false"], {
    required_error: "El estado es requerido"
  }),
  frequency: z.string().min(1, "La frecuencia es requerida"),
  notes: z.string().optional(),
  system_id: z.number({ message: "El sistema es requerido" }),
  date: z.string().optional()
})

type Task = z.infer<typeof taskSchema>

export const UpdateTaskForm = () => {
  const [task, setTask] = useState<Task>({
    description: "",
    status: "true",
    frequency: "",
    notes: "",
    system_id: 0,
    date: ""
  })

  const handleTaskChange = (field: keyof Task, value: string | number) => {
    setTask({ ...task, [field]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Validate task data using zod schema
      taskSchema.parse(task)
      console.log("Task updated successfully", task)
      // You can send the task data to the server here
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation errors:", error.errors)
      }
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Update Task</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <Input
            placeholder="Task Description"
            value={task.description}
            onChange={(e) => handleTaskChange("description", e.target.value)}
            required
          />
          <Select
            onValueChange={(value) => handleTaskChange("status", value)}
            defaultValue={task.status}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">True</SelectItem>
              <SelectItem value="false">False</SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder="Frequency"
            value={task.frequency}
            onChange={(e) => handleTaskChange("frequency", e.target.value)}
            required
          />
          <Input
            placeholder="Notes (optional)"
            value={task.notes || ""}
            onChange={(e) => handleTaskChange("notes", e.target.value)}
          />
          <Input
            type="number"
            placeholder="System ID"
            value={task.system_id}
            onChange={(e) =>
              handleTaskChange("system_id", Number(e.target.value))
            }
            required
          />
          <Input
            type="date"
            value={task.date || ""}
            onChange={(e) => handleTaskChange("date", e.target.value)}
          />
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          type="submit"
          onClick={handleSubmit}
        >
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  )
}
