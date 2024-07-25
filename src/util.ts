import notifier from "node-notifier"
import readline from "readline"
import {
  DEFAULT_ROLES_3_PLAYERS,
  DEFAULT_ROLES_4_PLAYERS,
  DEFAULT_TOTAL_DURATION,
  DEFAULT_INTERVAL_DURATION,
} from "./constants"

// Function to validate the number of players
export function isValidPlayerCount(playerCount: number) {
  return playerCount === 3 || playerCount === 4
}

// Function to get roles based on the number of players
export function getRoles(playerCount: number) {
  return playerCount === 4 ? DEFAULT_ROLES_4_PLAYERS : DEFAULT_ROLES_3_PLAYERS
}

// Function to create a rotation string
export function createRotation(
  players: string[],
  roles: string[],
  startIndex: number,
) {
  return roles
    .map((role, j) => `${players[(startIndex + j) % players.length]} - ${role}`)
    .join(", ")
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
    `Enter the total duration in minutes for the session (default: ${DEFAULT_TOTAL_DURATION} min): `,
  )
  const intervalDurationInput = await getUserInput(
    `Enter the interval duration in minutes for each rotation (default: ${DEFAULT_INTERVAL_DURATION} min): `,
  )
  const playersInput = await getUserInput(
    "Enter player names separated by commas: ",
  )

  const totalDuration = totalDurationInput
    ? parseInt(totalDurationInput)
    : DEFAULT_TOTAL_DURATION

  const intervalDuration = intervalDurationInput
    ? parseInt(intervalDurationInput)
    : DEFAULT_INTERVAL_DURATION

  const players = playersInput.split(",").map((player) => player.trim())

  return {
    totalDuration,
    intervalDuration,
    players,
  }
}

// Function to rotate players and roles and display alerts
export function rotatePlayers({
  players,
  roles,
  numAlerts,
  intervalDuration,
  totalDuration,
}: {
  players: string[]
  roles: string[]
  numAlerts: number
  intervalDuration: number
  totalDuration: number
}) {
  let index = 0

  for (let i = 0; i < numAlerts; i++) {
    setTimeout(
      () => {
        const rotation = createRotation(players, roles, index)
        console.log(`[${i + 1}] ${rotation}`)
        index = (index + 1) % players.length

        sendNotification(`Rotation Alert ${i + 1}`, rotation)
      },
      i * intervalDuration * 60 * 1000,
    ) // i * interval duration in milliseconds
  }
  // Add a final setTimeout to keep the script running until the last alert is done
  setTimeout(
    () => {
      console.log("Rotation session completed.")
      process.exit(0) // Optionally exit the process after completion
    },
    totalDuration * 60 * 1000,
  )
}
