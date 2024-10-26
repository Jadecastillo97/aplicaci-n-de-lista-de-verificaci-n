import {
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { TaskManySchema } from "@/modules/core"
import { TrashIcon } from "lucide-react"
import { useParams } from "next/navigation"
import { useSystemStore } from "./SystemSection"

interface InfoTaskListEventProps {
  form: UseFormReturn<z.infer<typeof TaskManySchema>>
}

export const ArrayTask = ({ form }: InfoTaskListEventProps) => {
  const { id } = useParams()
  const { selectedSystemId } = useSystemStore()
  // Manejar la adición de una nueva tarea
  const addTask = () => {
    const tasks = form.getValues("tasks") || []
    form.setValue("tasks", [
      ...tasks,
      {
        chekList: "",
        frecuency: "",
        review: false,
        note: "",
        status: true,
        task_list_id: Number(id),
        system_id: Number(selectedSystemId)
      }
    ])
  }

  // Manejar la eliminación de una tarea
  const removeTask = (index: number) => {
    const tasks = form.getValues("tasks") || []
    tasks.splice(index, 1) // Eliminar la tarea del array
    form.setValue("tasks", tasks)
  }

  return (
    <div>
      <h2>Tareas</h2>
      {form.watch("tasks")?.map((task: any, index: number) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "1rem"
          }}
        >
          <FormField
            control={form.control}
            name={`tasks.${index}.chekList`}
            render={({ field }) => (
              <FormItem style={{ marginRight: "1rem" }}>
                <FormLabel>Tarea</FormLabel>
                <Input
                  placeholder="Ingrese el nombre de la tarea"
                  {...field}
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`tasks.${index}.frecuency`}
            render={({ field }) => (
              <FormItem style={{ marginRight: "1rem" }}>
                <FormLabel>Frecuencia</FormLabel>
                <Input
                  placeholder="Ingrese la frecuencia"
                  {...field}
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`tasks.${index}.review`}
            render={({ field }) => (
              <FormItem style={{ marginRight: "1rem" }}>
                <FormLabel>Revisión</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`tasks.${index}.note`}
            render={({ field }) => (
              <FormItem style={{ marginRight: "1rem" }}>
                <FormLabel>Nota</FormLabel>
                <Textarea
                  placeholder="Ingrese una nota"
                  {...field}
                />
              </FormItem>
            )}
          />

          <Button
            type="button"
            onClick={() => removeTask(index)}
            variant="destructive"
            size="icon"
          >
            <TrashIcon />
          </Button>
        </div>
      ))}

      <Button
        type="button"
        onClick={addTask}
      >
        Agregar Tarea
      </Button>
    </div>
  )
}
