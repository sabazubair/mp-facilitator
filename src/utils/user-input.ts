import readline from "readline"
import {
  DEFAULT_TOTAL_DURATION,
  DEFAULT_INTERVAL_DURATION,
  DEFAULT_PROGRAMERS,
} from "../constants"
import { SessionDetails } from "../types"

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

export const getSessionDetailsFromUserInput =
  async (): Promise<SessionDetails> => {
    const totalDurationInput = await getUserInput(
      `Session Duration (default: ${DEFAULT_TOTAL_DURATION} min): `,
    )
    const intervalDurationInput = await getUserInput(
      `Rotation Interval Duration (default: ${DEFAULT_INTERVAL_DURATION} min): `,
    )
    const programmersInput = await getUserInput(
      `Enter player names separated by commas (default: ${DEFAULT_PROGRAMERS}): `,
    )

    const totalDuration = totalDurationInput
      ? parseInt(totalDurationInput)
      : DEFAULT_TOTAL_DURATION

    const intervalDuration = intervalDurationInput
      ? parseInt(intervalDurationInput)
      : DEFAULT_INTERVAL_DURATION

    const programmers = programmersInput
      ? programmersInput.split(",").map((player) => player.trim())
      : DEFAULT_PROGRAMERS

    return {
      totalDuration,
      intervalDuration,
      programmers,
    }
  }
