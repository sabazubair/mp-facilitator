import yargs from "yargs"
import {
  DEFAULT_TOTAL_DURATION,
  DEFAULT_INTERVAL_DURATION,
  ERROR_MSG_PLAYERS,
} from "./constants"
import { getRoles, isValidPlayerCount, rotatePlayers } from "./util"

// Parse command line arguments
const argv = yargs
  // @ts-expect-error usage doesn't exist in yargs
  .usage(
    "Usage: $0 --totalDuration <minutes> --intervalDuration <minutes> --players <player1,player2,player3,player4>",
  )
  .option("totalDuration", {
    alias: "t",
    description: "Total duration in minutes for the session",
    type: "number",
    default: DEFAULT_TOTAL_DURATION,
  })
  .option("intervalDuration", {
    alias: "i",
    description: "Interval duration in minutes for each rotation",
    type: "number",
    default: DEFAULT_INTERVAL_DURATION,
  })
  .array("players")
  .demandOption(["players"], "Please provide player names separated by commas")
  .describe("players", "Players (comma-separated)").argv

const totalDuration = argv.totalDuration
const intervalDuration = argv.intervalDuration
const players = argv.players.map((player: string) => player.trim())

// Validate input lengths
if (!isValidPlayerCount(players.length)) {
  console.error(ERROR_MSG_PLAYERS)
  process.exit(1)
}

const roles = getRoles(players.length)
const numAlerts = Math.floor(totalDuration / intervalDuration)

// Start rotation
rotatePlayers(players, roles, numAlerts, intervalDuration, totalDuration)
