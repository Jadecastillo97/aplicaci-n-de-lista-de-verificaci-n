import { useState } from "react"
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

interface Task {
  description: string
  frequency: string
}

export const ConfigureTasksForm = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { description: "", frequency: "" }
  ])

  const handleAddTask = () => {
    setTasks([...tasks, { description: "", frequency: "" }])
  }

  const handleTaskChange = (
    index: number,
    field: keyof Task,
    value: string
  ) => {
    const newTasks = [...tasks]
    newTasks[index] = { ...newTasks[index], [field]: value }
    setTasks(newTasks)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Tasks configuration submitted", tasks)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Configure Tasks for System
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {tasks.map((task, index) => (
            <div
              key={index}
              className="space-y-2 border p-4 rounded-md"
            >
              <Input
                placeholder="Task Description"
                value={task.description}
                onChange={(e) =>
                  handleTaskChange(index, "description", e.target.value)
                }
                required
              />
              <Select
                onValueChange={(value) =>
                  handleTaskChange(index, "frequency", value)
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ))}
          <Button
            type="button"
            onClick={handleAddTask}
            variant="outline"
          >
            Add Another Task
          </Button>
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
