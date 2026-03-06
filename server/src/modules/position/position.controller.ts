import { RequestHandler } from 'express'

import { handleError } from '../../common/utils/handle-error'
import * as positionService from './position.service'

export const getAll: RequestHandler = async (_req, res) => {
  try {
    res.json(await positionService.getAll())
  } catch (err) {
    handleError(res, err)
  }
}

export const getById: RequestHandler = async (req, res) => {
  try {
    res.json(await positionService.getById(req.params.id as string))
  } catch (err) {
    handleError(res, err)
  }
}

export const create: RequestHandler = async (req, res) => {
  try {
    res.json(await positionService.create(req.body.name))
  } catch (err) {
    handleError(res, err)
  }
}

export const update: RequestHandler = async (req, res) => {
  try {
    res.json(await positionService.update(req.params.id as string, req.body.name))
  } catch (err) {
    handleError(res, err)
  }
}

export const remove: RequestHandler = async (req, res) => {
  try {
    await positionService.remove(req.params.id as string)
    res.json({ message: 'Позиция удалена' })
  } catch (err) {
    handleError(res, err)
  }
}
