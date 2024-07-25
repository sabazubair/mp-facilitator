# mp-facilitator README

## Overview

`mp-facilitator` is a Node.js application designed to facilitate a mob
programming session by rotating roles among players at specified intervals.
The app allows for custom durations and player configurations, and it sends
desktop notifications to alert players of role changes.

## Features

- Rotate roles among players in a mob programming session.
- Customizable total session duration and interval duration.
- Supports configurations for 3 or 4 players.
- Sends desktop notifications to alert players of role changes.

## Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sabazubair/mp-facilitator.git
   cd mp-facilitator
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Usage

To run the application, use the following command:

```bash
npm start
```

## How It Works

The application performs the following steps:

1. Parses user input using readline.
2. Validates the number of players (must be exactly 3 or 4).
3. Determines the roles based on the number of players.
4. Calculates the number of alerts based on the total duration and interval
   duration.
5. Starts the rotation of players and roles, displaying alerts and sending
   desktop notifications at each interval.

## File Structure

- `src/index.ts`:
  Main application file.
- `src/util.ts`:
  Utility functions.
- `src/constants.ts`:
  Constants used in the application.
- `src/logger.ts`:
  Logger for logging messages with chalk.
- `package.json`:
  Project metadata and dependencies.

## Dependencies

- `node-notifier`:
  For sending desktop notifications.
- `typescript`:
  For type checking and linting.

## Contributing

Feel free to submit issues and pull requests for new features, improvements, and
bug fixes.
