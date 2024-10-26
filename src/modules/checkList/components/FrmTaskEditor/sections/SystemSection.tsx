"use client"
import create from "zustand"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { TaskLisSchema, TaskManySchema } from "@/modules/core"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { useSystems } from "@/modules/systems"
import { useEffect } from "react"

interface SystemStore {
  selectedSystemId: number | null
  setSelectedSystemId: (id: number) => void
}

export const useSystemStore = create<SystemStore>((set) => ({
  selectedSystemId: null, // valor inicial
  setSelectedSystemId: (id) => set({ selectedSystemId: id })
}))

interface SystemSectionProps {
  form: UseFormReturn<z.infer<typeof TaskManySchema>>
}

export const SystemSection = () => {
  //   const { form } = props
  const { systems } = useSystems()

  // Accede a selectedSystemId y setSelectedSystemId desde el store de Zustand
  const { selectedSystemId, setSelectedSystemId } = useSystemStore()

  // Efecto para actualizar el system_id en todas las tareas cuando selectedSystemId cambia
  //   useEffect(() => {
  //     if (selectedSystemId !== null) {
  //       form.setValue("0.system_id", selectedSystemId)
  //       form.trigger()
  //     }
  //   }, [selectedSystemId])

  return (
    <div className="flex flex-col sm:flex-row gap-2 items-center">
      <div className="w-ful sm:w-[300px]">
        <h3 className="mb-1 text-sm font-bold">Sistema</h3>
        <p className="text-xs text-gray-500">
          Selecciona un sistema para asignar a todos los checklists.
        </p>
      </div>
      <div className="w-full">
        <Select
          onValueChange={(value) => {
            const systemId = parseInt(value)
            setSelectedSystemId(systemId) // Actualiza el system_id global en el store de Zustand
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un sistema" />
          </SelectTrigger>
          <SelectContent>
            {systems.map((system) => (
              <SelectItem
                key={system.id}
                value={String(system.id)}
              >
                {system.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
