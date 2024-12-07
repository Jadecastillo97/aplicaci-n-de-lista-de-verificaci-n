"use client"
import { z } from "zod"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ISystem, ITask } from "@/types"
import { taskSchema } from "@/modules/core/schemas/TaskListSchema"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from "react"
import { fetchSystems } from "@/api"

// Define the form schema using Zod
const formSchema = taskSchema

interface UpdateTaskFormProps {
  dataDetail?: ITask
}

export const UpdateTaskForm = ({ dataDetail }: UpdateTaskFormProps) => {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors }
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: dataDetail?.description,
      status: dataDetail?.status ? "true" : "false",
      frequency: dataDetail?.frequency,
      notes: dataDetail?.notes,
      system_id: dataDetail?.system_id,
      date: dataDetail?.date
    }
  })

  const [systems, setSystems] = useState<ISystem[]>([])

  const fetchSystemsData = async () => {
    const { systems } = await fetchSystems()
    if (systems) {
      setSystems(systems)
    }
  }

  useEffect(() => {
    fetchSystemsData()
  }, [])

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Form submitted successfully:", data)
    // Add your update logic here
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Update Task</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* System ID */}
          <div>
            <Controller
              name="system_id"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value ? field.value.toString() : ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select System" />
                  </SelectTrigger>
                  <SelectContent>
                    {systems.map((system) => (
                      <SelectItem
                        key={system.id.toString()}
                        value={system.id ? system.id.toString() : ""}
                      >
                        {system.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div>
            {errors.system_id && (
              <p className="text-red-500 text-sm">{errors.system_id.message}</p>
            )}
          </div>
          {/* Task Description */}
          <div>
            <Input
              placeholder="Task Description"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Task Status */}
          <div>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">OK</SelectItem>
                    <SelectItem value="false">NOK</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.status && (
              <p className="text-red-500 text-sm">{errors.status.message}</p>
            )}
          </div>

          {/* Frequency */}
          <div>
            <Input
              placeholder="Frequency"
              {...register("frequency")}
            />
            {errors.frequency && (
              <p className="text-red-500 text-sm">{errors.frequency.message}</p>
            )}
          </div>

          {/* Notes */}
          <div>
            <Textarea
              placeholder="Notes (optional)"
              {...register("notes")}
            />
          </div>

          {/* Date */}
          <div>
            <Input
              type="date"
              {...register("date")}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
          >
            Save Changes
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
