const yargs = require("yargs");
const notifier = require("node-notifier");

// Default values
const DEFAULT_ROLES_4_PLAYERS = [
  "Driver",
  "Navigator",
  "Facilitator",
  "Scribe",
];
const DEFAULT_ROLES_3_PLAYERS = ["Driver", "Navigator", "Facilitator/Scribe"];
const ERROR_MSG_PLAYERS =
  "Error: There must be exactly 3 or 4 players specified.";

const DEFAULT_TOTAL_DURATION = 120; // Default total duration in minutes
const DEFAULT_INTERVAL_DURATION = 15; // Default interval duration in minutes

// Parse command line arguments
const argv = yargs
  .usage(
    "Usage: $0 --totalDuration <minutes> --intervalDuration <minutes> --players <player1,player2,player3,player4>"
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
  .describe("players", "Players (comma-separated)").argv;

const totalDuration = argv.totalDuration;
const intervalDuration = argv.intervalDuration;
const players = argv.players.map((player) => player.trim());

// Validate input lengths
if (!isValidPlayerCount(players.length)) {
  console.error(ERROR_MSG_PLAYERS);
  process.exit(1);
}

const roles = getRoles(players.length);
const numAlerts = Math.floor(totalDuration / intervalDuration);

// Start rotation
rotatePlayers(players, roles, numAlerts, intervalDuration, totalDuration);

// Function to validate the number of players
function isValidPlayerCount(playerCount) {
  return playerCount === 3 || playerCount === 4;
}

// Function to get roles based on the number of players
function getRoles(playerCount) {
  return playerCount === 4 ? DEFAULT_ROLES_4_PLAYERS : DEFAULT_ROLES_3_PLAYERS;
}

// Function to rotate players and roles and display alerts
function rotatePlayers(
  players,
  roles,
  numAlerts,
  intervalDuration,
  totalDuration
) {
  let index = 0;

  for (let i = 0; i < numAlerts; i++) {
    setTimeout(() => {
      const rotation = createRotation(players, roles, index);
      console.log(`[${i + 1}] ${rotation}`);
      index = (index + 1) % players.length;

      sendNotification(`Rotation Alert ${i + 1}`, rotation);
    }, i * intervalDuration * 60 * 1000); // i * interval duration in milliseconds
  }

  // Add a final setTimeout to keep the script running until the last alert is done
  setTimeout(() => {
    console.log("Rotation session completed.");
    process.exit(0); // Optionally exit the process after completion
  }, totalDuration * 60 * 1000);
}

// Function to create a rotation string
function createRotation(players, roles, startIndex) {
  return roles
    .map((role, j) => `${players[(startIndex + j) % players.length]} - ${role}`)
    .join(", ");
}

// Function to send desktop notification
function sendNotification(title, message) {
  notifier.notify({
    title,
    message,
    sound: true,
    wait: false,
  });
}
