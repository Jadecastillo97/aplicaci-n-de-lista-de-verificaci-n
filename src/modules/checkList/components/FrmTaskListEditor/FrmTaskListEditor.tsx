"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { TaskLisSchema } from "@/modules/core"
import { toast } from "@/hooks/use-toast"
// import { Switch } from '@/components/ui/switch'
// import { EventFormSchema } from '@/modules/admin'
// import { ContentDataEvent, InfoDataEvent, StatusDataEvent } from './sections'

export const FrmTaskListEditor = () => {
  const router = useRouter()

  const form = useForm<z.infer<typeof TaskLisSchema>>({
    resolver: zodResolver(TaskLisSchema)
  })

  function onSubmit(data: z.infer<typeof TaskLisSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      )
    })
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
              {/* <InfoDataEvent />
          <ContentDataEvent />
          <StatusDataEvent /> */}
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
