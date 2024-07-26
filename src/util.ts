import notifier from "node-notifier"
import readline from "readline"
import {
  DEFAULT_ROLES_3_PLAYERS,
  DEFAULT_ROLES_4_PLAYERS,
  DEFAULT_TOTAL_DURATION,
  DEFAULT_INTERVAL_DURATION,
  DEFAULT_PLAYERS,
  type DefaultRoles3Players,
  type DefaultRoles4Players,
} from "./constants"
import { logger } from "./logger"

// Function to validate the number of players
export function isValidPlayerCount(playerCount: number) {
  return playerCount === 3 || playerCount === 4
}

// Function to get roles based on the number of players
export function getRoles(players: string[], rotationIndex = 0) {
  const numPlayers = players.length
  switch (players.length) {
    case 3:
      return DEFAULT_ROLES_3_PLAYERS.reduce(
        (roles, role, i) => {
          const startIndex =
            rotationIndex === 0 ? 0 : (numPlayers - rotationIndex) % numPlayers
          roles[role] = players[(startIndex + i) % numPlayers]
          return roles
        },
        {} as Record<DefaultRoles3Players, string>,
      )
    default:
      return DEFAULT_ROLES_4_PLAYERS.reduce(
        (roles, role, i) => {
          const startIndex =
            rotationIndex === 0 ? 0 : (numPlayers - rotationIndex) % numPlayers
          roles[role] = players[(startIndex + i) % numPlayers]
          return roles
        },
        {} as Record<DefaultRoles4Players, string>,
      )
  }
}

// Function to send desktop notification
export function sendNotification(title: string, message: string) {
  notifier.notify({
    title,
    message,
    sound: true,
    wait: false,
  })
}

export const getUserInput = (query: string): Promise<string> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      rl.close()
      resolve(answer)
    })
  })
}

export const getSessionDetailsFromUserInput = async () => {
  const totalDurationInput = await getUserInput(
    `Session Duration (default: ${DEFAULT_TOTAL_DURATION} min): `,
  )
  const intervalDurationInput = await getUserInput(
    `Rotation Interval Duration (default: ${DEFAULT_INTERVAL_DURATION} min): `,
  )
  const playersInput = await getUserInput(
    `Enter player names separated by commas (default: ${DEFAULT_PLAYERS}): `,
  )

  const totalDuration = totalDurationInput
    ? parseInt(totalDurationInput)
    : DEFAULT_TOTAL_DURATION

  const intervalDuration = intervalDurationInput
    ? parseInt(intervalDurationInput)
    : DEFAULT_INTERVAL_DURATION

  const players = playersInput
    ? playersInput.split(",").map((player) => player.trim())
    : DEFAULT_PLAYERS

  return {
    totalDuration,
    intervalDuration,
    players,
  }
}

// Function to rotate players and roles and display alerts
export function rotatePlayers(
  players: string[],
  intervalDuration: number,
  totalDuration: number,
) {
  const numAlerts = Math.floor(totalDuration / intervalDuration)

  for (let i = 0; i < numAlerts; i++) {
    setTimeout(
      () => {
        const roles = getRoles(players, i)
        console.table(roles)
        // sendNotification(`Rotation Alert ${i + 1}`)
      },
      i * intervalDuration * 60 * 1000,
    ) // i * interval duration in milliseconds
  }
  // Add a final setTimeout to keep the script running until the last alert is done
  setTimeout(
    () => {
      logger.info("Rotation session completed.")
      process.exit(0) // Optionally exit the process after completion
    },
    totalDuration * 60 * 1000,
  )
}
