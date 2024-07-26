import chalk from "chalk"

const error = chalk.bold.red
const warning = chalk.hex("#FFA500")
const info = chalk.hex("#00BFFF")

export const logger = {
  error: (...args: any[]) => console.error(error(args)),
  warning: (...args: any[]) => console.warn(warning(args)),
  info: (...args: any[]) => console.info(info(args)),
}
