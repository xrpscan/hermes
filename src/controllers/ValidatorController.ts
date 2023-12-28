import express, { Request, Response } from 'express'
import Validator from '../models/Validator'

const ValidatorController = express.Router()

// All validators
ValidatorController.route('/')
.get((req: Request, res: Response) => {
  Validator
  .find()
  .select('-_id -__v')
  .sort({ledger_index: -1})
  .exec((error, validators) => {
    if (error) {
      return res.status(500).send('Error')
    } else if (validators) {
      return res.json(validators)
    } else {
      return res.status(404).send('Not found')
    }
  })
})

// Validator identified by master_key
ValidatorController.route('/:master_key')
.get((req: Request, res: Response) => {
  Validator
  .find({master_key: req.params?.master_key})
  .select('-_id -__v')
  .exec((error, validator) => {
    if (error) {
      return res.status(500).send('Error')
    } else if (validator) {
      return res.json(validator)
    } else {
      return res.status(404).send('Not found')
    }
  })
})

export default ValidatorController