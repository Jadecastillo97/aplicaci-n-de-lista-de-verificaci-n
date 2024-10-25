import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { TaskLisSchema } from "@/modules/core"

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

export const InfoTaskListEvent = () => {
  const dateNow = new Date()

  const form = useForm<z.infer<typeof TaskLisSchema>>({
    resolver: zodResolver(TaskLisSchema),
    defaultValues: {
      date: dateNow.toISOString(),
      name: `Tarea ${dateNow.toISOString()}`,
      coordinates: "",
      location: "Lima",
      description: "",
      status: false
    }
  })

  return (
    <div className="flex flex-col gap-2 rounded-lg border p-4 bg-gray-50">
      <header className="grid grid-cols-1">
        <h3 className="mb-4 text-sm font-bold">Información general</h3>
        <hr />
      </header>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className="grid grid-cols-1 sm:grid-cols-3 items-center gap-5">
            <div className="flex flex-col gap-0.5 w-full col-span-1 sm:col-span-1">
              <FormLabel className="text-sm ">Nombre de la tarea</FormLabel>
              <FormDescription className="text-xs">
                Ingresa el nombre de la tarea. De lo contrario el nombre por la
                fecha de creación.
              </FormDescription>
            </div>
            <div className="col-span-1 sm:col-span-2 space-y-2">
              <FormControl>
                <Input
                  name={field.name}
                  value={field.value}
                  placeholder='Ejemplo: "Tarea de prueba"'
                />
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem className="grid grid-cols-1 sm:grid-cols-3 items-center gap-5">
            <div className="flex flex-col gap-0.5 w-full col-span-1 sm:col-span-1">
              <FormLabel className="text-sm">
                Observaciones de la tarea
              </FormLabel>
              <FormDescription className="tex-xs">
                Ingresa las observaciones de la tarea. (Opcional)
              </FormDescription>
            </div>
            <div className="col-span-1 sm:col-span-2 space-y-2">
              <FormControl>
                <Textarea
                  name={field.name}
                  value={field.value}
                  placeholder="Ejemplo: Se requiere de un proyector para la presentación"
                />
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem className="grid grid-cols-1 sm:grid-cols-3 items-center gap-5">
            <div className="flex flex-col gap-0.5 w-full col-span-1 sm:col-span-1">
              <FormLabel className="text-sm">
                Lugar del evento (opcional)
              </FormLabel>
              <FormDescription className="text-xs">
                Indica el lugar donde se realizará el evento. Por defecto es
                Lima
              </FormDescription>
            </div>
            <div className="col-span-1 sm:col-span-2 space-y-2">
              <FormControl>
                <Input
                  name={field.name}
                  value={field.value}
                  placeholder="Ejemplo: Lima"
                />
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="date"
        render={({ field }) => (
          <FormItem className="grid grid-cols-1 sm:grid-cols-3 items-center gap-5">
            <div className="flex flex-col gap-0.5 w-full col-span-1 sm:col-span-1">
              <FormLabel className="text-sm">
                Fecha del evento (opcional)
              </FormLabel>
              <FormDescription className="text-xs">
                Indica la fecha en que se realizará el evento. Por defecto es la
                fecha actual
              </FormDescription>
            </div>
            <div className="col-span-1 sm:col-span-2 space-y-2">
              <FormControl>
                <Input
                  name={field.name}
                  value={field.value}
                  placeholder="Ejemplo: 2022-12-31"
                  type="date"
                />
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </div>
  )
}
