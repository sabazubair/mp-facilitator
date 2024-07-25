import { ERROR_MSG_PLAYERS } from "./constants"
import {
  getRoles,
  getSessionDetailsFromUserInput,
  isValidPlayerCount,
  rotatePlayers,
} from "./util"

const main = async () => {
  const { totalDuration, intervalDuration, players } =
    await getSessionDetailsFromUserInput()

  // Validate input lengths
  if (!isValidPlayerCount(players.length)) {
    console.error(ERROR_MSG_PLAYERS)
    process.exit(1)
  }

  const roles = getRoles(players.length)
  const numAlerts = Math.floor(totalDuration / intervalDuration)

  // Start rotation
  rotatePlayers({ players, roles, numAlerts, intervalDuration, totalDuration })
}

main()
