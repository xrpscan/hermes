import xrplclient from '../services/xrpl'
import logger from '../logger'
import ENV from '../lib/ENV'
import Validation from '../models/Validation'

const LOGPREFIX = '[online-delete]'

export const runOnlineDelete = async () => {
  if (xrplclient.isConnected()) {
    try {
      const ledger = await xrplclient.request({ command: 'ledger', ledger_index: 'validated' })
      const ledger_threshold = ledger.result.ledger_index - ENV.ONLINE_DELETE
      const d = await Validation.deleteMany({ledger_index: {$lt: ledger_threshold}})
      if (d.acknowledged) {
        logger.info(LOGPREFIX, `Purged ${d.deletedCount} validations from ledgers older than ${ledger_threshold}`)
      }
    } catch {
      logger.error(LOGPREFIX, `Error running online_delete validations`)
    }
  } else {
    logger.error(LOGPREFIX, `Deferring online_delete as we're not connected to XRPL.`)
  }

  // Add infinite callback loop
  setTimeout(runOnlineDelete, ENV.ONLINE_DELETE_INTERVAL_MS)
}

export const scheduleOnlineDelete = () => {
  logger.info(LOGPREFIX, `Scheduling online_delete (every ${ENV.ONLINE_DELETE_INTERVAL} sec; keep ${ENV.ONLINE_DELETE} ledgers)`)
  setTimeout(runOnlineDelete, ENV.ONLINE_DELETE_INTERVAL_MS)
}