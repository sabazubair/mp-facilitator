import { WebClient } from "@slack/web-api"
import * as dotenv from "dotenv"
import { logger } from "../utils/logger"

// Load environment variables from .env file
dotenv.config()

// Get the Slack token from environment variables
const token = process.env.SLACK_TOKEN

if (!token) {
  throw new Error("Slack token not found in environment variables")
}

// Initialize the web client with your token
const web = new WebClient(token)

// Function to send a message
export async function sendSlackMessage(channel = "v-hub-git", text: string) {
  try {
    // Call the chat.postMessage method using the WebClient
    const res = await web.chat.postMessage({
      channel: channel,
      text: text,
    })

    logger.info("Message sent: ", res.ts)
  } catch (error) {
    logger.error("Error sending message: ", error)
  }
}
