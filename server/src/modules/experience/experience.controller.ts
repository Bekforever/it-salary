import { RequestHandler } from 'express'

import { handleError } from '../../common/utils/handle-error'
import * as experienceService from './experience.service'

export const getAll: RequestHandler = async (_req, res) => {
  try {
    res.json(await experienceService.getAll())
  } catch (err) {
    handleError(res, err)
  }
}

export const getById: RequestHandler = async (req, res) => {
  try {
    res.json(await experienceService.getById(req.params.id as string))
  } catch (err) {
    handleError(res, err)
  }
}

export const create: RequestHandler = async (req, res) => {
  try {
    res.json(await experienceService.create(req.body.name))
  } catch (err) {
    handleError(res, err)
  }
}

export const update: RequestHandler = async (req, res) => {
  try {
    res.json(await experienceService.update(req.params.id as string, req.body.name))
  } catch (err) {
    handleError(res, err)
  }
}

export const remove: RequestHandler = async (req, res) => {
  try {
    await experienceService.remove(req.params.id as string)
    res.json({ message: 'Опыт удален' })
  } catch (err) {
    handleError(res, err)
  }
}
