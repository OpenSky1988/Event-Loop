// Constantly iterating.
// One frame takes ~1/60th of a second.

while (true) {
  // MACROTASKS
  // Taking another SINGLE Task Queue item and execute it.
  // Task queue contains CALLBACKS of happened EVENTS.
  const queue = getNextQueue();
  const taks = queue.pop();
  execute(task);

  // MICROTASKS
  // Executing the WHOLE Microtasks Queue.
  // Tasks added within the frame are executed too until the queue is EMPTY.
  // Microtasks Queue mostly consists of PROMISES.
  while (microtaskQueue.hasTasks()) {
    exeute(microtask);
  }
  
  // Repaint stage
  if (isRepaintTime()) {
    // Executing the WHOLE Animation Queue.
    // Tasks added within the frame are executed NEXT TIME.
    // Animation tasks are CALLBACKS of requestAnimationFrame(c: callback)
    // Useful for executing opposite actions one after another.
    const animationTasks = animationQueue.copyTasks();
    
    for (animationTask in animationTasks) {
      execute(animationTask);
    }
    
    repaint();
  }
}
