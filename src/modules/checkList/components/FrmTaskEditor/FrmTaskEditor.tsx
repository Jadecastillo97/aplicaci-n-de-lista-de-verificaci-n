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
import { SystemSection } from "./sections"

interface FrmTaskEditorProps {
  dataTask?: ITask[]
  dataTaskListId: string
}

export const FrmTaskEditor = (props: FrmTaskEditorProps) => {
  const { dataTask } = props
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const dateNow = new Date()

  const form = useForm<z.infer<typeof TaskManySchema>>({
    resolver: zodResolver(TaskManySchema),
    mode: "onSubmit",
    defaultValues:
      dataTask?.map((task) => ({
        id: task.id ?? undefined,
        task_list_id: task.task_list_id,
        system_id: task.system_id,
        chekList: task.chekList || undefined,
        frecuency: task.frecuency || undefined,
        review: task.review || false,
        note: task.note || undefined,
        status: task.status
      })) || ([] as z.infer<typeof TaskManySchema>)
  })

  async function onSubmit(data: z.infer<typeof TaskManySchema>) {
    setLoading(true)
    console.log(data)
    // const res = await saveTaskList({
    //   name: data?.name,
    //   date: data?.date || dateNow.toISOString(),
    //   coordinates: data?.coordinates || "",
    //   location: data?.location || "Lima",
    //   description: data?.description || "",
    //   status: data?.status || false
    // })
    // console.log(res)
    // if (res.error) {
    //   const error = res.error.message as string
    //   toast({
    //     title: "Error",
    //     description: error
    //   })
    // } else {
    //   toast({
    //     title: `Tarea  ${data.name}`,
    //     description: "La tarea se ha guardado correctamente"
    //   })
    //   router.push("/checklist")
    // }
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
              {/* <InfoTaskListEvent form={form} /> */}
              <SystemSection />
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
