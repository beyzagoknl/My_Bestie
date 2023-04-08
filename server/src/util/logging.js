export const logInfo = (message) => {
  // eslint-disable-next-line no-console
  console.log(message);
};

/**
 * logWarning should be used to log anything that signals a problem that is not app breaking
 */
export const logWarning = (message) => {
  // eslint-disable-next-line no-console
  console.warn(message);
};

/**
 * logError should be used to log anything that is app breaking
 */
export const logError = (errorMessage) => {
  if (errorMessage instanceof Error) {
    // You can pass an Error to this function and we will post the stack
    // eslint-disable-next-line no-console
    console.error(errorMessage.message, errorMessage.stack);
  } else {
    // eslint-disable-next-line no-console
    console.error("ERROR: ", errorMessage);
  }
};
