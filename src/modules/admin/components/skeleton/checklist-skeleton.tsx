import React from "react"
import { Skeleton } from "@/components/ui/skeleton"

export const ChecklistsSkeleton = () => {
  return (
    <div className="container mx-auto py-10">
      {/* Título */}
      <Skeleton className="h-8 w-48 mb-5" />

      {/* Barra de búsqueda y fecha */}
      <div className="flex items-center gap-4 mb-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-10 w-40" />
      </div>

      {/* Botón */}
      <Skeleton className="h-10 w-40 mb-4" />

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th>
                <Skeleton className="h-6 w-32" />
              </th>
              <th>
                <Skeleton className="h-6 w-40" />
              </th>
              <th>
                <Skeleton className="h-6 w-24" />
              </th>
              <th>
                <Skeleton className="h-6 w-24" />
              </th>
              <th>
                <Skeleton className="h-6 w-32" />
              </th>
              <th>
                <Skeleton className="h-6 w-20" />
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Filas de datos */}
            {Array.from({ length: 3 }).map((_, i) => (
              <tr key={i}>
                <td>
                  <Skeleton className="h-6 w-32" />
                </td>
                <td>
                  <Skeleton className="h-6 w-40" />
                </td>
                <td>
                  <Skeleton className="h-6 w-24" />
                </td>
                <td>
                  <Skeleton className="h-6 w-24" />
                </td>
                <td>
                  <Skeleton className="h-6 w-32" />
                </td>
                <td className="flex gap-2">
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
