import { NextFunction, Request, Response } from 'express'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type func = (req: Request, res: Response, next: NextFunction) => Promise<any>

export default function (fn: func) {
  return function (req: Request, res: Response, next: NextFunction) {
    fn(req, res, next).catch(next)
  }
}
