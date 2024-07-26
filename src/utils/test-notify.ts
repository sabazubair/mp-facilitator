import notifier from "node-notifier"

notifier.notify({
  title: "Test Notification",
  message: "Hello, there!",
  sound: true, // Case Sensitive string for location of sound file, or use one of macOS' native sounds (see below)
  icon: "Terminal Icon", // Absolute Path to Triggering Icon
  contentImage: undefined, // Absolute Path to Attached Image (Content Image)
  open: undefined, // URL to open on Click
  wait: false, // Wait for User Action against Notification or times out. Same as timeout = 5 seconds
  // New in latest version. See `example/macInput.js` for usage
  timeout: 5, // Takes precedence over wait if both are defined.
  closeLabel: undefined, // String. Label for cancel button
  actions: undefined, // String | Array<String>. Action label or list of labels in case of dropdown
  dropdownLabel: undefined, // String. Label to be used if multiple actions
  reply: false, // Boolean. If notification should take input. Value passed as third argument in callback and event emitter.
})

console.log("success")
