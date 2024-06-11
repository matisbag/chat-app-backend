/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const AuthController = () => import('#controllers/auth_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router.post('login', [AuthController, 'login'])
    router.get('me', [AuthController, 'me']).use(middleware.auth())
    router.post('register', [AuthController, 'register'])
    router.post('logout', [AuthController, 'logout']).use(middleware.auth())
  })
  .prefix('auth')
