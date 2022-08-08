import ingress from '../../processors/Ingress'
import { connectDatabase } from '../../db'

connectDatabase()
ingress()