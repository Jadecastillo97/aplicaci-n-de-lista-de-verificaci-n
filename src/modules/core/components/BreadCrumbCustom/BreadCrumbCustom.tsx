"use client"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const BreadcrumbCustom = () => {
  const pathname = usePathname()

  const generatePaths = (pathname: string) => {
    let paths = pathname.split("/").filter((path) => path !== "")

    const breadcrumbPaths = paths.map((path, index) => {
      const href = `/${paths.slice(0, index + 1).join("/")}`
      return (
        <BreadcrumbItem key={index}>
          <BreadcrumbLink asChild>
            <Link
              href={href}
              className="capitalize"
            >
              {path}
            </Link>
          </BreadcrumbLink>
          {index < paths.length - 1 && <BreadcrumbSeparator />}
        </BreadcrumbItem>
      )
    })

    return breadcrumbPaths
  }

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>{generatePaths(pathname)}</BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
