"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { TaskLisSchema } from "@/modules/core"
import { toast } from "@/hooks/use-toast"
import { InfoTaskListEvent } from "./sections"
import { saveTaskList } from "@/api"
// import { Switch } from '@/components/ui/switch'
// import { ContentDataEvent, InfoDataEvent, StatusDataEvent } from './sections'

export const FrmTaskListEditor = () => {
  const router = useRouter()
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

  async function onSubmit(data: z.infer<typeof TaskLisSchema>) {
    const res = await saveTaskList({
      date: data?.date,
      name: data?.name,
      coordinates: data?.coordinates,
      location: data?.location,
      description: data?.description,
      status: data?.status
    })
    console.log(res)
    if (res.error) {
      const error = res.error.message as string
      toast({
        title: "Error",
        description: error
      })
    } else {
      toast({
        title: `Tarea  ${data.name}`,
        description: "La tarea se ha guardado correctamente"
      })
      router.push("/checklist")
    }
  }
  return (
    <main>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <div>
            <div className="space-y-4">
              <InfoTaskListEvent />
            </div>
          </div>
          <footer className="flex justify-end space-x-4">
            <Button type="submit">Guardar datos</Button>
            <Button
              variant="ghost"
              onClick={() => router.push("/checklist")}
            >
              Cancelar
            </Button>
          </footer>
        </form>
      </Form>
    </main>
  )
}
