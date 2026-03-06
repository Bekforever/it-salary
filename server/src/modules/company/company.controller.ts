import { RequestHandler } from 'express'

import { handleError } from '../../common/utils/handle-error'
import * as companyService from './company.service'

export const getAll: RequestHandler = async (_req, res) => {
  try {
    res.json(await companyService.getAll())
  } catch (err) {
    handleError(res, err)
  }
}

export const getById: RequestHandler = async (req, res) => {
  try {
    res.json(await companyService.getById(req.params.id as string))
  } catch (err) {
    handleError(res, err)
  }
}

export const create: RequestHandler = async (req, res) => {
  try {
    res.json(await companyService.create(req.body.name))
  } catch (err) {
    handleError(res, err)
  }
}

export const update: RequestHandler = async (req, res) => {
  try {
    res.json(await companyService.update(req.params.id as string, req.body.name))
  } catch (err) {
    handleError(res, err)
  }
}

export const remove: RequestHandler = async (req, res) => {
  try {
    await companyService.remove(req.params.id as string)
    res.json({ message: 'Компания удалена' })
  } catch (err) {
    handleError(res, err)
  }
}
