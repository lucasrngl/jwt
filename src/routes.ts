import { Router } from 'express';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';
import { AuthenticateUserController } from './useCases/authenticateUser/AuthenticateUserController';
import { CreateUserController } from './useCases/createUser/CreateUserController';
import { RefreshTokenUserController } from './useCases/refreshTokenUser/RefreshTokenUserController';

const router = Router();

router.post('/users', new CreateUserController().handle);
router.post('/login', new AuthenticateUserController().handle);
router.post('/refresh-token', new RefreshTokenUserController().handle);

router.get('/techs', ensureAuthenticated, (request, response) => {
  return response.json([
    { name: 'Node.js' },
    { name: 'TypeScript' },
    { name: 'Google Cloud' },
    { name: 'Git' },
  ]);
});

export { router };
