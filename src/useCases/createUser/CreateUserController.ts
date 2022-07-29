import { Request, Response } from 'express';
import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const authenticateUserUseCase = new CreateUserUseCase();

    const user = await authenticateUserUseCase.execute({
      username,
      password,
    });

    if (user instanceof Error) {
      return response.status(400).json(user.message);
    }

    return response.status(201).json(user);
  }
}

export { CreateUserController };
