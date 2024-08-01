import {
  DEFAULT_INTERVAL_DURATION,
  DEFAULT_ROLES_2_PROGRAMMERS,
  DEFAULT_ROLES_3_PROGRAMMERS,
  DEFAULT_ROLES_4_PROGRAMMERS,
  DEFAULT_TOTAL_DURATION,
  ERROR_MSG_PROGRAMMERS,
} from "../constants"
import { logger } from "./logger"
import { sendNotification } from "./notification"
import { getRandomGiphyLink } from "../services/giphy"
import { SessionDetails } from "../types"

export default class ProgrammingSession {
  private roles: string[]
  private programmers: string[]
  private intervalDuration = DEFAULT_INTERVAL_DURATION
  private totalDuration = DEFAULT_TOTAL_DURATION

  private constructor(sessionDetails: SessionDetails) {
    const { programmers, intervalDuration, totalDuration } = sessionDetails
    if (!this.isValidProgrammerCount(programmers.length)) {
      logger.error(ERROR_MSG_PROGRAMMERS)
      process.exit(0)
    }
    this.roles = this.getRoles(programmers)
    this.programmers = programmers
    this.intervalDuration = intervalDuration
    this.totalDuration = totalDuration
  }

  private isValidProgrammerCount(count: number) {
    return count === 2 || count === 3 || count === 4
  }

  private getRoles(programmers: string[]) {
    const numProgrammers = programmers.length
    const roles = [
      DEFAULT_ROLES_2_PROGRAMMERS,
      DEFAULT_ROLES_3_PROGRAMMERS,
      DEFAULT_ROLES_4_PROGRAMMERS,
    ]
    return roles[numProgrammers - 2]
  }

  private getAssignments() {
    return this.roles
      .map((role, index) => {
        const programmer = this.programmers[index]
        return `${role} - ${programmer}`
      })
      .join("\n")
  }

  private logAssignments(i: number) {
    const assignments = this.getAssignments()
    logger.info(`\n------ Rotation ${i + 1} ------\n`)
    console.table(assignments)
  }

  private async sendAssignmentsNotification(i: number) {
    const assignments = this.getAssignments()
    const giphyLink = await getRandomGiphyLink("times up!")
    sendNotification({
      title: `Rotation Alert ${i + 1}`,
      message: assignments,
      contentImage: giphyLink,
    })
  }

  private rotateProgrammers() {
    this.programmers.unshift(this.programmers.pop()!)
  }

  private rotate(i: number) {
    this.rotateProgrammers()
    this.logAssignments(i)
    this.sendAssignmentsNotification(i)
  }

  start() {
    const numRotations = Math.floor(this.totalDuration / this.intervalDuration)
    const intervalMS = this.intervalDuration * 60 * 1000
    const totalMS = this.totalDuration * 60 * 1000
    for (let i = 0; i < numRotations; i++) {
      setTimeout(() => this.rotate(i), i * intervalMS)
    }
    setTimeout(() => {
      logger.info("Rotation session completed.")
      process.exit(0)
    }, totalMS)
  }
}
