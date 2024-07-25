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
npm start -- --players <player1,player2,player3,player4> [--totalDuration <minutes>] [--intervalDuration <minutes>]
```

### Options

- `--players`:
  (Required) Comma-separated list of player names.
  Must specify exactly 3 or 4 players.
- `--totalDuration` or `-t`:
  (Optional) Total duration of the session in minutes.
  Default is 120 minutes.
- `--intervalDuration` or `-i`:
  (Optional) Duration of each rotation interval in minutes.
  Default is 15 minutes.

### Examples

1. Run a session with 4 players, a total duration of 120 minutes, and an
   interval duration of 15 minutes:

   ```bash
   npm start -- --players Alice, Bob, Charlie, David
   ```

2. Run a session with 3 players, a total duration of 90 minutes, and an interval
   duration of 20 minutes:

   ```bash
   npm start -- --players Alice, Bob, Charlie --totalDuration 90 --intervalDuration 20
   ```

## How It Works

The application performs the following steps:

1. Parses command line arguments using `yargs`.
2. Validates the number of players (must be exactly 3 or 4).
3. Determines the roles based on the number of players.
4. Calculates the number of alerts based on the total duration and interval
   duration.
5. Starts the rotation of players and roles, displaying alerts and sending
   desktop notifications at each interval.

## File Structure

- `index.js`:
  Main application file.
- `package.json`:
  Project metadata and dependencies.

## Dependencies

- `yargs`:
  For parsing command line arguments.
- `node-notifier`:
  For sending desktop notifications.

## Contributing

Feel free to submit issues and pull requests for new features, improvements, and
bug fixes.
