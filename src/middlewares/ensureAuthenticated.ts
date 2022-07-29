import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json('Unauthorized');
  }

  const [, token] = authToken.split(' ');

  try {
    verify(token, '69224f77-0ae9-4925-8a51-e71c8366f21e');

    return next();
  } catch (error) {
    return response.status(401).json('Unauthorized');
  }
}
