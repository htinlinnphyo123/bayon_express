const fs = require('fs');
const path = require('path');

// Default configuration
const defaultConfig = {
  default: 'stack',
  channels: {
    stack: {
      driver: 'stack',
      channels: ['daily', 'console'],
    },
    daily: {
      driver: 'daily',
      path: path.join(process.cwd(), 'storage/logs'),
      level: 'debug',
      days: 14,
    },
    console: {
      driver: 'console',
      level: 'debug',
    },
  },
};

// Merge user config with default config
const createConfig = (userConfig = {}) => {
  const config = { ...defaultConfig, ...userConfig };
  
  // Ensure log directory exists
  const logPath = config.channels.daily?.path || defaultConfig.channels.daily.path;
  if (!fs.existsSync(logPath)) {
    fs.mkdirSync(logPath, { recursive: true });
  }
  
  return config;
};

// Utility functions
const getCurrentDate = () => new Date().toISOString().split('T')[0];

const getTimestamp = () => new Date().toISOString().replace('T', ' ').substring(0, 19);

const formatMessage = (level, message, context = {}) => {
  const timestamp = getTimestamp();
  const contextStr = Object.keys(context).length > 0 ? ` ${JSON.stringify(context)}` : '';
  return `[${timestamp}] ${level.toUpperCase()}: ${message}${contextStr}`;
};

const shouldLog = (level, channelLevel = 'debug') => {
  const levels = ['debug', 'info', 'warning', 'error'];
  const levelIndex = levels.indexOf(level);
  const channelLevelIndex = levels.indexOf(channelLevel);
  return levelIndex >= channelLevelIndex;
};

// File operations
const writeToDaily = (config, level, message, context = {}) => {
  const channel = config.channels.daily;
  const date = getCurrentDate();
  const filename = `laravel-${date}.log`;
  const filepath = path.join(channel.path, filename);
  const formattedMessage = formatMessage(level, message, context);

  try {
    fs.appendFileSync(filepath, formattedMessage + '\n');
    cleanOldLogs(config);
  } catch (error) {
    console.error('Failed to write to log file:', error);
  }
};

const writeToConsole = (level, message, context = {}) => {
  const formattedMessage = formatMessage(level, message, context);
  
  switch (level) {
    case 'error':
      console.error(formattedMessage);
      break;
    case 'warning':
    case 'warn':
      console.warn(formattedMessage);
      break;
    case 'info':
      console.info(formattedMessage);
      break;
    case 'debug':
      console.debug(formattedMessage);
      break;
    default:
      console.log(formattedMessage);
  }
};

const cleanOldLogs = (config) => {
  const logDir = config.channels.daily.path;
  const retentionDays = config.channels.daily.days;
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - retentionDays);

  try {
    const files = fs.readdirSync(logDir);
    
    files.forEach(file => {
      if (file.startsWith('laravel-') && file.endsWith('.log')) {
        const dateMatch = file.match(/laravel-(\d{4}-\d{2}-\d{2})\.log/);
        if (dateMatch) {
          const fileDate = new Date(dateMatch[1]);
          if (fileDate < cutoffDate) {
            fs.unlinkSync(path.join(logDir, file));
          }
        }
      }
    });
  } catch (error) {
    console.error('Failed to clean old logs:', error);
  }
};

// Core logging function
const log = (config, level, message, context = {}) => {
  const defaultChannel = config.default;
  const channel = config.channels[defaultChannel];

  if (channel.driver === 'stack') {
    // Log to all channels in the stack
    channel.channels.forEach(channelName => {
      const subChannel = config.channels[channelName];
      if (shouldLog(level, subChannel.level)) {
        if (subChannel.driver === 'daily') {
          writeToDaily(config, level, message, context);
        } else if (subChannel.driver === 'console') {
          writeToConsole(level, message, context);
        }
      }
    });
  } else if (channel.driver === 'daily') {
    if (shouldLog(level, channel.level)) {
      writeToDaily(config, level, message, context);
    }
  } else if (channel.driver === 'console') {
    if (shouldLog(level, channel.level)) {
      writeToConsole(level, message, context);
    }
  }
};

const logToChannel = (config, channelName, level, message, context = {}) => {
  const channel = config.channels[channelName];
  if (!channel) {
    console.error(`Logger channel '${channelName}' not found`);
    return;
  }

  if (shouldLog(level, channel.level)) {
    if (channel.driver === 'daily') {
      writeToDaily(config, level, message, context);
    } else if (channel.driver === 'console') {
      writeToConsole(level, message, context);
    }
  }
};

// Create logger factory function
const createLogger = (userConfig = {}) => {
  const config = createConfig(userConfig);

  const logger = {
    // Main logging method
    log: (level, message, context = {}) => log(config, level, message, context),

    // Convenience methods
    debug: (message, context = {}) => log(config, 'debug', message, context),
    info: (message, context = {}) => log(config, 'info', message, context),
    warning: (message, context = {}) => log(config, 'warning', message, context),
    warn: (message, context = {}) => log(config, 'warn', message, context),
    error: (message, context = {}) => log(config, 'error', message, context),

    // Channel-specific logging
    channel: (channelName) => ({
      debug: (message, context = {}) => logToChannel(config, channelName, 'debug', message, context),
      info: (message, context = {}) => logToChannel(config, channelName, 'info', message, context),
      warning: (message, context = {}) => logToChannel(config, channelName, 'warning', message, context),
      warn: (message, context = {}) => logToChannel(config, channelName, 'warn', message, context),
      error: (message, context = {}) => logToChannel(config, channelName, 'error', message, context),
    }),

    // Get current config
    getConfig: () => ({ ...config }),
  };

  return logger;
};

// Create default logger instance
const logger = createLogger();

// Export factory function and default instance
module.exports = {
  createLogger,
  logger
};

// Usage examples:
// const { logger } = require('./logger');
//
// logger.info('Application started');
// logger.error('Something went wrong', { userId: 123, action: 'login' });
// logger.debug('Debug information');
// logger.warning('Warning message');
//
// // Log to specific channel
// logger.channel('daily').info('This goes only to daily log file');
// logger.channel('console').error('This goes only to console');
//
// // Create custom logger with different config
// const { createLogger } = require('./logger');
// const customLogger = createLogger({
//   channels: {
//     daily: {
//       driver: 'daily',
//       path: './custom-logs',
//       level: 'info',
//       days: 30
//     }
//   }
// });