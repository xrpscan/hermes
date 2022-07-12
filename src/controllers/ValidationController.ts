import express, { Request, Response } from 'express'
import Validation from '../models/Validation'

const ValidationController = express.Router()

// All validations
ValidationController.route('/')
.get((req: Request, res: Response) => {
  Validation
  .find()
  .select('-_id -__v')
  .sort({ledger_index: 'desc'})
  .limit(1024)
  .exec((error, validations) => {
    if (error) {
      return res.status(500).send('Error')
    } else if (validations) {
      return res.json(validations)
    } else {
      return res.status(404).send('Not found')
    }
  })
})

// Validations for a specifc ledger
ValidationController.route('/ledger/:ledger_index')
.get((req: Request, res: Response) => {
  Validation
  .find({ledger_index: req.params?.ledger_index})
  .select('-_id -__v')
  .exec((error, validations) => {
    if (error) {
      return res.status(500).send('Error')
    } else if (validations) {
      return res.json(validations)
    } else {
      return res.status(404).send('Not found')
    }
  })
})

// Validations from a specfic validator
ValidationController.route('/validator/:master_key')
.get((req: Request, res: Response) => {
  Validation
  .find({master_key: req.params?.master_key})
  .select('-_id -__v')
  .sort({ledger_index: 'desc'})
  .limit(1024)
  .exec((error, validations) => {
    if (error) {
      return res.status(500).send('Error')
    } else if (validations) {
      return res.json(validations)
    } else {
      return res.status(404).send('Not found')
    }
  })
})

export default ValidationController