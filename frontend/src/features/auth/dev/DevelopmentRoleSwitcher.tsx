import * as React from "react"
import { useAuth } from "../../../shared/contexts/AuthContext"
import { ROLE_CONFIGURATION, RoleId } from "../../../shared/config/roles/roleConfiguration"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { Check } from "lucide-react"

export function DevelopmentRoleSwitcher() {
  const { user, login } = useAuth()

  if (!import.meta.env.DEV) return null

  return (
    <>
      <DropdownMenu.Label className="px-3 py-2 text-xs font-semibold text-text-muted flex items-center justify-between">
        Switch Development Role
        <span className="text-[9px] font-bold bg-primary/10 text-primary px-1.5 py-0.5 rounded-sm uppercase tracking-wider">DEV</span>
      </DropdownMenu.Label>
      {Object.values(ROLE_CONFIGURATION).map((role) => (
        <DropdownMenu.Item
          key={role.id}
          onClick={() => login(role.id as RoleId)}
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-text-primary outline-none cursor-pointer hover:bg-surface-200"
        >
          <div className="flex h-4 w-4 items-center justify-center">
            {user?.role === role.id && <Check className="h-4 w-4 text-primary" />}
          </div>
          {role.label}
        </DropdownMenu.Item>
      ))}
      <DropdownMenu.Separator className="my-1 h-px bg-border-subtle" />
    </>
  )
}
