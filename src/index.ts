import { ERROR_MSG_PLAYERS } from "./constants"
import { logger } from "./logger"
import {
  getRoles,
  getSessionDetailsFromUserInput,
  isValidPlayerCount,
  rotatePlayers,
} from "./util"

const main = async () => {
  logger.info("Starting Mob Programming Session...")
  const { totalDuration, intervalDuration, players } =
    await getSessionDetailsFromUserInput()

  // Validate input lengths
  if (!isValidPlayerCount(players.length)) {
    logger.error(ERROR_MSG_PLAYERS)
    process.exit(1)
  }

  // Start rotation
  rotatePlayers(players, intervalDuration, totalDuration)
}

main()
