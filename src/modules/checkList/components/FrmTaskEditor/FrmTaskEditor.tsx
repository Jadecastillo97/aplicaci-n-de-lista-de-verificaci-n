"use client"
import { useState } from "react"
import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { TaskManySchema } from "@/modules/core"
import { ITask } from "@/types"
import { ArrayTask, SystemSection } from "./sections"
import { saveTaskMany } from "@/api"

interface FrmTaskEditorProps {
  dataTask?: ITask[]
  dataTaskListId: string
}

export const FrmTaskEditor = (props: FrmTaskEditorProps) => {
  const { dataTask } = props
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof TaskManySchema>>({
    resolver: zodResolver(TaskManySchema),
    mode: "onSubmit",
    defaultValues: {
      tasks:
        dataTask?.map((task) => ({
          id: task.id ?? undefined,
          task_list_id: task.task_list_id,
          system_id: task.system_id,
          chekList: task.chekList || "", // Asegúrate de que esto sea un string
          frecuency: task.frecuency || "", // Asegúrate de que esto sea un string
          review: task.review || false,
          note: task.note || "", // Asegúrate de que esto sea un string
          status: task.status || false
        })) || [] // Si no hay dataTask, el valor será un array vacío
    }
  })

  async function onSubmit(data: z.infer<typeof TaskManySchema>) {
    setLoading(true)
    console.log(data)
    try {
      const res = await saveTaskMany({
        tasks: data.tasks
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
          title: "Tarea",
          description: "La tarea se ha guardado correctamente"
        })
        router.push(`/checklist/${props.dataTaskListId}/cards`)
      }
    } catch (error) {
      const resError = error as { message: string }
      toast({
        title: "Error",
        description: resError.message
      })
    }

    setLoading(false)
  }

  return (
    <main className="p-4 rounded-sm border mt-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <div>
            <div className="space-y-4">
              {/* <InfoTaskListEvent form={form} /> */}
              <SystemSection />
              <ArrayTask form={form} />
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
              onClick={() =>
                router.push(`/checklist/${props.dataTaskListId}/cards`)
              }
            >
              Cancelar
            </Button>
          </footer>
        </form>
      </Form>
    </main>
  )
}
