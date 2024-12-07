import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon
} from "lucide-react"

type Submenu = {
  href: string
  label: string
  active?: boolean
}

type Menu = {
  href: string
  label: string
  active?: boolean
  icon: LucideIcon
  submenus?: Submenu[]
}

type Group = {
  groupLabel: string
  menus: Menu[]
}

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/admin",
          label: "Dashboard",
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "",
          label: "Checklists Diarios",
          icon: SquarePen,
          submenus: [
            {
              href: "/admin/checklist",
              label: "Lista de Checklists"
            },
            {
              href: "/admin/checklist/create",
              label: "Iniciar Checklist"
            }
          ]
        },
        {
          href: "/admin/alerts",
          label: "Sistemas",
          icon: Bookmark
        }
      ]
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/admin/users",
          label: "Users",
          icon: Users
        },
        {
          href: "/admin/account",
          label: "Account",
          icon: Settings
        }
      ]
    }
  ]
}
