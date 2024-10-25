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
  const form = useForm<z.infer<typeof TaskLisSchema>>({
    resolver: zodResolver(TaskLisSchema)
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
              <FormLabel className="text-sm ">Título</FormLabel>
              <FormDescription className="text-xs">
                Ingresa el título del evento.
              </FormDescription>
            </div>
            <div className="col-span-1 sm:col-span-2 space-y-2">
              <FormControl>
                <Input
                  name={field.name}
                  placeholder='Ejemplo: "Conferencia de tecnología"'
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
              <FormLabel className="text-sm">Enlace externo</FormLabel>
              <FormDescription className="tex-xs">
                Si el evento tiene un enlace externo, ingresa la URL aquí.
              </FormDescription>
            </div>
            <div className="col-span-1 sm:col-span-2 space-y-2">
              <FormControl>
                <Textarea
                  name={field.name}
                  placeholder="Ejemplo: https://www.evento.com"
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
              <FormLabel className="text-sm">Duración del evento</FormLabel>
              <FormDescription className="text-xs">
                Ingresa la descripción de la duración del evento.
              </FormDescription>
            </div>
            <div className="col-span-1 sm:col-span-2 space-y-2">
              <FormControl>
                <Input
                  name={field.name}
                  placeholder="Ejemplo: Del 1 al 5 de diciembre de 2021"
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
              <FormLabel className="text-sm">Ámbito del evento</FormLabel>
              <FormDescription className="text-xs">
                Indica si el evento es local, nacional o internacional.
              </FormDescription>
            </div>
            <div className="col-span-1 sm:col-span-2 space-y-2">
              <FormControl>
                <Input
                  name={field.name}
                  placeholder="Ejemplo: Nacional"
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
