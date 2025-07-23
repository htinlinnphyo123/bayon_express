import * as fs from 'fs';
import * as path from 'path';
import util from 'util';

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

const formatMessage = (level: string, message: string, context: object = {}) => {
  const timestamp = getTimestamp();
  const contextStr = Object.keys(context).length > 0
    ? ' ' + util.inspect(context, { depth: null, colors: false })
    : '';

  return `[${timestamp}] ${level.toUpperCase()}: ${message}${contextStr}\n..............................................................\n`;
};


const shouldLog = (level: string) => {
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
const writeLog = (level: string, message: string, context: object = {}) => {
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
export const debug = (message: string, context: object = {}) => writeLog('debug', message, context);
export const info = (message: string, context: object = {}) => writeLog('info', message, context);
export const warning = (message: string, context: object = {}) => writeLog('warning', message, context);
export const warn = (message: string, context: object = {}) => writeLog('warn', message, context);
export const error = (message: string, context: object = {}) => writeLog('error', message, context);