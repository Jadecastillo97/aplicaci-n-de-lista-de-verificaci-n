"use client"
import { useState } from "react"
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
import { ReloadIcon } from "@radix-ui/react-icons"
// import { Switch } from '@/components/ui/switch'
// import { ContentDataEvent, InfoDataEvent, StatusDataEvent } from './sections'

export const FrmTaskListEditor = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const dateNow = new Date()

  const form = useForm<z.infer<typeof TaskLisSchema>>({
    resolver: zodResolver(TaskLisSchema)
  })

  async function onSubmit(data: z.infer<typeof TaskLisSchema>) {
    setLoading(true)
    const res = await saveTaskList({
      date: data?.date || dateNow.toISOString(),
      name: data?.name,
      coordinates: data?.coordinates || "",
      location: data?.location || "Lima",
      description: data?.description || "",
      status: data?.status || false
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
    setLoading(false)
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
            <Button
              type="submit"
              disabled={loading}
            >
              {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
              Guardar datos
            </Button>
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
