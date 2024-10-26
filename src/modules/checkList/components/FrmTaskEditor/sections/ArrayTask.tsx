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
      {/* Cabecera de la tabla */}
      <div
        style={{ display: "flex", fontWeight: "bold", marginBottom: "0.5rem" }}
      >
        <div style={{ flex: 2 }}>TAREA</div>
        <div style={{ flex: 1 }}>FRECUENCIA</div>
        <div
          style={{ flex: "0 0 130px" }} // Ancho mínimo para revisión
        >
          OK / NO OK
        </div>
        <div style={{ flex: 2 }}>NOTA</div>
        <div style={{ flex: "0 0 auto" }}></div>{" "}
        {/* Espacio para el botón de eliminar */}
      </div>

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
              <FormItem style={{ flex: 2, marginRight: "1rem" }}>
                <Input
                  className="w-full"
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
              <FormItem style={{ flex: 1, marginRight: "1rem" }}>
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
              <FormItem style={{ flex: "0 0 100px", marginRight: "1rem" }}>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`review-${index}`} // Asegúrate de que el id sea único
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <label
                      htmlFor={`review-${index}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      OK
                    </label>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`tasks.${index}.note`}
            render={({ field }) => (
              <FormItem style={{ flex: 2, marginRight: "1rem" }}>
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
