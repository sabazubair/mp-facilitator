import { ERROR_MSG_PLAYERS } from "./constants"
import { logger } from "./utils/logger"
import { isValidPlayerCount, rotatePlayers } from "./utils/rotation"
import { getSessionDetailsFromUserInput } from "./utils/user-input"

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
