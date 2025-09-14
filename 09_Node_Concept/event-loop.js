// Importing built-in modules
const fs = require('fs');
const crypto = require('crypto');

// ----------------------
// 1️⃣ Start of the script (synchronous code)
// ----------------------
console.log("1. script start"); // 🟢 Synchronous - runs immediately

// ----------------------
// 2️⃣ setTimeout (macrotask) → Runs in "timers" phase
// ----------------------
setTimeout(() => {
  console.log("2. setTimeout 0s callback (macrotask)");
}, 0);

setTimeout(() => {
  console.log("3. setTimeout 0s callback (macrotask)");
}, 0);

// ----------------------
// 3️⃣ setImmediate → Runs in "check" phase (after I/O callbacks)
// ----------------------
setImmediate(() => {
  console.log("4. setImmediate callback (check phase)");
});

// ----------------------
// 4️⃣ Promise → Microtask → Runs after current stack, before any macrotasks
// ----------------------
Promise.resolve().then(() => {
  console.log("5. Promise resolved (microtask)");
});

// ----------------------
// 5️⃣ process.nextTick → Microtask → Runs even before Promises
// ----------------------
process.nextTick(() => {
  console.log("6. process.nextTick callback (microtask)");
});

// ----------------------
// 6️⃣ fs.readFile → Asynchronous I/O → Runs in "poll" phase, callback in "I/O callbacks" phase
// ----------------------
fs.readFile(__filename, () => {
  console.log("7. fs.readFile complete (I/O callback)");
});

// ----------------------
// 7️⃣ crypto.pbkdf2 → CPU-intensive task → offloaded to libuv thread pool
//    Callback runs in "poll" or "check" phase depending on timing
// ----------------------
crypto.pbkdf2("secret", 'salt', 1000, 64, "sha512", (err, key) => {
  if (err) throw err;
  console.log("8. crypto.pbkdf2 complete (CPU-intensive task, thread pool)");
});

// ----------------------
// 8️⃣ End of script (synchronous)
// ----------------------
console.log("9. script end"); // 🟢 Synchronous - runs immediately
