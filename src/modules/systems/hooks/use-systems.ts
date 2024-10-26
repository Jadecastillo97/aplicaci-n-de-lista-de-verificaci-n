import { useEffect, useState } from "react"
import { ISystem } from "@/types"
import { fetchSystems } from "@/api"

export const useSystems = () => {
  const [systems, setSystems] = useState<ISystem[]>([])
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchSystemsList = async () => {
      setLoading(true)
      try {
        const { systems } = await fetchSystems()
        if (systems) {
          setSystems(systems)
        } else {
          setSystems([])
        }
      } catch (error) {
        setSystems([])
        setError(error as Error)
      }
      setLoading(false)
    }

    fetchSystems()
  }, [])

  return { systems, error, loading }
}
