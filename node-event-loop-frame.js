// Constantly iterating.
// One frame takes ~1/60th of a second.

while (tasksAreWaiting()) {
  // MACROTASKS
  // Executing the WHOLE Task Queue.
  // Task queue contains CALLBACKS of happened EVENTS.
  // There are three of them:
  // 1. XHR requeses and Disk read/write operations
  // 2. Check Tasks
  // ---- Items are placed with setImmediate()
  // ---- These tasks executed earlier than setTimeout(cb, 0)
  // 3. Timers (setTimeout, setInterval)
  const queue = getNextQueue();
  
  while (queue.hasTaks()) {
    const task = queue.pop();
    execute(task);
    
    // MICROTASKS
    // Microtasks arrived within the frame run next time.
    // Otherwise the whole microtask queues are executed.
    
    // Executes the WHOLE Next Tick Queue.
    // Items are placed with proccess.nextTick(cb)
    // These tasks run BEFORE Promises.
    while (nextTickQueue.hasTaks()) {
      const nextTickTask = queue.pop();
      execute(nextTickTask);
    }
    
    // Executes the WHOLE Promise Queue.
    while (promiseQueue.hasTaks()) {
      const promiseTask = queue.pop();
      execute(promiseTask);
    }
  }
}
