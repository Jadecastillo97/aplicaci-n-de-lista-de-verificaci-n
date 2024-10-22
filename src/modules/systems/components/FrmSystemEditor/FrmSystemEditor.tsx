"use client"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { saveSystem, updateSystem } from "@/api"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Loader2 } from "lucide-react"
import { ISystem } from "@/types"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters."
  }),
  description: z.string().optional(),
  status: z.boolean().optional()
})

interface IProps {
  defaultValues?: ISystem
}

export const FrmSystemEditor = (props: IProps) => {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const { defaultValues } = props
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultValues?.name || "",
      description: defaultValues?.description || "",
      status: defaultValues?.status || false
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    const res = defaultValues?.id
      ? await updateSystem(defaultValues.id, values)
      : await saveSystem(values)
    if (res.error) {
      const error = res.error.message as string
      toast({
        title: "Error",
        description: `Error al guardar los datos: ${error}`,
        color: "red"
      })
    } else {
      toast({
        title: `${defaultValues?.id ? "Actualizado" : "Guardado"}`,
        description: "Datos guardados correctamente",
        color: "green"
      })

      form.reset()
      router.push("/categories")
    }

    setLoading(false)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <header>
          <h3 className="text-lg font-medium">Agregar sistema</h3>
        </header>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input
                  placeholder="ejemp. Generador"
                  {...field}
                />
              </FormControl>
              <FormDescription>Nombre del sistema</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Input
                  placeholder="ejemp. Sistema de generación de energía"
                  {...field}
                />
              </FormControl>
              <FormDescription>Descripción del sistema</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Estado</FormLabel>
                <FormDescription>
                  Si el sistema está activo o inactivo
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-readonly
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={loading}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {defaultValues?.id ? "Actualizar" : "Guardar"}
        </Button>
      </form>
    </Form>
  )
}
