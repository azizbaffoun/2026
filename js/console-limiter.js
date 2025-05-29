// Console Limiter - Prevents browser crashes from excessive console logging
(function() {
  // Store original console methods
  const originalConsole = {
    log: console.log,
    error: console.error,
    warn: console.warn,
    info: console.info,
    debug: console.debug
  };
  
  // Set limits
  const MAX_LOGS = 100; // Maximum number of logs to allow
  const RETENTION_TIME = 5000; // Clear log counter after 5 seconds of inactivity
  
  // Track log count
  let logCount = 0;
  let lastLogTime = Date.now();
  let isOverloaded = false;
  
  // Function to reset log count after inactivity
  function resetIfInactive() {
    const now = Date.now();
    if (now - lastLogTime > RETENTION_TIME) {
      logCount = 0;
      isOverloaded = false;
    }
    
    // Check again later
    setTimeout(resetIfInactive, RETENTION_TIME);
  }
  
  // Start checking for inactivity
  resetIfInactive();
  
  // Create limited versions of console methods
  function createLimitedMethod(originalMethod, type) {
    return function() {
      lastLogTime = Date.now();
      
      // Allow errors to always be logged, but count them
      const isError = type === 'error';
      
      if (logCount < MAX_LOGS || isError) {
        originalMethod.apply(console, arguments);
        logCount++;
        
        // Warn user about excessive logging
        if (logCount === MAX_LOGS && !isOverloaded) {
          isOverloaded = true;
          originalConsole.warn('Console is being flooded with messages. Limiting output to prevent browser crashes.');
        }
      }
    };
  }
  
  // Override console methods with limited versions
  console.log = createLimitedMethod(originalConsole.log, 'log');
  console.error = createLimitedMethod(originalConsole.error, 'error');
  console.warn = createLimitedMethod(originalConsole.warn, 'warn');
  console.info = createLimitedMethod(originalConsole.info, 'info');
  console.debug = createLimitedMethod(originalConsole.debug, 'debug');
  
  // Add a method to force clear the console and reset counters
  console.clearAndReset = function() {
    console.clear();
    logCount = 0;
    isOverloaded = false;
    originalConsole.log('Console has been cleared and log limits reset.');
  };
  
  // Only show this message in development, not production
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    originalConsole.log('Console limiter active: Preventing excessive console output to avoid browser crashes.');
  }
})(); 