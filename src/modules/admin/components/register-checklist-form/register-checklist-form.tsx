"use client"
import { useEffect, useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"

import { fetchSystems } from "@/api"
import { ISystem } from "@/types"

// Define schema with zod
const taskSchema = z.object({
  description: z.string().min(1, "La descripción es requerida"),
  status: z.enum(["OK", "NOK"], { required_error: "El estado es requerido" }),
  frequency: z.string().min(1, "La frecuencia es requerida"),
  evidence: z.string().optional(),
  notes: z.string().optional()
})

const checklistFormSchema = z.object({
  selectedSystem: z.string().min(1, "Debes seleccionar un sistema"),
  tasks: z.array(taskSchema).min(1, "Debes añadir al menos una tarea")
})

type ChecklistFormData = z.infer<typeof checklistFormSchema>

export const RegisterChecklistForm = () => {
  const [step, setStep] = useState(1)
  const [systems, setSystems] = useState<ISystem[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors }
  } = useForm<ChecklistFormData>({
    resolver: zodResolver(checklistFormSchema),
    defaultValues: {
      selectedSystem: "",
      tasks: [
        {
          description: "",
          status: "OK",
          frequency: "",
          evidence: "",
          notes: ""
        }
      ]
    }
  })

  const { fields, append } = useFieldArray({ control, name: "tasks" })

  const fetchSystemsData = async () => {
    const { systems } = await fetchSystems()
    if (systems) {
      setSystems(systems)
    }
  }

  useEffect(() => {
    fetchSystemsData()
  }, [])

  const onSubmit = (data: ChecklistFormData) => {
    console.log("Checklist data ready for confirmation", data)
    setIsDialogOpen(true)
  }

  const confirmSubmit = () => {
    console.log("Checklist submitted")
    setIsDialogOpen(false)
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
              Selecciona un sistema
            </label>
            <Select
              onValueChange={(value) =>
                setValue("selectedSystem", value, { shouldValidate: true })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un sistema" />
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
            {errors.selectedSystem && (
              <p className="text-red-500 text-sm">
                {errors.selectedSystem.message}
              </p>
            )}
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            {fields.map((task, index) => (
              <div
                key={task.id}
                className="space-y-2 border p-4 rounded-md"
              >
                <Input
                  placeholder="Descripción de la tarea"
                  {...register(`tasks.${index}.description`)}
                />
                {errors.tasks?.[index]?.description && (
                  <p className="text-red-500 text-sm">
                    {errors.tasks[index].description?.message}
                  </p>
                )}

                <Select
                  onValueChange={(value) =>
                    setValue(`tasks.${index}.status`, value as "OK" | "NOK", {
                      shouldValidate: true
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="OK">OK</SelectItem>
                    <SelectItem value="NOK">NOK</SelectItem>
                  </SelectContent>
                </Select>
                {errors.tasks?.[index]?.status && (
                  <p className="text-red-500 text-sm">
                    {errors.tasks[index].status?.message}
                  </p>
                )}

                <Input
                  placeholder="Frecuencia"
                  {...register(`tasks.${index}.frequency`)}
                />
                {errors.tasks?.[index]?.frequency && (
                  <p className="text-red-500 text-sm">
                    {errors.tasks[index].frequency?.message}
                  </p>
                )}

                <Input
                  type="file"
                  accept="image/*"
                  {...register(`tasks.${index}.evidence`)}
                />
                <Textarea
                  placeholder="Notas"
                  {...register(`tasks.${index}.notes`)}
                />
              </div>
            ))}
            <Button
              onClick={() =>
                append({
                  description: "",
                  status: "OK",
                  frequency: "",
                  evidence: "",
                  notes: ""
                })
              }
            >
              Añadir otra tarea
            </Button>
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="font-semibold">Revisar Checklist</h3>
            <p>
              Sistema seleccionado:{" "}
              {
                systems.find((s) => s.id.toString() === watch("selectedSystem"))
                  ?.name
              }
            </p>
            {watch("tasks").map((task, index) => (
              <div
                key={index}
                className="border p-2 rounded-md"
              >
                <p>Descripción: {task.description}</p>
                <p>Estado: {task.status}</p>
                <p>Frecuencia: {task.frequency}</p>
                {task.evidence && <p>Evidencia: {task.evidence}</p>}
                <p>Notas: {task.notes}</p>
              </div>
            ))}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto mt-10">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Registrar un nuevo checklist
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress
            value={(step / 3) * 100}
            className="mb-4"
          />
          <form onSubmit={handleSubmit(onSubmit)}>{renderStep()}</form>
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 && (
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
            >
              Anterior
            </Button>
          )}
          {step < 3 ? (
            <Button onClick={() => setStep(step + 1)}>Siguiente</Button>
          ) : (
            <Button type="submit">Confirmar</Button>
          )}
        </CardFooter>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Checklist</DialogTitle>
          </DialogHeader>
          <p>¿Estás seguro de enviar este checklist?</p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button onClick={confirmSubmit}>Confirmar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
