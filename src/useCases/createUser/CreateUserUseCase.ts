import { hash } from 'bcryptjs';
import { client } from '../../prisma/client';

interface UserRequest {
  password: string;
  username: string;
}

class CreateUserUseCase {
  async execute({ username, password }: UserRequest) {
    const userAlreadyExists = await client.user.findFirst({
      where: {
        username,
      },
    });

    if (userAlreadyExists) {
      return new Error('User already exists');
    }

    const passwordHash = await hash(password, 8);

    const user = await client.user.create({
      data: {
        username,
        password: passwordHash,
      },
    });

    return user;
  }
}

export { CreateUserUseCase };
