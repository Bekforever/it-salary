import { RequestHandler } from 'express'

import { handleError } from '../../common/utils/handle-error'
import * as userService from './user.service'

export const getAll: RequestHandler = async (_req, res) => {
  try {
    res.json(await userService.getAll())
  } catch (err) {
    handleError(res, err)
  }
}

export const getById: RequestHandler = async (req, res) => {
  try {
    res.json(await userService.getById(req.params.id as string))
  } catch (err) {
    handleError(res, err)
  }
}

export const create: RequestHandler = async (req, res) => {
  try {
    res.json(await userService.create(req.body))
  } catch (err) {
    handleError(res, err)
  }
}

export const update: RequestHandler = async (req, res) => {
  try {
    res.json(await userService.update(req.params.id as string, req.body))
  } catch (err) {
    handleError(res, err)
  }
}

export const remove: RequestHandler = async (req, res) => {
  try {
    await userService.remove(req.params.id as string)
    res.json({ message: 'Пользователь удален' })
  } catch (err) {
    handleError(res, err)
  }
}
