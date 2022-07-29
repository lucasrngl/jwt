import { client } from '../../prisma/client';
import { GenerateTokenProvider } from '../../provider/GenerateTokenProvider';
import dayjs from 'dayjs';
import { GenerateRefreshToken } from '../../provider/GenerateRefreshToken';

class RefreshTokenUserUseCase {
  async execute(refresh_token: string) {
    const refreshToken = await client.refreshToken.findFirst({
      where: {
        id: refresh_token,
      },
    });

    if (!refreshToken) {
      return new Error('Refresh token invalid');
    }

    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refreshToken.expiresIn)
    );

    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(refreshToken.userId);

    if (refreshTokenExpired) {
      await client.refreshToken.deleteMany({
        where: {
          userId: refreshToken.userId,
        },
      });

      const generatedRefreshTokenProvider = new GenerateRefreshToken();
      const newRefreshToken = await generatedRefreshTokenProvider.execute(
        refreshToken.userId
      );

      return { token, refreshToken: newRefreshToken };
    }

    return { token };
  }
}

export { RefreshTokenUserUseCase };
