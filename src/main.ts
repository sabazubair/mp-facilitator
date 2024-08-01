import { logger } from "./utils/logger"
import ProgrammingSession from "./utils/ProgrammingSession"
import { getSessionDetailsFromUserInput } from "./utils/user-input"

const main = async () => {
  logger.info("Starting Mob Programming Session...")
  const sessionDetails = await getSessionDetailsFromUserInput()
  const programmingSession = new ProgrammingSession(sessionDetails)
  programmingSession.start()
}

main()
