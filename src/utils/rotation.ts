import {
  DEFAULT_ROLES_3_PLAYERS,
  DEFAULT_ROLES_4_PLAYERS,
  type DefaultRoles3Players,
  type DefaultRoles4Players,
} from "../constants"
import { getRandomGiphyLink } from "../services/giphy"
import { sendSlackMessage } from "../services/slack"
import { logger } from "./logger"
import { sendNotification } from "./notification"

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

// Function to rotate players and roles and display alerts
export function rotatePlayers(
  players: string[],
  intervalDuration: number,
  totalDuration: number,
) {
  const numAlerts = Math.floor(totalDuration / intervalDuration)

  for (let i = 0; i < numAlerts; i++) {
    setTimeout(
      async () => {
        const roles = getRoles(players, i)
        console.table(roles)
        const rotation = Object.entries(roles)
          .map(([role, player]) => `${role} - ${player}`)
          .join("\n")

        sendNotification(`Rotation Alert ${i + 1}`, rotation)

        // TODO: uncomment this line to send a Slack message with the rotation and a giphy link
        // You'll need an API key from Giphy and Slack
        // const giphyLink = await getRandomGiphyLink("times up!")
        // await sendSlackMessage(
        //   "v-hub-git",
        //   `Rotation Alert ${i + 1}\n\n${rotation}\n\n${giphyLink}`,
        // )
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
