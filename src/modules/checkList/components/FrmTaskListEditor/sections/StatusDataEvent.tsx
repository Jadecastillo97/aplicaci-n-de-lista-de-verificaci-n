import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { TaskLisSchema } from "@/modules/core"

import {
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export const StatusDataEvent = () => {
  const form = useForm<z.infer<typeof TaskLisSchema>>({
    resolver: zodResolver(TaskLisSchema)
  })
  return (
    <div className="flex flex-col gap-2 rounded-lg border p-4 bg-gray-50">
      <header className="grid grid-cols-1">
        <h3 className="mb-4 text-sm font-bold">Estado del evento</h3>
        <hr />
      </header>
      {/* <FormField
        control={form.control}
        name="status"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>
              Selecciona el estado del evento, como se creará inicialmente.
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-x-3 space-y-0 border p-4 rounded-sm">
                  <FormControl>
                    <RadioGroupItem value="DRAFT" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    <label
                      htmlFor="terms1"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Borrador
                    </label>
                    <p className="text-sm text-muted-foreground">
                      El evento no se mostrará en la página web, pero podrás ver
                      y editar la información.
                    </p>
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0 border p-4 rounded-sm">
                  <FormControl>
                    <RadioGroupItem value="PUBLISHED" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    <label
                      htmlFor="terms2"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Publicado
                    </label>
                    <p className="text-sm text-muted-foreground">
                      El evento se mostrará en la página web y podrás ver y
                      editar la información.
                    </p>
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0 border p-4 rounded-sm bg-red-50 border-red-500 text-destructive">
                  <FormControl>
                    <RadioGroupItem value="DISABLED" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    <label
                      htmlFor="terms3"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-destructive"
                    >
                      Eliminado
                    </label>
                    <p className="text-sm text-muted-foreground">
                      El evento no se mostrará en la página web y no podrás ver
                      ni editar la información.
                    </p>
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      /> */}
    </div>
  )
}
