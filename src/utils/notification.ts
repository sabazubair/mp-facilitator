import notifier from "node-notifier"
import NotificationCenter from "node-notifier/notifiers/notificationcenter"

export function sendNotification(
  notification: NotificationCenter.Notification,
) {
  const { wait = false, sound = true, ...rest } = notification
  notifier.notify({
    ...rest,
    wait,
    sound,
  })
}
