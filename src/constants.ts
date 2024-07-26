// Default values

export const DEFAULT_ROLES_4_PLAYERS = [
  "Driver",
  "Navigator",
  "Facilitator",
  "Scribe",
] as const

export type DefaultRoles4Players = (typeof DEFAULT_ROLES_4_PLAYERS)[number]

export const DEFAULT_ROLES_3_PLAYERS = [
  "Driver",
  "Navigator",
  "Facilitator/Scribe",
] as const

export type DefaultRoles3Players = (typeof DEFAULT_ROLES_3_PLAYERS)[number]

export const ERROR_MSG_PLAYERS =
  "Error: There must be exactly 3 or 4 players specified."

export const DEFAULT_TOTAL_DURATION = 120 // Default total duration in minutes

export const DEFAULT_INTERVAL_DURATION = 15 // Default interval duration in minutes

export const DEFAULT_PLAYERS = ["Jon", "Mason", "Saba", "Steve"]
