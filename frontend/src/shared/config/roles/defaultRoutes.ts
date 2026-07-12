import { ROLE_CONFIGURATION, RoleId } from "./roleConfiguration"

export function getDefaultRoute(role: string | null | undefined): string {
  if (!role) return "/auth/login"
  
  const config = ROLE_CONFIGURATION[role as RoleId]
  if (config) {
    return config.defaultRoute
  }
  
  return "/"
}
