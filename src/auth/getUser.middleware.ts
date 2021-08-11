import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export async function getUser(req: Request, res: Response, next: NextFunction) {
  if (req.headers.authorization) {

    try {
      const jwt = req.headers.authorization.replace('Bearer', '');
      const decodedJwt = await verify(jwt, '12345678');

      // req.user = decodedJwt.id ? decodedJwt.id : 0;
      // ta dando problema aqui porque não consegue fazer o decode direito
    } catch (error) {
    }
  }
  next();
};

