import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
import { Progress } from "@/components/ui/progress"

// Mock data for systems
const systems = [
  { id: 1, name: "System A" },
  { id: 2, name: "System B" },
  { id: 3, name: "System C" }
]

export default function RegisterChecklistForm() {
  const [step, setStep] = useState(1)
  const [selectedSystem, setSelectedSystem] = useState("")
  const [tasks, setTasks] = useState([
    { description: "", status: "", notes: "" }
  ])

  const handleAddTask = () => {
    setTasks([...tasks, { description: "", status: "", notes: "" }])
  }

  const handleTaskChange = (index: number, field: string, value: string) => {
    const newTasks = [...tasks]
    newTasks[index] = { ...newTasks[index], [field]: value }
    setTasks(newTasks)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Checklist submitted", { selectedSystem, tasks })
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <label
              htmlFor="system"
              className="text-sm font-medium"
            >
              Select System
            </label>
            <Select
              onValueChange={setSelectedSystem}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose a system" />
              </SelectTrigger>
              <SelectContent>
                {systems.map((system) => (
                  <SelectItem
                    key={system.id}
                    value={system.id.toString()}
                  >
                    {system.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
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
                    handleTaskChange(index, "status", value)
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="OK">OK</SelectItem>
                    <SelectItem value="NOK">NOK</SelectItem>
                  </SelectContent>
                </Select>
                <Textarea
                  placeholder="Notes"
                  value={task.notes}
                  onChange={(e) =>
                    handleTaskChange(index, "notes", e.target.value)
                  }
                />
              </div>
            ))}
            <Button onClick={handleAddTask}>Add Another Task</Button>
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="font-semibold">Review Checklist</h3>
            <p>
              System:{" "}
              {systems.find((s) => s.id.toString() === selectedSystem)?.name}
            </p>
            {tasks.map((task, index) => (
              <div
                key={index}
                className="border p-2 rounded-md"
              >
                <p>Description: {task.description}</p>
                <p>Status: {task.status}</p>
                <p>Notes: {task.notes}</p>
              </div>
            ))}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Register New Checklist
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Progress
          value={(step / 3) * 100}
          className="mb-4"
        />
        <form onSubmit={handleSubmit}>{renderStep()}</form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {step > 1 && (
          <Button
            variant="outline"
            onClick={() => setStep(step - 1)}
          >
            Previous
          </Button>
        )}
        {step < 3 ? (
          <Button onClick={() => setStep(step + 1)}>Next</Button>
        ) : (
          <Button type="submit">Submit Checklist</Button>
        )}
      </CardFooter>
    </Card>
  )
}
