const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  logPath: path.join(process.cwd(), 'storage/logs'),
  level: 'debug',
  days: 14,
};

// Ensure log directory exists
if (!fs.existsSync(config.logPath)) {
  fs.mkdirSync(config.logPath, { recursive: true });
}

// Utility functions
const getCurrentDate = () => new Date().toISOString().split('T')[0];

const getTimestamp = () => new Date().toISOString().replace('T', ' ').substring(0, 19);

const formatMessage = (level, message, context = {}) => {
  const timestamp = getTimestamp();
  const contextStr = Object.keys(context).length > 0 ? ` ${JSON.stringify(context)}` : '';
  return `[${timestamp}] ${level.toUpperCase()}: ${message}${contextStr}`;
};

const shouldLog = (level) => {
  const levels = ['debug', 'info', 'warning', 'error'];
  const levelIndex = levels.indexOf(level);
  const configLevelIndex = levels.indexOf(config.level);
  return levelIndex >= configLevelIndex;
};

// Clean old log files
const cleanOldLogs = () => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - config.days);

  try {
    const files = fs.readdirSync(config.logPath);
    
    files.forEach(file => {
      if (file.startsWith('express-') && file.endsWith('.log')) {
        const dateMatch = file.match(/express-(\d{4}-\d{2}-\d{2})\.log/);
        if (dateMatch) {
          const fileDate = new Date(dateMatch[1]);
          if (fileDate < cutoffDate) {
            fs.unlinkSync(path.join(config.logPath, file));
          }
        }
      }
    });
  } catch (error) {
    // Silently fail on cleanup errors
  }
};

// Core logging function
const writeLog = (level, message, context = {}) => {
  if (!shouldLog(level)) return;

  const date = getCurrentDate();
  const filename = `express-${date}.log`;
  const filepath = path.join(config.logPath, filename);
  const formattedMessage = formatMessage(level, message, context);

  try {
    fs.appendFileSync(filepath, formattedMessage + '\n');
  } catch (error) {
    // Silently fail if can't write to log
  }
};

// Logger functions
const debug = (message, context = {}) => writeLog('debug', message, context);
const info = (message, context = {}) => writeLog('info', message, context);
const warning = (message, context = {}) => writeLog('warning', message, context);
const warn = (message, context = {}) => writeLog('warn', message, context);
const error = (message, context = {}) => writeLog('error', message, context);

// Export logger functions
module.exports = {
  debug,
  info,
  warning,
  warn,
  error
};

// Usage examples:
// const logger = require('./logger');
//
// logger.info('Application started');
// logger.error('Something went wrong', { userId: 123, action: 'login' });
// logger.debug('Debug information');
// logger.warning('Warning message');