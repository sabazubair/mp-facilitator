import chalk from "chalk"

const error = chalk.bold.red
const warning = chalk.hex("#FFA500") // Orange color
const info = chalk.hex("#00BFFF")

export const logger = {
  error: (...args: string[]) => console.error(error(args)),
  warning: (...args: string[]) => console.warn(warning(args)),
  info: (...args: string[]) => console.info(info(args)),
}
