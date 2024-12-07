"use client"
import { useEffect, useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { date, z } from "zod"
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
import { taskSchema } from "@/modules/core/schemas/TaskListSchema"
import { saveTaskMany } from "@/api"

const checklistFormSchema = z.object({
  selectedSystem: z.string().min(1, "Debes seleccionar un sistema"),
  tasks: z.array(taskSchema).min(1, "Debes añadir al menos una tarea"),
  date: z.string().optional()
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
      tasks: [],
      date: new Date().toISOString().split("T")[0]
    }
  })

  const { fields, append, remove } = useFieldArray({ control, name: "tasks" })

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

  const confirmSubmit = async () => {
    setIsDialogOpen(false)
    const { task } = await saveTaskMany({
      tasks: watch("tasks")
    })
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <section>
            {/* // add date input */}
            <div>
              <label
                htmlFor="date"
                className="text-sm font-medium"
              >
                Fecha
              </label>
              <Input
                type="date"
                id="date"
                {...register("date", {
                  required: "Debes seleccionar una fecha"
                })}
              />
              {errors?.date && (
                <p className="text-red-500 text-sm">{errors?.date?.message}</p>
              )}
            </div>
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
              {errors && errors?.selectedSystem && (
                <p className="text-red-500 text-sm">
                  {errors?.selectedSystem?.message}
                </p>
              )}
            </div>
          </section>
        )
      case 2:
        return (
          <div className="space-y-4">
            {fields.map((task, index) => (
              <div
                key={task.id}
                className="space-y-2 border p-4 rounded-md"
              >
                <Textarea
                  placeholder="Descripción de la tarea"
                  {...register(`tasks.${index}.description`)}
                  rows={5}
                />
                {errors?.tasks?.[index]?.description && (
                  <p className="text-red-500 text-sm">
                    {errors?.tasks[index]?.description?.message}
                  </p>
                )}

                <Select
                  onValueChange={(value) =>
                    setValue(
                      `tasks.${index}.status`,
                      value as "true" | "false",
                      {
                        shouldValidate: true
                      }
                    )
                  }
                  defaultValue="true"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">OK</SelectItem>
                    <SelectItem value="false">NOK</SelectItem>
                  </SelectContent>
                </Select>
                {errors && errors?.tasks?.[index]?.status && (
                  <p className="text-red-500 text-sm">
                    {errors && errors?.tasks[index]?.status?.message}
                  </p>
                )}

                <Input
                  placeholder="Frecuencia"
                  {...register(`tasks.${index}.frequency`)}
                />
                {errors && errors?.tasks?.[index]?.frequency && (
                  <p className="text-red-500 text-sm">
                    {errors && errors?.tasks[index]?.frequency?.message}
                  </p>
                )}

                <Textarea
                  placeholder="Notas"
                  {...register(`tasks.${index}.notes`)}
                />
              </div>
            ))}
            <footer className="flex gap-3 justify-start">
              <Button
                variant="outline"
                onClick={() => fields.length > 1 && remove(fields.length - 1)}
                disabled={fields.length <= 1}
                type="button"
              >
                Quitar tarea
              </Button>
              <Button
                onClick={() =>
                  append({
                    description: "",
                    status: "true",
                    frequency: "",
                    notes: "",
                    system_id: Number(watch("selectedSystem") || ""),
                    date: watch("date") || ""
                  })
                }
                type="button"
                disabled={Object.keys(errors?.tasks || {}).length > 0}
              >
                Añadir otra tarea
              </Button>
            </footer>
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
      <form onSubmit={handleSubmit(onSubmit)}>
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
            {renderStep()}
          </CardContent>
          <CardFooter className="flex justify-between">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={() => {
                  setStep(step - 1)
                  if (step === 2) {
                    setValue("selectedSystem", "", { shouldValidate: true })
                  }
                }}
                type="button"
              >
                Anterior
              </Button>
            )}
            {step < 3 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={step === 1 && !watch("selectedSystem")}
                type="button"
              >
                Siguiente
              </Button>
            ) : (
              <Button type="submit">Confirmar</Button>
            )}
          </CardFooter>
        </Card>
      </form>

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
