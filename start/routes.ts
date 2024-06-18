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
const UsersController = () => import('#controllers/users_controller')
const ConversationsController = () => import('#controllers/conversations_controller')
const MessagesController = () => import('#controllers/messages_controller')

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

router.get('users', [UsersController, 'index']).use(middleware.auth())

router.get('conversations', [ConversationsController, 'index']).use(middleware.auth())
router.post('conversations', [ConversationsController, 'store']).use(middleware.auth())

router.get('/conversations/:id/messages', [MessagesController, 'index']).use(middleware.auth())
router.post('/conversations/:id/messages', [MessagesController, 'store']).use(middleware.auth())
