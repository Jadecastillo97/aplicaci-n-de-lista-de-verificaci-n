"use client"
import ExcelJS from "exceljs"
import { format } from "date-fns"
import { ITask } from "@/types"

// Exportar datos a Excel
export const exportToExcel = (data: ITask[]) => {
  const formattedDate = format(new Date(), "MM/dd/yyyy")
  const NAME_OF_SHEET = `Checklists ${formattedDate}`
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet("Checklists")

  // Agregar la cabecera principal
  const titleRow = worksheet.addRow([`Checklist - Fecha: ${formattedDate}`])
  titleRow.font = { bold: true, size: 30 }
  worksheet.mergeCells("A1:E1") // Fusionar las celdas desde A1 hasta E1
  titleRow.alignment = { vertical: "middle", horizontal: "center" }

  // Agregar encabezados de columnas
  const headers = ["Sistema", "Descripción", "Frecuencia", "OK / NOK", "Notas"]
  const headerRow = worksheet.addRow(headers)

  // Estilizar la fila de encabezados
  headerRow.eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "000000" }
    }
    cell.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12
    }
    cell.alignment = { vertical: "middle", horizontal: "center" }
  })

  // Agrupar datos por sistema
  const groupedData: Record<string, ITask[]> = data.reduce(
    (acc: Record<string, ITask[]>, task) => {
      if (!acc[task.system.name]) acc[task.system.name] = []
      acc[task.system.name].push(task)
      return acc
    },
    {} as Record<string, ITask[]>
  )

  // Agregar datos al worksheet agrupados por sistema
  Object.entries(groupedData).forEach(([systemName, tasks]) => {
    tasks.forEach((task, index) => {
      worksheet.addRow([
        index === 0 ? systemName : "", // Mostrar el sistema solo en la primera fila
        task.description,
        task.frequency,
        task.status ? "OK" : "NOK",
        task.notes
      ])
    })
  })

  // Ajustar el ancho de las columnas automáticamente
  worksheet.columns.forEach((column) => {
    let maxLength = 0
    if (column.eachCell) {
      column.eachCell({ includeEmpty: true }, (cell) => {
        const cellValue = cell.value ? cell.value.toString() : ""
        maxLength = Math.max(maxLength, cellValue.length)
      })
    }
    column.width = maxLength + 2 // Agregar un margen
  })

  // Descargar el archivo Excel
  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${NAME_OF_SHEET}.xlsx`
    a.click()
  })
}
