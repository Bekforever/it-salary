import { RequestHandler } from 'express'

import { handleError } from '../../common/utils/handle-error'
import * as locationService from './location.service'

export const getAll: RequestHandler = async (_req, res) => {
  try {
    res.json(await locationService.getAll())
  } catch (err) {
    handleError(res, err)
  }
}

export const getById: RequestHandler = async (req, res) => {
  try {
    res.json(await locationService.getById(req.params.id as string))
  } catch (err) {
    handleError(res, err)
  }
}

export const create: RequestHandler = async (req, res) => {
  try {
    res.json(await locationService.create(req.body.name))
  } catch (err) {
    handleError(res, err)
  }
}

export const update: RequestHandler = async (req, res) => {
  try {
    res.json(await locationService.update(req.params.id as string, req.body.name))
  } catch (err) {
    handleError(res, err)
  }
}

export const remove: RequestHandler = async (req, res) => {
  try {
    await locationService.remove(req.params.id as string)
    res.json({ message: 'Локация удалена' })
  } catch (err) {
    handleError(res, err)
  }
}
