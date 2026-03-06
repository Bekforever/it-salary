import { Request, RequestHandler, Response } from 'express'

import { handleError } from '../../common/utils/handle-error'
import * as cityService from './city.service'

export const getAll: RequestHandler = async (_req, res) => {
  try {
    res.json(await cityService.getAll())
  } catch (err) {
    handleError(res, err)
  }
}

export const getById: RequestHandler = async (req, res) => {
  try {
    res.json(await cityService.getById(req.params.id as string))
  } catch (err) {
    handleError(res, err)
  }
}

export const create: RequestHandler = async (req: Request, res: Response) => {
  try {
    res.json(await cityService.create(req.body.name))
  } catch (err) {
    handleError(res, err)
  }
}

export const update: RequestHandler = async (req: Request, res: Response) => {
  try {
    res.json(await cityService.update(req.params.id as string, req.body.name))
  } catch (err) {
    handleError(res, err)
  }
}

export const remove: RequestHandler = async (req, res) => {
  try {
    await cityService.remove(req.params.id as string)
    res.json({ message: 'Город удален' })
  } catch (err) {
    handleError(res, err)
  }
}
