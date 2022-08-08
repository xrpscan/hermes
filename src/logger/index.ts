import logger from 'npmlog'
import { LOGGER_HEADING } from '../lib/Constants'
import ENV from '../lib/ENV'

logger.heading = LOGGER_HEADING
logger.level = ENV.LOG_LEVEL

export default logger