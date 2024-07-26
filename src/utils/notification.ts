import notifier from "node-notifier"

// Function to send desktop notification
export function sendNotification(title: string, message: string) {
  notifier.notify({
    title,
    message,
    sound: true,
    wait: false,
  })
}
