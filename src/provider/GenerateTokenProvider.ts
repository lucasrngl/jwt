import { sign } from 'jsonwebtoken';

class GenerateTokenProvider {
  async execute(userId: string) {
    const token = sign({}, '69224f77-0ae9-4925-8a51-e71c8366f21e', {
      subject: userId,
      expiresIn: '30s',
    });

    return token;
  }
}

export { GenerateTokenProvider };
