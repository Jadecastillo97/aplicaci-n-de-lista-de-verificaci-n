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
  idSystem?: string
}

export const SystemSection = (props: SystemSectionProps) => {
  const { idSystem } = props
  const { systems } = useSystems()

  // Accede a selectedSystemId y setSelectedSystemId desde el store de Zustand
  const { setSelectedSystemId } = useSystemStore()

  useEffect(() => {
    if (idSystem) {
      setSelectedSystemId(parseInt(idSystem))
    }
  }, [idSystem])

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
          defaultValue={idSystem ? idSystem : ""}
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
                key={String(system.id)}
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
