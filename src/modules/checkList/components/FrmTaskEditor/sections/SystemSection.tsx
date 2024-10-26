"use client"
import create from "zustand"
import { useEffect } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { useSystems } from "@/modules/systems"
import { useSearchParams } from "next/navigation"

interface SystemStore {
  selectedSystemId: number | null
  setSelectedSystemId: (id: number) => void
}

export const useSystemStore = create<SystemStore>((set) => ({
  selectedSystemId: null, // valor inicial
  setSelectedSystemId: (id) => set({ selectedSystemId: id })
}))

export const SystemSection = () => {
  const { systems, loading } = useSystems()
  const searchParams = useSearchParams()

  const idSystem = searchParams.get("system_id")

  // Accede a selectedSystemId y setSelectedSystemId desde el store de Zustand
  const { setSelectedSystemId } = useSystemStore()

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
          defaultValue={idSystem ? String(idSystem) : ""}
          onValueChange={(value) => {
            const systemId = parseInt(value)
            setSelectedSystemId(systemId) // Actualiza el system_id global en el store de Zustand
          }}
          disabled={systems.length === 0 || idSystem !== null}
        >
          <SelectTrigger>
            <SelectValue
              placeholder={loading ? "Cargando..." : "Selecciona un sistema"}
            />
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
